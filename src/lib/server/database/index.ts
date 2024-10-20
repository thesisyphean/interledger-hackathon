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
    "tigerBeetleId1" DECIMAL(39) NOT NULL,  -- unsigned 128-bit integer
    "tigerBeetleId2" DECIMAL(39) NOT NULL,
    "amount" DECIMAL(18, 2) NOT NULL,
    "donation" BOOLEAN NOT NULL
    --FOREIGN KEY ("beneficiaryId") REFERENCES "users"("userId"),
    --FOREIGN KEY ("lenderId") REFERENCES "users"("userId")
);

CREATE TABLE IF NOT EXISTS "communities" (
    "communityId" UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "creationDate" DATE DEFAULT CURRENT_DATE
);

INSERT INTO "communities" ("name", "description")
    VALUES ('Sample Community', 'Sample Community Description'),
    ('Sample Community 2', 'Second Community Description');

CREATE TABLE IF NOT EXISTS "userToCommunity" (
    "userId" UUID NOT NULL,
    "communityId" UUID NOT NULL,
    "joinedAt" DATE DEFAULT CURRENT_DATE,
    "admin" BOOLEAN DEFAULT FALSE,
    PRIMARY KEY ("userId", "communityId"),
    FOREIGN KEY ("userId") REFERENCES "users"("userId"),
    FOREIGN KEY ("communityId") REFERENCES "communities"("communityId")
);

INSERT INTO "users" ("email", "password", "firstName", "surname", "walletAddress")
    VALUES ('luke.eberhard@gmail.com', 'password', 'Luke', 'Eberhard', 'https://ilp.interledger-test.dev/payment-yes'),
           ('joe@test.com', 'pword', 'Joe', 'Test', 'https://ilp.interledger-test.dev/testpointer');

INSERT INTO "userToCommunity" ("userId", "communityId")
    VALUES (
        (SELECT "userId" FROM "users" WHERE "firstName" = "Luke"LIMIT 1),
        (SELECT "communityId" FROM "communities" LIMIT 1)
    ),
    (
      (SELECT "userId" FROM "users" WHERE "firstName" = "Luke" LIMIT 1),
      (SELECT "communityId" FROM "communities" WHERE "name" = 'Sample Community 2' LIMIT 1)
    ),
    (
      (SELECT "userId" FROM "users" WHERE "firstName" = "Joe" LIMIT 1),
      (SELECT "communityId" FROM "communities" WHERE "name" = 'Sample Community 2' LIMIT 1)
    );

INSERT INTO "campaigns" (
    "userId",
    "name",
    "amount",
    "communityId",
    "maxInterestRate",
    "description",
    "dateCreated",
    "expiryDate",
    "repaymentDurationMonths",
    "repaymentDelayMonths"
)
VALUES (
    (SELECT "userId" FROM "users" ORDER BY "userId" LIMIT 1),  -- Get the UUID of the first user
    'Sample Campaign Name',                                 -- Filler campaign name
    1000.00,
    (SELECT "communityId" FROM communities ORDER BY "communityId" LIMIT 1), -- Get the UUID of the first community
    5.00,                                                -- Filler max interest rate
    'This is a sample campaign description.',            -- Filler description
    CURRENT_DATE,                                       -- Default to current date
    CURRENT_DATE + INTERVAL '30 days',                 -- Expiry date set to 30 days from now
    12,                                                 -- Filler repayment duration in months
    1                                                   -- Filler repayment delay in months
), (
    (SELECT "userId" FROM "users" ORDER BY "userId" LIMIT 1),  -- Get the UUID of the first user
    'Second Sample Campaign',                                 -- Filler campaign name
    2000.00,
    (SELECT "communityId" FROM communities ORDER BY "communityId" LIMIT 1), -- Get the UUID of the first community
    5.00,                                                -- Filler max interest rate
    'This is another sample campaign description.',            -- Filler description
    CURRENT_DATE,                                       -- Default to current date
    CURRENT_DATE + INTERVAL '30 days',                 -- Expiry date set to 30 days from now
    12,                                                 -- Filler repayment duration in months
    1                                                   -- Filler repayment delay in months
), (
    (SELECT "userId" FROM "users" WHERE "firstName" = "Joe" LIMIT 1),  -- Get the UUID of the first user
    'Joe's Sample Campaign',                                 -- Filler campaign name
    2000.00,
    (SELECT "communityId" FROM communities WHERE "name" = 'Sample Community 2' LIMIT 1), -- Get the UUID of the first community
    5.00,                                                -- Filler max interest rate
    'This is a third sample campaign description.',            -- Filler description
    CURRENT_DATE,                                       -- Default to current date
    CURRENT_DATE + INTERVAL '30 days',                 -- Expiry date set to 30 days from now
    12,                                                 -- Filler repayment duration in months
    1                                                   -- Filler repayment delay in months
);
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
