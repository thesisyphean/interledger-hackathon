export interface User {
  userId: string; // UUID
  firstName: string;
  surname: string;
  walletAddress: string;
  dateOfBirth: string; // ISO Date string (e.g., 'YYYY-MM-DD')
}

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

export interface Loan {
  loanId: string; // UUID
  beneficiaryId: string; // UUID
  lenderId: string; // UUID
  tigerBeetleId: string; // Simulating unsigned 128-bit integer as string
  amount: number; // Decimal (18, 2)
}

export interface Community {
  communityId: string; // UUID
  name: string;
  description?: string; // Optional field
  creationDate?: string; // ISO Date string (e.g., 'YYYY-MM-DD') default: CURRENT_DATE
}

export interface UserToCommunity {
  userId: string; // UUID
  communityId: string; // UUID
  joinedAt?: string; // ISO Timestamp string (e.g., 'YYYY-MM-DDTHH:MM:SSZ') default: CURRENT_TIMESTAMP
  admin?: boolean; // default: false
}
