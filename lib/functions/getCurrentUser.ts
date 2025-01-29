'use server'
import { getServerSession } from "next-auth"
import { authOptions } from "../authOptions"
import { query } from "../db";

export const getCurrentUser = async (onlyBasicData?: boolean) => {
    try {
        const session = await getServerSession(authOptions)
        if (!session || !session.user || !session.user.email) {
            return null;
        }
        const email = session.user.email;
        const queryCode = onlyBasicData ? "SELECT user_id,profile_picture_url,email,first_name,last_name FROM users WHERE email = $1" : "SELECT * FROM users WHERE email = $1"
        
        const results = await query(queryCode, [email])

        if (results.rows.length > 0) {
            return results.rows[0];
        }
        return null;

    } catch (error) {
        console.error(error)
        return null;
    }
}