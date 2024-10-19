CREATE TABLE users (
    user_id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    surname VARCHAR(255) NOT NULL,
    wallet_address VARCHAR(255) UNIQUE NOT NULL,
    date_of_birth DATE NOT NULL
);

CREATE TABLE campaigns (
    campaign_uuid UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_uuid UUID NOT NULL,
    name VARCHAR(255) NOT NULL,
    amount DECIMAL(18, 2) NOT NULL,
    community_uuid UUID NOT NULL,
    max_interest_rate DECIMAL(5, 2) NOT NULL,
    description TEXT,
    date_created DATE DEFAULT CURRENT_DATE,
    expiry_date DATE NOT NULL,
    repayment_duration_months INT NOT NULL,
    repayment_delay_months INT NOT NULL,
    FOREIGN KEY (user_uuid) REFERENCES users(user_id)
);

CREATE TABLE loans (
    loan_id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    beneficiary_uuid UUID NOT NULL,
    lender_uuid UUID NOT NULL,
    tiger_beetle_id DECIMAL(39) NOT NULL,  -- Simulating unsigned 128-bit integer
    amount DECIMAL(18, 2) NOT NULL,
    FOREIGN KEY (beneficiary_uuid) REFERENCES users(user_id),
    FOREIGN KEY (lender_uuid) REFERENCES users(user_id)
);

CREATE TABLE communities (
    community_uuid UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    creation_date Date DEFAULT CURRENT_DATE
);

CREATE TABLE user_to_community (
    user_uuid UUID NOT NULL,
    community_uuid UUID NOT NULL,
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    admin BOOLEAN DEFAULT FALSE,  -- Field to track if the user is an admin of the community
    PRIMARY KEY (user_uuid, community_uuid),
    FOREIGN KEY (user_uuid) REFERENCES users(user_id),
    FOREIGN KEY (community_uuid) REFERENCES communities(community_uuid)
);
