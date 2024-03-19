

const getUsers = async(website_id , mysqlConnectionPool) => {
    try {
        const users = await mysqlConnectionPool.query(`
        SELECT users.name , users.last_name , users.id , users.username , users.email_address , website_staff.website_id
        FROM users
        INNER JOIN website_staff
        ON  users.id = website_staff.user_id
        AND website_staff.website_id = ?` , [website_id]) ;

        return users[0]
    } catch (error) {
        throw new Error("cannot fetch usres")
    }
}


export default getUsers;