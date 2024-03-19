
const getPagePosts = async (website_id , mysqlConnectionPool) => {
    try {
        const page_posts = await mysqlConnectionPool.query(`SELECT * FROM page_posts where website_id = ?` , [website_id]);
        return page_posts[0]
    } catch (error) {
        throw new Error("cannot fetch page_posts")
    }

}

export default getPagePosts;