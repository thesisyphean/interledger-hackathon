import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { check_session } from "$lib/server/sessions";
import { getUserById } from "$lib/server/database/users";
import { getLoansByBeneficiary } from "$lib/server/database/loans";
import { getLoanCredits, getLoanDebits } from "$lib/server/ledger";

export const load: PageServerLoad = async ({ cookies }) => {
  const userUuid = check_session(cookies.get("session"));
  if (!userUuid) return redirect(303, "/login");

  const user = await getUserById(userUuid);
  if (!user) return redirect(303, "/login");

  const loans = await getLoansByBeneficiary(userUuid);

  return {
    loans: await Promise.all(
      loans.map(async (loan, index) => {
        const lender = (await getUserById(loan.lenderId))!;
        const amountPaid = await getLoanDebits(loan.loanId);
        const totalAmount = await getLoanCredits(loan.loanId);
        return {
          title: loan.donation ? `Donation ${index + 1}` : `Loan ${index + 1}`,
          beneficiary: `${lender.firstName} ${lender.surname}`,
          amountPaid: amountPaid / 100,
          totalAmount: totalAmount / 100,
          donation: loan.donation,
        };
      }),
    ),
  };
};
