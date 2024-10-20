import { pool } from "./index";

export interface Loan {
  loanId: string; // UUID
  beneficiaryId: string; // UUID
  lenderId: string; // UUID
  tigerBeetleId1: number; // Simulating unsigned 128-bit integer as string
  tigerBeetleId2: number;
  amount: number; // Decimal (18, 2)
  donation: boolean;
}

// get loan between two users
export async function getLoanById(id: string): Promise<Loan> {
  const result = await pool.query(
    `
        SELECT *
        FROM "loans" l
        WHERE l."loanId" = $1
        LIMIT 1;
        `,
    [id],
  );

  return result.rows[0] as Loan;
}

// get loans by uuid of beneficiary
export async function getLoansByBeneficiary(id: string): Promise<Loan[]> {
  const result = await pool.query(
    `
        SELECT *
        FROM "loans" l
        WHERE l."beneficiaryId" = $1;
        `,
    [id],
  );

  return result.rows as Loan[];
}

// get loans by uuid of lender
export async function getLoansByLender(id: string): Promise<Loan[]> {
  const result = await pool.query(
    `
        SELECT *
        FROM "loans" l
        WHERE l."lenderId" = $1;
        `,
    [id],
  );

  return result.rows as Loan[];
}

// get loans by communityId
export async function getLoansByCommunity(id: string): Promise<Loan[]> {
  const result = await pool.query(
    `
        SELECT *
        FROM "loans" l
        JOIN "campaigns" c ON l."beneficiaryId" = c."userId"
        WHERE c."communityId" = $1;
        `,
    [id],
  );

  return result.rows as Loan[];
}

export async function getLoansByCampaign(id: string): Promise<Loan[]> {
  const result = await pool.query(
    `
        SELECT l.*
        FROM "loans" l
        INNER JOIN "users" u ON l."beneficiaryId" = u."userId"
        INNER JOIN "campaigns" c ON u."userId" = c."userId"
        WHERE c."campaignId" = $1;
        `,
    [id],
  );

  return result.rows as Loan[];
}

// add loan
export async function addLoan(
  beneficiaryId: string,
  lenderId: string,
  tigerBeetleId1: number,
  tigerBeetleId2: number,
  amount: number,
  donation: boolean,
): Promise<Loan> {
  const result = await pool.query(
    `
        INSERT INTO "loans" ("beneficiaryId", "lenderId", "tigerBeetleId1", "tigerBeetleId2", "amount", "donation")
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *;
    `,
    [beneficiaryId, lenderId, tigerBeetleId1, tigerBeetleId2, amount, donation],
  );

  return result.rows[0] as Loan;
}

// Remove loan by loanId
export async function removeLoan(loanId: string): Promise<void> {
  await pool.query(
    `
        DELETE FROM "loans" WHERE "loanId" = $1;
    `,
    [loanId],
  );
}
