import get_users from "../queries/users.js";
import get_categories from "../queries/categories.js";
import get_tags from "../queries/tags.js";



const fetchXmlData = async (website_id) => {

  let users = "";
  try {
    users = await get_users(website_id)
  } catch (error) {
    throw new Error(error.message)
  }


  let joinCategries = "";
  let categories = "";
  try {
    const result = await get_categories(website_id);
    // console.log(result.categories)
    joinCategries = result.joinCategries;
    categories = result.categories;
  } catch (error) {
    throw new Error(error.message)
  }


  let joinTags = "";
  let tags = "";
  try {
    const result = await get_tags(website_id);
    joinTags = result.joinTags;
    tags = result.tags;
  } catch (error) {
    throw new Error(error.message)
  }

  return {
    users ,
    joinCategries ,
    categories ,
    joinTags ,
    tags ,
  }

}

export default fetchXmlData;