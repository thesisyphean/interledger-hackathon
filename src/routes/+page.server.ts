import { getCampaignByUser } from "$lib/server/database/campaign";
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { check_session } from "$lib/server/sessions";
import { getUserById } from "$lib/server/database/users";

export const load: PageServerLoad = async ({ cookies }) => {
  const userUuid = check_session(cookies.get("session"));
  if (!userUuid) return redirect(303, "/login");

  const user = await getUserById(userUuid);
  if (!user) return redirect(303, "/login");

  const campaigns = await getCampaignByUser(userUuid);
  return {
    user: {
      ...user,
    },
    campaigns: campaigns.map((campaign, index) => ({
      imageURL:
        "https://gratisography.com/wp-content/uploads/2024/01/gratisography-cyber-kitty-800x525.jpg", // Placeholder image, change if necessary
      title: campaign.name || `Campaign ${index + 1}`, // Or use campaign.name if available
      description: campaign.description || `This is campaign ${index + 1}`, // Fallback description
      actionText: `View Campaign ${index + 1}`,
      url: `campaign/${campaign.name || index + 1}`,
    })),
  };
};
//     [
//       {
//         imageURL: "https://gratisography.com/wp-content/uploads/2024/01/gratisography-cyber-kitty-800x525.jpg",
//         title: "Campaign 1",
//         description: "This is campaign 1",
//         actionText: "View Campaign 1",
//         url: "campaign"
//       },
//       {
//         imageURL: "https://gratisography.com/wp-content/uploads/2024/01/gratisography-cyber-kitty-800x525.jpg",
//         title: "Campaign 2",
//         description: "This is campaign 2",
//         actionText: "View Campaign 2",
//         url: "campaign"
//       },
//       {
//         imageURL: "https://gratisography.com/wp-content/uploads/2024/01/gratisography-cyber-kitty-800x525.jpg",
//         title: "Campaign 3",
//         description: "WOWSERS",
//         actionText: "View Campaign 3",
//         url: "campaign"
//       },
//       {
//         imageURL: "https://gratisography.com/wp-content/uploads/2024/01/gratisography-cyber-kitty-800x525.jpg",
//         title: "Campaign 4",
//         description: "This is campaign 4",
//         actionText: "View Campaign 4",
//         url: "campaign"
//       },
//       {
//         imageURL: "https://gratisography.com/wp-content/uploads/2024/01/gratisography-cyber-kitty-800x525.jpg",
//         title: "Campaign 5",
//         description: "This is campaign 5",
//         actionText: "View Campaign 5",
//         url: "campaign"
//       }
//     ]
//   };
// }
