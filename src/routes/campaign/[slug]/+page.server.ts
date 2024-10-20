import type { PageServerLoad } from "./$types";
import { getCampaignById } from "$lib/server/database/campaign";
import { error, redirect } from "@sveltejs/kit";
import { check_session } from "$lib/server/sessions";
import { getUserById } from "$lib/server/database/users";
import { getLoanBalance } from "$lib/server/ledger";
import { getLoansByCampaign } from "$lib/server/database/loans";

export const load: PageServerLoad = async ({ params, cookies }) => {
  const userUuid = check_session(cookies.get("session"));
  if (!userUuid) return redirect(303, "/login");

  const user = await getUserById(userUuid);
  if (!user) return redirect(303, "/login");

  const campaign = await getCampaignById(params.slug);
  if (!campaign) error(404);

  const loans = await getLoansByCampaign(campaign.userId);

  return {
    campaignName: campaign.name,
    description: campaign.description,
    requiredAmount: campaign.amount,
    isOwner: campaign.userId === user.userId,
    loans: await Promise.all(
      loans.map(async (loan, index) => {
        const lender = (await getUserById(loan.lenderId))!;
        const balance = await getLoanBalance(user.userId, lender.userId);
        return {
          title: `Loan ${index}`,
          beneficiary: `${lender.firstName} ${lender.surname}`,
          totalAmount: loan.amount,
          amountPaid: balance,
        };
      }),
    ),
  };
};
