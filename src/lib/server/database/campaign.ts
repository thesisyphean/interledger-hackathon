import { pool } from "./index";

export interface Campaign {
  campaignId: string; // UUID
  userId: string; // UUID
  name: string;
  amount: number; // Decimal (18, 2)
  communityId: string; // UUID
  maxInterestRate: number; // Decimal (5, 2)
  description?: string; // Optional field
  dateCreated?: string; // ISO Date string (e.g., 'YYYY-MM-DD') default: CURRENT_DATE
  expiryDate: string; // ISO Date string (e.g., 'YYYY-MM-DD')
  repaymentDurationMonths: number;
  repaymentDelayMonths: number;
}

// get campaign by userid
export async function getCampaignByUser(id: string): Promise<Campaign[]> {
  const result = await pool.query(
    `
            SELECT *
            FROM "campaigns"
            WHERE "userId" = $1;
        `,
    [id],
  );

  return result.rows as Campaign[];
}

// get campaign by campaignId
export async function getCampaignById(id: string): Promise<Campaign | null> {
    const result = await pool.query(
      `
              SELECT *
              FROM "campaigns"
              WHERE "campaignId" = $1;
          `,
      [id],
    );
  
    return (result.rows[0] ?? null) as Campaign | null;
  }

// get campagn by lender
export async function getCampaignByLender(id: string): Promise<Campaign[]> {
  const result = await pool.query(
    `
            SELECT c."campaignId", c."userId", c."name", c."amount", c."communityId", c."maxInterestRate", c."description", c."dateCreated", c."expiryDate", c."repaymentDurationMonths", c."repaymentDelayMonths"
            FROM "campaigns" c
            JOIN "loans" l ON c."userId" = l."beneficiaryId"
            WHERE l."lenderId" = $1;
        `,
    [id],
  );

  return result.rows as Campaign[];
}

// get campaigns by community
export async function getCampaignByCommunity(id: string): Promise<Campaign[]> {
  const result = await pool.query(
    `
            SELECT *
            FROM "campaigns" c
            WHERE c."communityId" = $1;
        `,
    [id],
  );

  return result.rows as Campaign[];
}

// get campaigns in communities by userId
export async function getCommunityCampaignsById(id: string): Promise<Campaign[]> {
    const result = await pool.query(`
        SELECT *
        FROM "campaigns" c
        INNER JOIN "communities" cm ON c."communityId" = cm."communityId"
        INNER JOIN "userToCommunity" utc ON cm."communityId" = utc."communityId"
        WHERE utc."userId" = $1;
    `, [id]);
    return result.rows as Campaign[];
  }

// add campaign
export async function addCampaign(
  userId: string,
  name: string,
  amount: number,
  communityId: string,
  maxInterestRate: number,
  description: string,
  expiryDate: string, // 'YYYY-MM-DD'
  repaymentDurationMonths: number,
  repaymentDelayMonths: number,
): Promise<Campaign> {
  const result = await pool.query(
    `
        INSERT INTO "campaigns" ("userId", "name", "amount", "communityId", "maxInterestRate", "description", "expiryDate", "repaymentDurationMonths", "repaymentDelayMonths")
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        RETURNING *;
    `,
    [
      userId,
      name,
      amount,
      communityId,
      maxInterestRate,
      description,
      expiryDate,
      repaymentDurationMonths,
      repaymentDelayMonths,
    ],
  );

  return result.rows[0] as Campaign;
}

// Remove campaign by campaignId
export async function removeCampaign(campaignId: string): Promise<void> {
  await pool.query(
    `
        DELETE FROM "campaigns" WHERE "campaignId" = $1;
    `,
    [campaignId],
  );
}

// const user = (await getUsers())[0];
// await addCampaign(
//   user.userId,
//   "My Campaign",
//   100,
//   "no community",
//   1,
//   "Whopeeee",
//   "2020-03-03",
//   6,
//   4,
// );
