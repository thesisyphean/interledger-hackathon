import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { check_session } from "$lib/server/sessions";
import { getUserById } from "$lib/server/database/users";
import { getLoansByBeneficiary } from "$lib/server/database/loans";
import { getLoanBalance } from "$lib/server/ledger";

export const load: PageServerLoad = async ({ params, cookies }) => {
  const userUuid = check_session(cookies.get("session"));
  if (!userUuid) return redirect(303, "/login");

  const user = await getUserById(userUuid);
  if (!user) return redirect(303, "/login");

  const loans = await getLoansByBeneficiary(userUuid);

  return {
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
