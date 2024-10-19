import {pool} from "./index";

export interface User {
    userId: string; // UUID
    firstName: string;
    surname: string;
    walletAddress: string;
  }

export interface UserInCommunity {
    userId: string; // UUID
    firstName: string;
    surname: string;
    walletAddress: string;
    joinedAt: string;
    admin: boolean;
  }

// return users
export async function get_users(): Promise<User[]> {
    const result = await pool.query("SELECT * FROM users");
  
    return result.rows as User[];
}

// get user info by uuid
export async function get_user_by_id(id:string): Promise<User|null>{
    const result = await pool.query(`
        SELECT *
        FROM users u
        WHERE u.userId = $1
    `,[id]);
  
    return (result.rows[0]??null) as User|null;
}

//  get users in a given community
export async function get_user_by_community(id:string): Promise<UserInCommunity[]>{
    const result = await pool.query(`
        SELECT u.userId, u.firstName, u.surname, u.walletAddress, utc.joinedAt, utc.admin
        FROM users u
        JOIN userToCommunity utc ON u.userId = utc.userId
        WHERE utc.communityId = $1;
    `,[id]);
  
    return result.rows[0] as UserInCommunity[];
}

