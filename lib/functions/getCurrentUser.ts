'use server'
import { getServerSession } from "next-auth"
import { authOptions } from "../authOptions"
import { query } from "../db";
import { cache } from "react";


export type SessionType = {
    user: SessionUserType
}
export type SessionUserType = {
    id: string;
    email: string;
    image: string;
    isNewUser: boolean;
    isAdmin: boolean
}

export const getCurrentUser = cache(async (onlyBasicData?: boolean) => {
    try {
        const session: SessionType | null = await getServerSession(authOptions)
        if (!session || !session.user || !session.user.email) {
            return null;
        }
        const email = session.user.email;
        const queryCode = onlyBasicData ? "SELECT user_id,profile_picture_url,email,first_name,last_name FROM users WHERE email = $1" : "SELECT * FROM users WHERE email = $1"

        const results = await query(queryCode, [email])
        if (results.rows.length > 0) {
            return { ...results.rows[0], isAdmin: process.env.ADMIN_EMAIL === results.rows[0].email || false };
        }
        return null;

    } catch (error) {
        console.error(error)
        return null;
    }
})

export const isAdmin = async (): Promise<boolean | null> => {
    const session: SessionType | null = await getServerSession(authOptions)
    if (!session || !session.user || !session.user.email) {
        return null;
    }
    if (session.user.email === process.env.ADMIN_EMAIL) {
        return true;
    }
    return false
}