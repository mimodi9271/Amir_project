import express from "express"
const router = express.Router()
import 'dotenv/config';
import validateDomain from "../utilities/validateDomain.js";
import checkBusyStatus from "../redis/checkBusyStatus.js";
import wordpressBackup from "../backup/wordpressBackup.js";
import fetchCommonData from "../db/commonDataFetchers/fetchCommonData.js"
import htmlBackup from "../backup/htmlBackup.js";

export const initializeRouter = (redisConnection) => {

  router.get("/" ,  async (req , res) => {
    let { domain , email } = req.query;
    
    let validationRes = validateDomain(domain);
  
    if(validationRes.error){
      res.status(401).send("invalid url")
    }
    
  
    try {
      await checkBusyStatus(redisConnection);
      res.status(400).send("you have inserted in queue and the result will email you");
    } catch (error) {
      res.status(401).send(error.message)
      return;
    }
  
  
  
    let pages = "";
    let page_posts = "";
    let website_id = ""
    try {
      const result = await fetchCommonData(domain);
      pages = result.pages;
      page_posts = result.page_posts;
      website_id = result.website_id;
    } catch (error) {
      res.status(401).send(error.message)
      return;
    }
  
    
  
    try {
      await wordpressBackup(pages , page_posts , website_id , domain)
    } catch (error) {
      res.status(401).send(error.message)
      return;
    }
    
  
    try {
      await htmlBackup(pages , page_posts , redisConnection , domain , email);
    } catch (error) {
      res.status(401).send(error.message)
      return;
    }
  
      
  })

}


export default router;





