'use server'
import xss from "xss";
import { getUserSession } from "../functions/getCurrentUser";
import { query } from '@/lib/db'
import { revalidatePath } from "next/cache";
export const addReview = async (prev: { message: string, success: boolean }, formData: FormData) => {
    prev = {
        message: "",
        success: false,
    }
    const review_text = xss(formData.get('review_text') as string);
    const rating = Number(formData.get('rating'));

    if (!review_text || !rating) {
        return {
            message: "All fields are required.",
            success: false,
        };
    }
    if (review_text.length < 3 || review_text.length > 200) {
        return {
            message: "Review text must be between 3 and 200 characters.",
            success: false,
        };
    }
    try {
        const user = await getUserSession()
        if (!user) {
            return {
                message: "You must be logged in to add a review.",
                success: false,
            };
        }

        const user_id = user?.id

        const queryText = `
    INSERT INTO reviews (user_id, rating, review_text, created_at)
    VALUES ($1, $2, $3, CURRENT_TIMESTAMP)
    RETURNING id, user_id, rating, review_text, created_at;
  `;
        const values = [user_id, rating, review_text];
        const results = await query(queryText, values)
        if (results.rows.length > 0) {
            revalidatePath('/')
            return {
                message: "Your review was successfully added!",
                success: true,
            };
        }

        return {
            message: "Failed to add review. Please try again later.",
            success: false,
        };

    } catch (error) {
        console.log(error);
        return {
            message: "An error occurred while adding the review. Please try again later.",
            success: false,
        };
    }
}