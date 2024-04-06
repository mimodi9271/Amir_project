const getComments = async (website_id , mysqlConnectionPool) => {
    try {
        const comments = await mysqlConnectionPool.query(`SELECT name , email , message FROM contact_form_messages where website_id = ?` , [website_id]);

        return comments[0]
    } catch (error) {
        throw new Error("cannnot fetch comments")
    }
}


export default getComments;