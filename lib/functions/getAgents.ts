import { query } from "../db";

export const getAgents = async (verifiedAgents?: boolean, page: number = 0) => {
    if (verifiedAgents) {
        console.log(page)
        return []
    }
    const results = await query("SELECT * FROM users WHERE role = 'agent'");
    return results.rows || [];
}