import getMessages from "../queries/messages.js";
import getWebsiteUsers from "../queries/users.js";

const fetchExtraData = async (website_id , mysqlConnectionPool) => {

    let websiteUsers = "";
    try {
        websiteUsers = await getWebsiteUsers(website_id , mysqlConnectionPool);
    } catch (error) {
        throw new Error(error.message)
    }

    let messages = "";
    try {
        messages = await getMessages(website_id , mysqlConnectionPool);
    } catch (error) {
        throw new Error(error.message)
    }

    return {
        websiteUsers ,
        messages
    }

}

export default fetchExtraData;