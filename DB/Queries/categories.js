

const getCategories = async (website_id , mysqlConnectionPool) => {
    try {
        const joinCategries = await mysqlConnectionPool.query(`
        SELECT categories.id, categories.title , categories.slug , post_categories.post_id , categories.parent_id
        FROM categories
        INNER JOIN post_categories 
        ON  categories.id = post_categories.category_id
        AND categories.website_id = ? ` , [website_id])

        const categories = await mysqlConnectionPool.query(`SELECT * FROM categories where website_id = ?` , [website_id]);

        return { joinCategries : joinCategries[0] , categories : categories[0] }
    } catch (error) {
        throw new Error("cannnot fetch categories")
    }
}


export default getCategories;