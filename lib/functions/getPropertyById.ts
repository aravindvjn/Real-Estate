import type { PropertyTypes } from "@/components/cards/type"
import { query } from "../db"

export const getPropertyById = async (property_id: string): Promise<PropertyTypes | undefined> => {
    const results = await query("SELECT * FROM properties WHERE id = $1", [property_id])
    return results.rows[0] || undefined

}