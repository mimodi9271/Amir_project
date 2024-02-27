import { pool } from "../databaseConnection.js"

const getTags = async (website_id) => {

    try {
        const joinTags = await pool.query(`
        SELECT tags.id , tags.title , tags_posts.post_id
        FROM tags
        INNER JOIN tags_posts 
        ON  tags.id = tags_posts.tag_id
        AND tags.website_id = ?` , [website_id]);

        const tags =  await pool.query(`SELECT * FROM tags where website_id = ?` , [website_id]);

        return {tags : tags[0] , joinTags : joinTags[0]}
    } catch (error) {
        throw new Error("cannot fetch tags")
    }
}

export default getTags;