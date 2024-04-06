const getFiles = async (website_id , mysqlConnectionPool) => {
    try {
        const files = await mysqlConnectionPool.query(
            `SELECT * 
             FROM  post_files
             where post_id IN (
                SELECT id
                FROM page_posts
                where website_id = ?)` , [website_id]);

        return files[0]
    } catch (error) {
        throw new Error("cannnot fetch categories")
    }
}


export default getFiles;