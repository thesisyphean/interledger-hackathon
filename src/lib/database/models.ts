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
