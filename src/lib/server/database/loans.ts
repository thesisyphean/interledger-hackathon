import {pool} from "./index";

export interface Loan {
    loanId: string; // UUID
    beneficiaryId: string; // UUID
    lenderId: string; // UUID
    tigerBeetleId: string; // Simulating unsigned 128-bit integer as string
    amount: number; // Decimal (18, 2)
    donation: boolean;
  }

// get loans by uuid of beneficiary
export async function getLoansByBeneficiary(id: string): Promise<Loan[]> {
    const result = await pool.query(`
        SELECT *
        FROM "loans" l
        WHERE l."beneficiaryId" = $1;
        `, [id]);
  
    return result.rows as Loan[];
}

// get loans by uuid of lender
export async function getLoansByLender(id: string): Promise<Loan[]> {
    const result = await pool.query(`
        SELECT *
        FROM "loans" l
        WHERE l."lenderId" = $1;
        `, [id]);
  
    return result.rows as Loan[];
}

// get loans by communityId
export async function getLoansByCommunity(id: string): Promise<Loan[]> {
    const result = await pool.query(`
        SELECT *
        FROM "loans" l
        JOIN "campaigns" c ON l."beneficiaryId" = c."userId"
        WHERE c."communityId" = $1;
        `, [id]);
  
    return result.rows as Loan[];
}

// add loan
export async function addLoan(
    beneficiaryId: string, 
    lenderId: string, 
    tigerBeetleId: string, 
    amount: number
): Promise<Loan> {
    const result = await pool.query(`
        INSERT INTO "loans" ("beneficiaryId", "lenderId", "tigerBeetleId", "amount")
        VALUES ($1, $2, $3, $4)
        RETURNING *;
    `, [beneficiaryId, lenderId, tigerBeetleId, amount]);
  
    return result.rows[0] as Loan;
}

// Remove loan by loanId
export async function removeLoan(loanId: string): Promise<void> {
    await pool.query(`
        DELETE FROM "loans" WHERE "loanId" = $1;
    `, [loanId]);
}
