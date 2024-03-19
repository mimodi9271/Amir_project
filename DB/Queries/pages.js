
const getPages = async (website_id , mysqlConnectionPool) => {
    try {
        const pages = await mysqlConnectionPool.query(`SELECT * FROM pages where website_id = ?` , [website_id]);
        return pages[0];
    } catch (error) {
        throw new Error("cannot fetch pages")
    }

}

export default getPages;