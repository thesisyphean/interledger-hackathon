import {pool} from "./index";

export interface Community {
    communityId: string; // UUID
    name: string;
    description?: string; // Optional field
    creationDate?: string; // ISO Date string (e.g., 'YYYY-MM-DD') default: CURRENT_DATE
  }

  export async function get_commmunity_by_user(id: string): Promise<Community[]> {
    const result = await pool.query(`
            SELECT c.communityId, c.name, c.description, c.creationDate
            FROM communities c
            JOIN userToCommunity utc ON c.communityId = utc.communityId
            WHERE utc.userId = $1;
        `, [id]);
  
    return result.rows as Community[];
}

// add community
export async function addCommunity(
    name: string, 
    description: string
): Promise<Community> {
    const result = await pool.query(`
        INSERT INTO communities (name, description)
        VALUES ($1, $2)
        RETURNING *;
    `, [name, description]);
  
    return result.rows[0] as Community;
}

