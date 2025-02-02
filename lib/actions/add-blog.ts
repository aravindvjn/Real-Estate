'use server'
export const addBlog = async (prev: {
    message: string,
    success: boolean
}, formData: FormData) => {
    try {
        const queryText = `INSERT INTO blogs (user_id, title, content)  
VALUES ($1, $2, $3)  
RETURNING *;
`
        const values = []
    } catch (error) {

    }
}