import type { PageServerLoad } from './$types';
import { getCampaignByUser } from "$lib/server/database/campaign";
import { redirect } from "@sveltejs/kit";
import { check_session } from "$lib/server/sessions";
import { getUserById } from "$lib/server/database/users";

export const load: PageServerLoad = async ({ cookies }) => {
    const userUuid = check_session(cookies.get("session"));
  if (!userUuid) return redirect(303, "/login");

  const user = await getUserById(userUuid);
  if (!user) return redirect(303, "/login");

  const campaigns = await getCampaignByUser(userUuid);
  const campaign = campaigns[0];

    return {
        campaignName: campaign.name,
        description: campaign.description,
        requiredAmount: campaign.amount,
        isOwner: true,
        loans: [
            {
                title: "Loan 1",
                beneficiary: "Joe Soap",
                totalAmount: 1000,
                amountPaid: 500,
            }
        ]
    };
}
