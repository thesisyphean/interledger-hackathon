import type { PageServerLoad } from './$types';

export const load: PageServerLoad = ({ params }) => {
    return {
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