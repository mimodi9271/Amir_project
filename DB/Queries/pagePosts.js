import { pool } from "../databaseConnection.js"

const getPagePosts = async (website_id) => {
    try {
        const page_posts = await pool.query(`SELECT * FROM page_posts where website_id = ?` , [website_id]);
        return page_posts[0]
    } catch (error) {
        throw new Error("cannot fetch page_posts")
    }

}

export default getPagePosts;