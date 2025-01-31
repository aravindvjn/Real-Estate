'use server'
import type { PropertyTypes } from "@/components/cards/type";
import { query } from "../db";

type getFilteredPropertiesProps = {
    type?: string;
    location?: string;
    search?: string;
    category?: "luxury" | "new";
    bedroom?: number;
    bathroom?: number;
    garage?: number;
    minPrice?: number;
    maxPrice?: number;
    size?: number;
    owner_id?: string;
};

export const getFilteredProperties = async (
    {
        type,
        location,
        search,
        category,
        bedroom,
        bathroom,
        garage,
        minPrice,
        maxPrice,
        size,
        owner_id
    }: getFilteredPropertiesProps,
    page: number = 0
): Promise<PropertyTypes[]> => {
    let code = "SELECT * FROM properties";
    let params: any[] = [];
    let conditions: string[] = [];
    if (type) {
        conditions.push(`type = $${params.length + 1}`);
        params.push(type);
    }

    if (location) {
        conditions.push(`(location ILIKE $${params.length + 1} OR title ILIKE $${params.length + 1} OR description ILIKE $${params.length + 1})`);
        params.push(`%${location}%`);
    }


    if (search) {
        conditions.push(`(title ILIKE $${params.length + 1} OR description ILIKE $${params.length + 1})`);
        params.push(`%${search}%`);
    }

    if (category === "luxury") {
        conditions.push(`price >= $${params.length + 1}`);
        params.push("5000000");
    } else if (category === "new") {
        conditions.push(`created_at >= NOW() - INTERVAL '30 days'`);
    }

    if (minPrice) {
        conditions.push(`price >= $${params.length + 1}`);
        params.push(minPrice * 100000);
    }

    if (maxPrice) {
        conditions.push(`price <= $${params.length + 1}`);
        params.push(maxPrice * 100000);
    }

    if (size) {
        conditions.push(`size >= $${params.length + 1}`);
        params.push(size);
    }

    if (bedroom) {
        conditions.push(`bedrooms >= $${params.length + 1}`);
        params.push(bedroom);
    }

    if (bathroom) {
        conditions.push(`bathrooms >= $${params.length + 1}`);
        params.push(bathroom);
    }

    if (garage) {
        conditions.push(`garage >= $${params.length + 1}`);
        params.push(garage);
    }

    if (owner_id) {
        conditions.push(`owner_id = $${params.length + 1}`);
        params.push(owner_id);
    }

    if (conditions.length > 0) {
        code += " WHERE " + conditions.join(" AND ");
    }

    code += ` ORDER BY created_at DESC LIMIT 24 OFFSET $${params.length + 1}`;
    params.push((page) * 10);
    console.log(code, params)
    const results = await query(code, params);
    console.log(results.rows)
    return results.rows || [];
};
