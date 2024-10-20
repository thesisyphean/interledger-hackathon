import type { Actions, PageServerLoad } from "./$types";
import { getCampaignById } from "$lib/server/database/campaign";
import { error, fail, redirect } from "@sveltejs/kit";
import { check_session } from "$lib/server/sessions";
import { getOwner, getUserById } from "$lib/server/database/users";
import { createLoan, getLoanCredits, getLoanDebits, payAmount } from "$lib/server/ledger";
import { getLoanById, getLoansByCampaign } from "$lib/server/database/loans";
import { pay } from "$lib/server/payments/single";

export const load: PageServerLoad = async ({ params, cookies }) => {
  const userUuid = check_session(cookies.get("session"));
  if (!userUuid) return redirect(303, "/login");

  const user = await getUserById(userUuid);
  if (!user) return redirect(303, "/login");

  const campaign = await getCampaignById(params.slug);
  if (!campaign) error(404);

  const loans = await getLoansByCampaign(campaign.campaignId);

  const isOwner = campaign.userId === user.userId;
  const owner = isOwner ? user : await getOwner(campaign.campaignId);

  return {
    slug: params.slug,
    ownerName: owner?.firstName + " " + owner?.surname,
    campaignName: campaign.name,
    description: campaign.description,
    requiredAmount: campaign.amount,
    isOwner,
    loans: await Promise.all(
      loans.map(async (loan, index) => {
        const uid = isOwner ? loan.lenderId : loan.beneficiaryId;
        const beneficiary = (await getUserById(uid))!;
        const amountPaid = await getLoanDebits(loan.loanId);
        const totalAmount = await getLoanCredits(loan.loanId);
        return {
          loanId: loan.loanId,
          title: loan.donation ? `Donation ${index + 1}` : `Loan ${index + 1}`,
          beneficiary: `${beneficiary.firstName} ${beneficiary.surname}`,
          amountPaid: amountPaid / 100,
          totalAmount: totalAmount / 100,
          donation: loan.donation,
        };
      }),
    ),
  };
};

export const actions: Actions = {
  donate: async ({ request, params, cookies }) => {
    const userUuid = check_session(cookies.get("session"));
    if (!userUuid) return error(401);

    const user = await getUserById(userUuid);
    if (!user) return error(401);

    const campaign = await getCampaignById(params.slug);
    if (!campaign) error(404);

    const data = await request.formData();

    const amountStr = data.get("amount");
    if (!amountStr || typeof amountStr !== "string") {
      return fail(422);
    }
    const amount = Number(amountStr);
    if (Number.isNaN(amount)) {
      return fail(422);
    }

    const dstUser = await getUserById(campaign.userId);
    if (dstUser === null) return fail(400);

    const value = Math.round(amount * 100);

    await pay(
      user.walletAddress,
      dstUser.walletAddress,
      {
        value: String(value),
        assetCode: "ZAR",
        assetScale: 2,
      },
      async () => {
        await createLoan(dstUser.userId, user.userId, value, true);
        redirect(303, `/campaign/${params.slug}`);
      },
    );
  },
  lend: async ({ request, params, cookies }) => {
    const userUuid = check_session(cookies.get("session"));
    if (!userUuid) return error(401);

    const user = await getUserById(userUuid);
    if (!user) return error(401);

    const campaign = await getCampaignById(params.slug);
    if (!campaign) error(404);

    const data = await request.formData();

    const amountStr = data.get("amount");
    if (!amountStr || typeof amountStr !== "string") {
      return fail(422);
    }
    const amount = Number(amountStr);
    if (Number.isNaN(amount)) {
      return fail(422);
    }

    const dstUser = await getUserById(campaign.userId);
    if (dstUser === null) return fail(400);

    const value = Math.round(amount * 100);

    await pay(
      user.walletAddress,
      dstUser.walletAddress,
      {
        value: String(value),
        assetCode: "ZAR",
        assetScale: 2,
      },
      async () => {
        await createLoan(dstUser.userId, user.userId, value, false);
        redirect(303, `/campaign/${params.slug}`);
      },
    );
  },
  pay: async ({ request, params, cookies }) => {
    const userUuid = check_session(cookies.get("session"));
    if (!userUuid) return error(401);

    const user = await getUserById(userUuid);
    if (!user) return error(401);

    const campaign = await getCampaignById(params.slug);
    if (!campaign) error(404);

    const data = await request.formData();

    const amountStr = data.get("amount");
    if (!amountStr || typeof amountStr !== "string") {
      return fail(422);
    }
    const id = data.get("id");
    if (!id || typeof id !== "string") {
      return fail(422);
    }
    const amount = Number(amountStr);
    if (Number.isNaN(amount)) {
      return fail(422);
    }

    const loan = await getLoanById(id);
    if (load === null) return fail(400);

    if (loan.beneficiaryId !== user.userId) return fail(401);

    const dstUser = await getUserById(loan.lenderId);
    if (dstUser === null) return fail(500);

    const value = Math.round(amount * 100);

    await pay(
      user.walletAddress,
      dstUser.walletAddress,
      {
        value: String(value),
        assetCode: "ZAR",
        assetScale: 2,
      },
      async () => {
        await payAmount(loan.loanId, value);
        redirect(303, `/campaign/${params.slug}`);
      },
    );
  },
};
