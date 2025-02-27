'use server';
import type { PropertyTypes } from "@/components/cards/type";
import { query } from "../db";

export type getFilteredPropertiesProps = {
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
        owner_id,
        sort
    }:
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        any,
    page: number = 0
): Promise<PropertyTypes[]> => {
    let code = "SELECT * FROM properties";
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const params: any[] = [];
    const conditions: string[] = [];

    if (!owner_id) {
        conditions.push("sold = FALSE");
    }

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

    if (maxPrice && maxPrice !== 500) {
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
    if (sort) {
        if (sort === 'asc') {
            code += " ORDER BY price ASC";
        } else {
            code += " ORDER BY price DESC";
        }
    } else {
        code += " ORDER BY created_at DESC";
    }
    code += ` LIMIT 24 OFFSET $${params.length + 1}`;
    params.push(page * 10);

    const results = await query(code, params);
    return results.rows || [];
};