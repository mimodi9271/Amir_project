import getWebsiteId from "../queries/websiteId.js";
import getPages from "../queries/pages.js";
import getPagePosts from "../queries/pagePosts.js";


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
    page_posts = await getPagePosts(website_id)
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