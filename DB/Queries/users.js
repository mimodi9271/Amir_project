
const getWebsiteUsers = async (website_id , mysqlConnectionPool) => {
    try {
        const websiteUsers = await mysqlConnectionPool.query(`SELECT username , password , name , last_name , email_address , mobile_phone_number
         FROM website_users
         where website_id = ?` , [website_id]
        );

        return websiteUsers[0]
    } catch (error) {
        throw new Error("cannnot fetch users :" + error.message)
    }
}


export default getWebsiteUsers;