'use server';

import { revalidatePath } from "next/cache";
import { query } from "../db";
import { getUserSession, isAdmin } from "../functions/getCurrentUser";

export type PrevManagePostType = {
    message: string;
    success: boolean;
};

export const managePost = async (id: string | string[] | undefined, operation: "delete" | "sold") => {


    if (!id) {
        return { message: "Invalid ID", success: false };
    }

    try {
        const user = await getUserSession();
        const isADMIN = await isAdmin();

        if (!user || !operation) {
            return { message: "Unauthorized", success: false };
        }

        const user_id = user.id;
        let queryText = "";
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let queryParams: any[] = [];
        if (operation === "delete") {
            queryText = isADMIN
                ? "DELETE FROM properties WHERE id = $1"
                : "DELETE FROM properties WHERE id = $1 AND owner_id = $2";
            queryParams = isADMIN ? [id] : [id, user_id];
        } else if (operation === "sold") {
            queryText = isADMIN
                ? "UPDATE properties SET sold = TRUE WHERE id = $1"
                : "UPDATE properties SET sold = TRUE WHERE id = $1 AND owner_id = $2";
            queryParams = isADMIN ? [id] : [id, user_id];
        }

        await query(queryText, queryParams);

        revalidatePath(`/properties/${id}`);
        revalidatePath("/");

        return { message: operation === "delete" ? "Property deleted successfully" : "Property marked as sold", success: true };
    } catch (error) {
        console.error("Database error:", error);
        return { message: "Database error", success: false };
    }
};
