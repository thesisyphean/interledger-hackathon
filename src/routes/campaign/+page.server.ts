import type { PageServerLoad } from './$types';

export const load: PageServerLoad = ({ params }) => {
    return {
        campaignName: "Campaign Name",
        description: "This is a very long description that maybe rambles, perhaps goes on a little longer than it should but absolutely covers all the possible bases and because of that is definitely the right choice from all the options however there are worlds in which it is maybe a little too long.",
        requiredAmount: 10000,
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