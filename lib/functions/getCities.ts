import { cities } from "@/globals/constants";
import { query } from "../db";

export type CitiesProps = {
    city: string;
    image_url?: string;
    no_properties?: number;
}
export const getCities = async () => {
    


    const conditions = cities.map((_, index) => `location ILIKE $${index + 1}`).join(" OR ");
    const values = cities.map(city => `%${city.city}%`);

    const code = `
        SELECT location, COUNT(*) AS no_properties
        FROM properties
        WHERE ${conditions}
        GROUP BY location;
    `;

    try {
        const results = await query(code, values);
        const structuredData = results.rows?.reduce((acc, row) => {
            cities.forEach((city) => {
                if (row.location.toLowerCase().includes(city.city.toLowerCase())) {
                    const existingCity = acc.find((item: CitiesProps) => item.city === city.city);
                    if (existingCity) {
                        existingCity.no_properties += parseInt(row.no_properties);
                    } else {
                        acc.push({
                            city: city.city,
                            no_properties: parseInt(row.no_properties),
                            image_url: city.image_url
                        });
                    }
                }
            });
            return acc;
        }, []);

        return structuredData || [];
    } catch (error) {
        console.error("Error fetching cities:", error);
        return [];
    }
};
