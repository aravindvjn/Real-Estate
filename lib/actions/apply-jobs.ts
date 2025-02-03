'use server'

import xss from "xss"
import { query } from "../db"
import { getCurrentUser } from "../functions/getCurrentUser"

export const applyJob = async (prev: {
    message: string,
    success: boolean
}, formData: FormData) => {
    try {
        const title = xss(formData.get('title') as string);
        if (!title) {
            return {
                message: "Something went wrong.Please try again",
                success: false
            }
        }
        const user = await getCurrentUser(true)
        if (!user) {
            return {
                message: "You must be logged in to apply for a job.",
                success: false
            }
        }
        const user_id = user?.user_id


        const alreadyApplied = await query(`
            SELECT * FROM applications WHERE user_id = $1 AND job_title = $2;
        `, [user_id, title])
        if (alreadyApplied.rows.length > 0) {
            return {
                message: "You have already applied for this job.",
                success: false
            }
        }
        const results = await query(`
            INSERT INTO applications (user_id, job_title)
    VALUES ($1,$2) RETURNING user_id;
    `, [user_id, title])
        if (results.rows.length > 0) {
            return {
                message: "Your application was successfully submitted.",
                success: true
            }
        }
        return {
            message: "Failed to submit your application. Please try again later.",
            success: false
        }
    } catch (error) {
        console.error("Error in applying jobs", error)
        return {
            message: "An error occurred while applying for a job. Please try again later.",
            success: false
        }
    }
}