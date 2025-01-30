import type { PropertyTypes } from "@/components/cards/type";
import { query } from "../db";

type getFilteredPropertiesProps = {
    type?: string;
    location?: string;
    search?: string;
    category?: "luxury" | "new"; 
};

export const getFilteredProperties = async ({ type, location, search, category }: getFilteredPropertiesProps): Promise<PropertyTypes[]> => {
    let code = "SELECT * FROM properties";
    let params: string[] = [];
    let conditions: string[] = [];

    if (type) {
        conditions.push(`type = $${params.length + 1}`);
        params.push(type);
    }
    if (location) {
        conditions.push(`location = $${params.length + 1}`);
        params.push(location);
    }
    if (search) {
        conditions.push(`(title ILIKE $${params.length + 1} OR description ILIKE $${params.length + 1})`);
        params.push(`%${search}%`);
    }

    if (category === "luxury") {
        conditions.push(`price >= $${params.length + 1}`);
        params.push("100000");
    } else if (category === "new") {
        conditions.push(`created_at >= NOW() - INTERVAL '30 days'`);
    }

    if (conditions.length > 0) {
        code += " WHERE " + conditions.join(" AND ");
    }

    code += " ORDER BY created_at DESC LIMIT 10"; 

    const results = await query(code, params);
    return results.rows || [];
};
