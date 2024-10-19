import pg from "pg";
import { DATABASE_HOST, DATABASE_USER, DATABASE_PASSWORD } from "$env/static/private";

export const pool = new pg.Pool({
  host: DATABASE_HOST,
  user: DATABASE_USER,
  password: DATABASE_PASSWORD,
  max: 20,
  ssl: {
    rejectUnauthorized: false,
  },
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

async function initDb() {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    await client.query(
      `
DROP SCHEMA public CASCADE; CREATE SCHEMA public;

CREATE TABLE IF NOT EXISTS "users" (
    "userId" UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "firstName" VARCHAR(255) NOT NULL,
    "surname" VARCHAR(255) NOT NULL,
    "walletAddress" VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS "campaigns" (
    "campaignId" UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    "userId" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "amount" DECIMAL(18, 2) NOT NULL,
    "communityId" UUID NOT NULL,
    "maxInterestRate" DECIMAL(5, 2) NOT NULL,
    "description" TEXT,
    "dateCreated" DATE DEFAULT CURRENT_DATE,
    "expiryDate" DATE NOT NULL,
    "repaymentDurationMonths" INT NOT NULL,
    "repaymentDelayMonths" INT NOT NULL,
    FOREIGN KEY ("userId") REFERENCES "users"("userId")
);

CREATE TABLE IF NOT EXISTS "loans" (
    "loanId" UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    "beneficiaryId" UUID NOT NULL,
    "lenderId" UUID NOT NULL,
    "tigerBeetleId" DECIMAL(39) NOT NULL,  -- unsigned 128-bit integer
    "amount" DECIMAL(18, 2) NOT NULL,
    "donation" BOOLEAN NOT NULL,
    FOREIGN KEY ("beneficiaryId") REFERENCES "users"("userId"),
    FOREIGN KEY ("lenderId") REFERENCES "users"("userId")
);

CREATE TABLE IF NOT EXISTS "communities" (
    "communityId" UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "creationDate" DATE DEFAULT CURRENT_DATE
);

CREATE TABLE IF NOT EXISTS userToCommunity (
    "userId" UUID NOT NULL,
    "communityId" UUID NOT NULL,
    "joinedAt" DATE DEFAULT CURRENT_DATE,
    "admin" BOOLEAN DEFAULT FALSE,
    PRIMARY KEY ("userId", "communityId"),
    FOREIGN KEY ("userId") REFERENCES "users"("userId"),
    FOREIGN KEY ("communityId") REFERENCES "communities"("communityId")
);

INSERT INTO "users" ("email", "password", "firstName", "surname", "walletAddress")
    VALUES ('luke.eberhard@gmail.com', 'poes', 'Luke', 'Eberhard', 'ergwfqegrergbegr');
`,
    );

    await client.query("COMMIT");
  } catch (e) {
    await client.query("ROLLBACK");
    throw e;
  } finally {
    client.release();
  }
}

await initDb();
