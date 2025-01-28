import { query } from "../db"

export const getSuggestion = async () => {

    const results = await query("SELECT * FROM properties LIMIT 3")
    return results.rows || []

}