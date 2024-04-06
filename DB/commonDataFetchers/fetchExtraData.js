import getComments from "../queries/comments.js";
import getUsers from "../queries/users.js";

const fetchExtraData = async (website_id , mysqlConnectionPool) => {

    let users = "";
    try {
        users = await getUsers(website_id , mysqlConnectionPool);
    } catch (error) {
        throw new Error(error.message)
    }

    let comments = "";
    try {
        comments = await getComments(website_id , mysqlConnectionPool);
    } catch (error) {
        throw new Error(error.message)
    }

    return {
        users ,
        comments
    }

}

export default fetchExtraData;