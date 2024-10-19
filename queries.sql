-- get info of communites that a given user is in

SELECT c.community_uuid, c.name, c.description, c.creation_date, utc.joined_at, utc.admin
FROM communities c
JOIN user_to_community utc ON c.community_uuid = utc.community_uuid
WHERE utc.user_uuid = '<user_uuid>';

-- get users in a given community

SELECT u.user_id, u.first_name, u.surname, u.wallet_address, u.date_of_birth, utc.joined_at, utc.admin
FROM users u
JOIN user_to_community utc ON u.user_id = utc.user_uuid
WHERE utc.community_uuid = '<community_uuid>';

-- get campaigns in a given community

SELECT ca.campaign_uuid, ca.name, ca.amount, ca.max_interest_rate, ca.description, ca.date_created, ca.expiry_date, ca.repayment_duration_months, ca.repayment_delay_months
FROM campaigns ca
JOIN user_to_community utc ON ca.user_uuid = utc.user_uuid
WHERE utc.community_uuid = '<community_uuid>';

-- get user info by uuid

SELECT *
FROM users u
WHERE u.user_uuid = '<uuid>'

-- get loans by uuid of beneficiary

SELECT l.loan_id, l.beneficiary_uuid, l.lender_uuid, l.tiger_beetle_id, l.amount
FROM loans l
WHERE l.beneficiary_uuid = '<beneficiary_uuid>';

-- get loans by uuid of lender

SELECT l.loan_id, l.beneficiary_uuid, l.lender_uuid, l.tiger_beetle_id, l.amount
FROM loans l
WHERE l.lender_uuid = '<lender_uuid>';

-- add user

INSERT INTO users (first_name, surname, wallet_address, date_of_birth)
VALUES (
    '<first_name>', 
    '<surname>', 
    '<wallet_address>', 
    '<date_of_birth>' --'YYYY-MM-DD'
);

INSERT INTO communities (name, description, creation_date)
VALUES (
    '<name>',               -- Replace with the community name
    '<description>',        -- Replace with a description of the community
    '<creation_date>'       -- Replace with the creation date (format: 'YYYY-MM-DD HH:MM:SS') or leave out to use the current timestamp
);
