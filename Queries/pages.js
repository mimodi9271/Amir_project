import { pool } from "./databaseConnection.js";

const get_pages = async (website_id) => {
    console.log(website_id)
    try {
        const pages = await pool.query(`SELECT * FROM pages where website_id = ${website_id}`);
        return pages[0];
    } catch (error) {
        throw new Error("cannot fetch pages")
    }

}

export default get_pages;