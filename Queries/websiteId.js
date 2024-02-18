import { pool } from "./databaseConnection.js"

const get_WebId_Fun = async (domain) =>{
    try {
        const result =  await pool.query(`SELECT * FROM domains where domain = ?` , [domain]);
        const website_id = result[0][0].website_id;
        return website_id;
    } catch (error) {
        throw new Error("cannot fetch websiteId")
    }
    
}

export default get_WebId_Fun;