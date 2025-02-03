'use server'

import xss from "xss"
import { getCurrentUser } from "../functions/getCurrentUser"
import { query } from "../db"
import { imageUpload } from "./imageUpload"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export const addBlog = async (selectedImage: string[], prev: {
    message: string,
    success: boolean
}, formData: FormData) => {
    const title = xss(formData.get("title") as string)
    const content = xss(formData.get("content") as string)
    if (!title || !content) {
        return {
            message: "Please fill all the fields.",
            success: false,
        }
    }

    if (!selectedImage) {
        prev = {
            message: "Please select one image for the blog.",
            success: false,
        }
        return prev;
    }
    let thumbnail;
    const res = await imageUpload(selectedImage);
    if (res.length > 0) {
        thumbnail = res[0];
    } else {
        return {
            message: "Failed to upload thumbnail image.",
            success: false,
        }
    }

    const user = await getCurrentUser(true)
    if (!user) {
        prev = {
            message: "You must be logged in to add a blog.",
            success: false,
        }
        return prev;
    }

    const { user_id } = user
    try {
        const queryText = `INSERT INTO blogs (user_id,thumbnail, title, content)  
VALUES ($1, $2, $3,$4)  
RETURNING *;
`
        const values = [user_id, thumbnail, title, content]
        const results = await query(queryText, values)
        if (results.rows.length === 0) {
            return {
                message: "Failed to add blog. Please try again later.",
                success: false,
            }
        }


    } catch (error) {
        console.log("Error in creating blogs : ", error)
        return {
            message: "An error occurred while adding the blog. Please try again later.",
            success: false,
        }
    }
    revalidatePath('/blog')
    redirect('/blog')
}