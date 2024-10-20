import { pool } from "./index";

export interface User {
  userId: string; // UUID
  email: string;
  password: string;
  firstName: string;
  surname: string;
  walletAddress: string;
}

export interface UserInCommunity {
  userId: string; // UUID
  email: string;
  password: string;
  firstName: string;
  surname: string;
  walletAddress: string;
  joinedAt: string;
  admin: boolean;
}

// return users
export async function getUsers(): Promise<User[]> {
  const result = await pool.query(`SELECT * FROM "users"`);

  return result.rows as User[];
}

// get user info by uuid
export async function getUserById(id: string): Promise<User | null> {
  const result = await pool.query(
    `
        SELECT *
        FROM "users" u
        WHERE u."userId" = $1
    `,
    [id],
  );

  return (result.rows[0] ?? null) as User | null;
}

//  get users in a given community
export async function getUserByCommunity(id: string): Promise<UserInCommunity[]> {
  const result = await pool.query(
    `
        SELECT u."userId", u."email", u."password", u."firstName", u."surname", u."walletAddress", utc."joinedAt", utc."admin"
        FROM "users" u
        JOIN "userToCommunity" utc ON u."userId" = utc."userId"
        WHERE utc."communityId" = $1;
    `,
    [id],
  );

  return result.rows[0] as UserInCommunity[];
}

export async function getUserByEmail(email: string): Promise<User | null> {
  const result = await pool.query(
    `
        SELECT *
        FROM "users" u
        WHERE u."email" = $1
    `,
    [email],
  );

  return (result.rows[0] ?? null) as User | null;
}

// add user
export async function addUser(
  email: string,
  password: string,
  firstName: string,
  surname: string,
  walletAddress: string,
): Promise<User> {
  const result = await pool.query(
    `
        INSERT INTO "users" ("email", "password", "firstName", "surname", "walletAddress")
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
    `,
    [email, password, firstName, surname, walletAddress],
  );

  return result.rows[0] as User;
}

// Remove user by userId
export async function removeUser(userId: string): Promise<void> {
  await pool.query(
    `
        DELETE FROM "users" WHERE "userId" = $1;
    `,
    [userId],
  );
}

// get owner of campaign

export async function getOwner(campagnId: string): Promise<User | null> {
  const result = await pool.query(
    `
        SELECT u.*
        FROM "users" u
        INNER JOIN "campaigns" c ON u."userId" = c."userId"
        WHERE c."campaignId" = $1;
      `,
    [campagnId],
  );

  return (result.rows[0] ?? null) as User | null;
}
