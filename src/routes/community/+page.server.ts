import type { PageServerLoad } from './$types';

export const load: PageServerLoad = ({ params }) => {
    return {
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