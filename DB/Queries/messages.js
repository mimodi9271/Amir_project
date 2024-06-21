const getMessages = async (website_id , mysqlConnectionPool) => {
    let messages = "";
    try {
        const messages = await mysqlConnectionPool.query(`SELECT name , email , received_at , message FROM contact_form_messages where website_id = ?` , [website_id]);

        return messages[0].map(item => ({...item , message : item.message.slice(0 , 32766)}))
    } catch (error) {
        throw new Error("cannnot fetch comments :" + error.message)
    }
}


export default getMessages;