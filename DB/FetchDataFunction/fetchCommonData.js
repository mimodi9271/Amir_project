import getWebsiteId from "../Queries/websiteId.js";
import getPages from "../Queries/pages.js";
import getPagePost from "../Queries/pagePosts.js";


const fetchCommonData = async (domain) => {
     
  // get websiteId
  let website_id = "";
  try {
    website_id = await getWebsiteId(domain)
    console.log(website_id)
  } catch (error) {
    throw new Error(error.message)
  }
  

  // get data drom pages table
  let pages = ""
  try {
    pages = await getPages(website_id);
  } catch (error) {
    throw new Error(error.message)
  }
  

  // get data from pages_posts table
  let page_posts = ""
  try {
    page_posts = await getPagePost(website_id)
  } catch (error) {
    throw new Error(error.message)
  }

  return {
    pages ,
    page_posts ,
    website_id ,
  }
  
}

export default fetchCommonData;