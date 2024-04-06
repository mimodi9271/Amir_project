import getAuthors from "../queries/authors.js";
import getCategories from "../queries/categories.js";
import getPostsFiles from "../queries/files.js";
import getTags from "../queries/tags.js";


const fetchXmlData = async (website_id , mysqlConnectionPool) => {

  let authors = "";
  try {
    authors = await getAuthors(website_id , mysqlConnectionPool)
  } catch (error) {
    throw new Error(error.message)
  }

  let postFiles = "";
  try {
    postFiles = await getPostsFiles(website_id , mysqlConnectionPool)
  } catch (error) {
    throw new Error(error.message)
  }


  let joinCategries = "";
  let categories = "";
  try {
    const result = await getCategories(website_id , mysqlConnectionPool);
    joinCategries = result.joinCategries;
    categories = result.categories;
  } catch (error) {
    throw new Error(error.message)
  }


  let joinTags = "";
  let tags = "";
  try {
    const result = await getTags(website_id , mysqlConnectionPool);
    joinTags = result.joinTags;
    tags = result.tags;
  } catch (error) {
    throw new Error(error.message)
  }

  return {
    authors ,
    joinCategries ,
    categories ,
    joinTags ,
    tags ,
    postFiles
  }

}

export default fetchXmlData;