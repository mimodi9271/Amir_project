const getMessages = async (website_id , mysqlConnectionPool) => {
    try {
        const messages = await mysqlConnectionPool.query(`SELECT name , email , received_at , message FROM contact_form_messages where website_id = ?` , [website_id]);

        return messages[0]
    } catch (error) {
        throw new Error("cannnot fetch comments :" + error.message)
    }
}


export default getMessages;