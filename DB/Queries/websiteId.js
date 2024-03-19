
const getWebsiteId = async (domain , mysqlConnectionPool) =>{
    try {
        const result =  await mysqlConnectionPool.query(`SELECT * FROM domains where domain = ?` , [domain]);
        const website_id = result[0][0].website_id;
        return website_id;
    } catch (error) {
        throw new Error("cannot fetch websiteId")
    }
    
}

export default getWebsiteId;