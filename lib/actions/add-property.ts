'use server';
import xss from "xss";
import { getCurrentUser } from "../functions/getCurrentUser";
import { query } from "../db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { imageUpload } from "./imageUpload";

export type CreatePropertyActionProps = {
    message: string[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data?: any;
};

export const addProperty = async (
    selectedImage: string[],
    data: { pathName: string, id: string, real_owner_id: string },
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

    if (title.length < 5 || title.length > 100) {
        return { ...prev, message: ["Title must be between 5 and 100 characters."] };
    }

    if (location.length < 5 || location.length > 150) {
        return { ...prev, message: ["Location must be between 5 and 150 characters."] };
    }

    if (description.length < 20 || description.length > 1000) {
        return { ...prev, message: ["Description must be between 20 and 1000 characters."] };
    }

    if (features.length < 3 || features.length > 500) {
        return { ...prev, message: ["Features must be between 3 and 500 characters."] };
    }

    if (price <= 0) {
        return { ...prev, message: ["Price must be a positive number."] };
    }

    if (bedrooms <= 0 || bathrooms <= 0 || garage < 0 || size <= 0) {
        return { ...prev, message: ["Bedrooms, Bathrooms, Garage, and Size must be positive values."] };
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

        const image_urls: string[] = await imageUpload(selectedImage);

        if (image_urls.length < 2) {
            return { ...prev, message: ["Failed to upload images."] };
        }

        const sanitizedImages = image_urls.map((img) => xss(img));
        const imageUrls = `{${sanitizedImages.join(",")}}`;

        const featuresArray = features?.trim() ? features.split(",").map(f => f.trim()) : [];
        const featureArrayFormatted = `{${featuresArray.join(",")}}`;

        let results;
        if (data?.pathName.split('/')[3] === "edit") {
            if (data.real_owner_id !== owner_id) {
                return { ...prev, message: ["Unauthorized Access Found."] }
            }
            results = await query(
                `UPDATE properties SET 
                    title=$1, location=$2, type=$3, description=$4, bedrooms=$5, bathrooms=$6, garage=$7, size=$8, price=$9, features=$10,image_urls=$11
                WHERE owner_id=$12 AND id=$13 RETURNING id`,
                [
                    title,
                    location,
                    type,
                    description,
                    bedrooms,
                    bathrooms,
                    garage,
                    size,
                    price,
                    featureArrayFormatted,
                    imageUrls,
                    owner_id,
                    data.id
                ]
            );
        }
        else {
            results = await query(
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
        }

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
