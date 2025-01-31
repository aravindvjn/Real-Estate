'use server'
import xss from "xss";
import { getCurrentUser } from "../functions/getCurrentUser";
import { query } from "../db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { imageUpload } from "./imageUpload";

export type CreatePropertyActionProps = {
    message: string[];
    data?: any;
};

export const addProperty = async (
    selectedImage: string[],
    prev: CreatePropertyActionProps,
    formData: FormData
) => {
    prev.message = [];

    const title = xss(formData.get("title") as string);
    const location = xss(formData.get("location") as string);
    const bedrooms = Number(formData.get("bedrooms"));
    const bathrooms = Number(formData.get("bathrooms"));
    const garage = Number(formData.get("garage"));
    const size = Number(formData.get("size_sqft"));
    const price = Number(formData.get("price"));
    const features = xss(formData.get("features") as string);
    const type = xss(formData.get("type") as string);
    const description = xss(formData.get("description") as string);

    prev.data = { title, location, type, description, bathrooms, bedrooms, garage, size, features, price };

    if (!title || !location || !bathrooms || !bedrooms || !garage || !size || !price || !features || !type || !description) {
        return { ...prev, message: ["All fields are required."] };
    }
    if (selectedImage.length < 2) {
        return { ...prev, message: ["Please select at least two images."] };
    }
    if (selectedImage.length > 10) {
        return { ...prev, message: ["Images should not exceed 10."] };
    }
    try {
        const user = await getCurrentUser(true);
        const owner_id = user?.user_id;

        if (!owner_id) {
            return { ...prev, message: ["User authentication failed."] };
        }

        let image_urls: string[] = await imageUpload(selectedImage);

        if (image_urls.length < 2) {
            return { ...prev, message: ["Failed to upload images."] };
        }

        const sanitizedImages = image_urls.map((img) => xss(img));
        const imageUrls = `{${sanitizedImages.join(",")}}`;

        const featuresArray = features?.trim() ? features.split(",").map(f => f.trim()) : []; // Fixed empty check
        const featureArrayFormatted = `{${featuresArray.join(",")}}`;

        const results = await query(
            `INSERT INTO properties (
                title, location, bedrooms, image_urls, bathrooms, garage, size, price, features, owner_id, type, description
            ) VALUES ( 
                $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12
            ) RETURNING id`,
            [
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
            ]
        );

        if (results.rows.length === 0) {
            return { ...prev, message: ["Failed to create property."] };
        }

        revalidatePath('/');
    } catch (error) {
        console.log(error);
        return { ...prev, message: ["Error creating property."] };
    }

    redirect('/');
};
