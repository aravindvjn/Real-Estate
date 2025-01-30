'use server'
import xss from "xss";
import { getCurrentUser } from "../functions/getCurrentUser";
import { query } from "../db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { imageUpload } from "./imageUpload";

export type CreatePropertyActionProps = {
    message: string[];
};

export const addProperty = async (
    selectedImage: string[],
    prev: CreatePropertyActionProps,
    formData: FormData
) => {
    prev.message = []

    const title = xss(formData.get("title") as string);
    const location = xss(formData.get("location") as string);
    const bedrooms = Number(formData.get("bedrooms"));
    const bathrooms = Number(formData.get("bathrooms"));
    const garage = Number(formData.get("garage"));
    const size = Number(formData.get("size in sq.mtr"));
    const price = Number(formData.get("price"));
    const features = xss(formData.get("features") as string);
    const type = xss(formData.get("type") as string);
    const description = xss(formData.get("description") as string);


    if (!title || !location || !bathrooms || !bedrooms || !garage || !size || !price || !features || !type || !description) {
        prev.message.push("All fields are required.");
        return prev;
    }
    if (selectedImage.length < 2) {
        prev.message.push("Please select at least two images.");
        return prev;
    }

    try {
        const user = await getCurrentUser(true);
        const owner_id = user?.user_id;

        if (!owner_id) {
            prev.message.push("User authentication failed.");
            return prev;
        }

        let image_urls: string[] = await imageUpload(selectedImage)

        if (image_urls.length < 2) {
            prev.message.push("Failed to upload images.");
            return prev;
        }

        const sanitizedImages = image_urls.map((img) => xss(img));
        const imageUrls = `{${sanitizedImages.join(",")}}`;

        const featuresArray = features.split(",").map((f) => f.trim()).filter(Boolean);

        const featureArrayFormatted = `{${featuresArray.join(",")}}`;

        const results = await query(`
    INSERT INTO properties (
        title, location, bedrooms, image_urls, bathrooms, garage, size, price, features, owner_id, type, description
    ) VALUES ( 
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12
    ) RETURNING id
`, [
            title,
            location,
            bedrooms,
            imageUrls,
            bathrooms,
            garage,
            size,
            price,
            featureArrayFormatted,
            owner_id,
            type,
            description
        ]);


        if (results.rows.length === 0) {
            prev.message.push("Failed to create property");
            return prev;
        }

        revalidatePath('/');
    } catch (error) {
        console.log(error);
        prev.message.push("Error creating property");
        return prev;
    }

    redirect('/');

};
