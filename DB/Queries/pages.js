
const getPages = async (website_id , pool) => {
    try {
        const pages = await pool.query(`SELECT * FROM pages where website_id = ?` , [website_id]);
        return pages[0];
    } catch (error) {
        throw new Error("cannot fetch pages")
    }

}

export default getPages;