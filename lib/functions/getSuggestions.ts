import { query } from "../db";

export const getSuggestion = async () => {
    const results = await query(
        "SELECT * FROM properties WHERE sold = FALSE ORDER BY RANDOM() LIMIT 3"
    );
    return results.rows || [];
};
