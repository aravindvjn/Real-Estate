'use server'

import { query } from "../db";

export const getUser = async (user_id: string) => {
    try {

        const queryCode = "SELECT * FROM users WHERE user_id = $1"

        const results = await query(queryCode, [user_id])

        if (results.rows.length > 0) {
            return results.rows[0];
        }
        return null;

    } catch (error) {
        console.error(error)
        return null;
    }
}