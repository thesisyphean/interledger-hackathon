import {pool} from "./index";

export interface Loan {
    loanId: string; // UUID
    beneficiaryId: string; // UUID
    lenderId: string; // UUID
    tigerBeetleId: string; // Simulating unsigned 128-bit integer as string
    amount: number; // Decimal (18, 2)
  }

// get loans by uuid of beneficiary
export async function get_loans_by_beneficiary(id: string): Promise<Loan[]> {
    const result = await pool.query(`
        SELECT *
        FROM loans l
        WHERE l.beneficiaryId = $1;
        `, [id]);
  
    return result.rows as Loan[];
}

// get loans by uuid of lender
export async function get_loans_by_lender(id: string): Promise<Loan[]> {
    const result = await pool.query(`
        SELECT *
        FROM loans l
        WHERE l.lenderId = $1;
        `, [id]);
  
    return result.rows as Loan[];
}

// get loans by communityId

export async function get_loans_by_community(id: string): Promise<Loan[]> {
    const result = await pool.query(`
        SELECT *
        FROM loans l
        JOIN campaigns c ON l.beneficiaryId = c.userId
        WHERE c.communityId = $1;
        `, [id]);
  
    return result.rows as Loan[];
}
