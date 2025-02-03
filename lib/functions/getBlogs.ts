'use server'

import { query } from "../db"

export const getBlogs = async (page: number = 0) => {
    const offset = (page) * 10
    const results = await query(`
SELECT 
* FROM blogs ORDER BY created_at DESC
OFFSET $1 LIMIT 10
`, [offset])
    if (results.rows.length > 0) {
        return results.rows
    }
    return []
}