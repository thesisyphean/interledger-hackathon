import { get_campaign_by_user } from "$lib/server/database/campaign";
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from './$types';
import { check_session } from "$lib/server/sessions";

export const load: PageServerLoad = async ({ cookies }) => {
  const user_uuid = check_session(cookies.get("session"));
  if (!user_uuid)
    return redirect(303, "/login");

  let user = await get_campaign_by_user(user_uuid);
  return {
    user: {

    },
    campaigns: [
      {
        imageURL: "https://gratisography.com/wp-content/uploads/2024/01/gratisography-cyber-kitty-800x525.jpg",
        title: "Campaign 1",
        description: "This is campaign 1",
        actionText: "View Campaign 1",
        url: "campaign"
      },
      {
        imageURL: "https://gratisography.com/wp-content/uploads/2024/01/gratisography-cyber-kitty-800x525.jpg",
        title: "Campaign 2",
        description: "This is campaign 2",
        actionText: "View Campaign 2",
        url: "campaign"
      },
      {
        imageURL: "https://gratisography.com/wp-content/uploads/2024/01/gratisography-cyber-kitty-800x525.jpg",
        title: "Campaign 3",
        description: "WOWSERS",
        actionText: "View Campaign 3",
        url: "campaign"
      },
      {
        imageURL: "https://gratisography.com/wp-content/uploads/2024/01/gratisography-cyber-kitty-800x525.jpg",
        title: "Campaign 4",
        description: "This is campaign 4",
        actionText: "View Campaign 4",
        url: "campaign"
      },
      {
        imageURL: "https://gratisography.com/wp-content/uploads/2024/01/gratisography-cyber-kitty-800x525.jpg",
        title: "Campaign 5",
        description: "This is campaign 5",
        actionText: "View Campaign 5",
        url: "campaign"
      }
    ]
  };
}
