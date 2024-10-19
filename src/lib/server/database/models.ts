import {pool} from "./index";

export interface UserToCommunity {
  userId: string; // UUID
  communityId: string; // UUID
  joinedAt?: string; // ISO Timestamp string (e.g., 'YYYY-MM-DDTHH:MM:SSZ') default: CURRENT_TIMESTAMP
  admin?: boolean; // default: false
}

// add user to community
export async function addUserToCommunity(
  userId: string, 
  communityId: string, 
  admin: boolean = false
): Promise<UserToCommunity> {
  const result = await pool.query(`
      INSERT INTO "userToCommunity" ("userId", "communityId", "admin")
      VALUES ($1, $2, $3)
      RETURNING *;
  `, [userId, communityId, admin]);

  return result.rows[0] as UserToCommunity;
}

// Remove user from community by userId and communityId
export async function removeUserFromCommunity(userId: string, communityId: string): Promise<void> {
  await pool.query(`
      DELETE FROM "userToCommunity" WHERE "userId" = $1 AND "communityId" = $2;
  `, [userId, communityId]);
}
