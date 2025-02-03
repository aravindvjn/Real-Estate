import { query } from "../db"

export const getBlogById = async (id: string) => {
    const results = await query(`
        SELECT 
u.first_name,
u.last_name,
b.*
FROM blogs b
JOIN users u ON b.user_id = u.user_id
WHERE id = $1`, [Number(id)])
    return results.rows[0]

}