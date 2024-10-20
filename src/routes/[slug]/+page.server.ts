import { getCampaignByCommunity } from "$lib/server/database/campaign";
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { check_session } from "$lib/server/sessions";
import { getUserById } from "$lib/server/database/users";
import { getCommmunityByUser } from "$lib/server/database/community";

export const load: PageServerLoad = async ({ params, cookies }) => {
  const userUuid = check_session(cookies.get("session"));
  if (!userUuid) return redirect(303, "/login");

  const user = await getUserById(userUuid);
  if (!user) return redirect(303, "/login");

  const communities = await getCommmunityByUser(userUuid);
  const campaigns = await getCampaignByCommunity(params.slug);

  return {
    user,
    communities,
    campaigns: campaigns.map((campaign, index) => ({
      imageURL:
        "https://interledger.org/sites/default/files/styles/article_feature/public/image-uploads/Use%20cases%202.png.webp?itok=eS8i_5Hq", // Placeholder image, change if necessary
      title: campaign.name || `Campaign ${index + 1}`, // Or use campaign.name if available
      description: campaign.description || `This is campaign ${index + 1}`, // Fallback description
      actionText: `View Campaign ${index + 1}`,
      url: `campaign/${campaign.campaignId}`,
    })),
  };
};
