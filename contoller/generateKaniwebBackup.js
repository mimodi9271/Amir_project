import 'dotenv/config';
import checkBusyStatus from '../redis/checkBusyStatus.js';
import wordpressBackup from "../backup/wordpressBackup/wordpressBackup.js";
import fetchCommonData from "../db/commonDataFetchers/fetchCommonData.js"
import htmlBackup from "../backup/htmlBackup/htmlBackup.js";
import fetchExtraData from '../db/commonDataFetchers/fetchExtraData.js';
import extraDataBackup from '../backup/extraDataBackup/extraDataBackup.js';



const generateKaniwebBackup = async (dependencies , domain , email) => {
    const { redisConnection , app , mysqlConnectionPool } = dependencies;
    
  
    try {
      await checkBusyStatus(redisConnection);
    } catch (error) {
      throw new Error(error.message)
    }
  
  
  
    let pages = "";
    let page_posts = "";
    let website_id = ""
    try {
      const result = await fetchCommonData(domain , mysqlConnectionPool);
      pages = result.pages;
      page_posts = result.page_posts;
      website_id = result.website_id;
    } catch (error) {
        throw new Error(error.message)
    }

    
    let websiteUsers = "";
    let messages = "";
    try {
      let result = await fetchExtraData(website_id , mysqlConnectionPool);
      websiteUsers = result.websiteUsers;
      messages = result.messages;
    } catch (error) {
      throw new Error(error.message)
    }
  

    try {
      extraDataBackup(websiteUsers, messages, domain)
    } catch (error) {
        throw new Error(error.message)

    }
  
    try {
      await wordpressBackup(pages , page_posts , website_id , domain , mysqlConnectionPool)
    } catch (error) {
        throw new Error(error.message)

    }
    
  
    try {
      await htmlBackup(pages , page_posts , redisConnection , domain , email);
    } catch (error) {
        throw new Error(error.message)

    }
}

export default generateKaniwebBackup;