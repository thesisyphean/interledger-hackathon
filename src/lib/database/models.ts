export interface User {
  userId: string; // UUID
  firstName: string;
  surname: string;
  walletAddress: string;
  dateOfBirth: string; // ISO Date string (e.g., 'YYYY-MM-DD')
}

export interface Campaign {
  campaignUuid: string; // UUID
  userUuid: string; // UUID
  name: string;
  amount: number; // Decimal (18, 2)
  communityUuid: string; // UUID
  maxInterestRate: number; // Decimal (5, 2)
  description?: string; // Optional field
  dateCreated?: string; // ISO Date string (e.g., 'YYYY-MM-DD') default: CURRENT_DATE
  expiryDate: string; // ISO Date string (e.g., 'YYYY-MM-DD')
  repaymentDurationMonths: number;
  repaymentDelayMonths: number;
}

export interface Loan {
  loanId: string; // UUID
  beneficiaryUuid: string; // UUID
  lenderUuid: string; // UUID
  tigerBeetleId: string; // Simulating unsigned 128-bit integer as string
  amount: number; // Decimal (18, 2)
}

export interface Community {
  communityUuid: string; // UUID
  name: string;
  description?: string; // Optional field
  creationDate?: string; // ISO Date string (e.g., 'YYYY-MM-DD') default: CURRENT_DATE
}

export interface UserToCommunity {
  userUuid: string; // UUID
  communityUuid: string; // UUID
  joinedAt?: string; // ISO Timestamp string (e.g., 'YYYY-MM-DDTHH:MM:SSZ') default: CURRENT_TIMESTAMP
  admin?: boolean; // default: false
}
