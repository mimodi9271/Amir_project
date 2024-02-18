import get_WebId_Fun from "./websiteId.js";
import get_pages from "./pages.js";
import get_pagepost from "./pagePosts.js";


const fetchCommonData = async (domain) => {
     
  // get websiteId
  let website_id = "";
  try {
    website_id = await get_WebId_Fun(domain)
  } catch (error) {
    throw new Error(error.message)
  }
  

  // get data drom pages table
  let pages = ""
  try {
    pages = await get_pages(website_id);
  } catch (error) {
    throw new Error(error.message)
  }
  

  // get data from pages_posts table
  let page_posts = ""
  try {
    page_posts = await get_pagepost(website_id)
  } catch (error) {
    throw new Error(error.message)
  }

  return {
    pages : pages ,
    page_posts : page_posts,
    website_id : website_id,
  }
  
}

export default fetchCommonData;