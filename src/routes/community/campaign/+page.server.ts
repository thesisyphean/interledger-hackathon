import type { PageServerLoad } from './$types';

export const load: PageServerLoad = ({ params }) => {
    return {
        campaignName: "Campaign Name",
        description: "Beneficiary...",
        requiredAmount: 10000,
        isOwner: false,
        loans: [
            {
                title: "Loan 1",
                beneficiary: "Joe Biden",
                totalAmount: 1000,
                amountPaid: 500,
            }
        ]
    };
}