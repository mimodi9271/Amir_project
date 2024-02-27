import express from "express"
const router = express.Router()
import 'dotenv/config';
import validateDomain from "../Utilities/validateDomain.js";
import checkBusyStatus from "../Redis/checkBusyStatus.js";
import wordpressBackup from "../WordPress/wordpressBackup.js";
import fetchCommonData from "../DB/FetchDataFunction/fetchCommonData.js"
import initializeBullMq from "../Bull/bullMQ.js";



router.get("/" ,  async (req , res) => {
  let { domain , email } = req.query;
  // console.log(domain)
  // console.log(email)
  let validationRes = validateDomain(domain);

  if(validationRes.error){
    res.status(401).send("invalid url")
  }


  let redisConnection = "";
  try {
    redisConnection = await checkBusyStatus();
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
    // console.log(result)
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
    await initializeBullMq(pages , page_posts , redisConnection , domain , email);
  } catch (error) {
    res.status(401).send(error.message)
    return;
  }

    
})


export default router;





