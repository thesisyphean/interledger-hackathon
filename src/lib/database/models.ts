export interface UserToCommunity {
  userId: string; // UUID
  communityId: string; // UUID
  joinedAt?: string; // ISO Timestamp string (e.g., 'YYYY-MM-DDTHH:MM:SSZ') default: CURRENT_TIMESTAMP
  admin?: boolean; // default: false
}
