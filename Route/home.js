import express from "express"
const router = express.Router()
import 'dotenv/config';
import validateDomain from "../func/ValidateDomain.js";
import redisController from "../redis/redisController.js";
import bullmqCreator from "../Bull/bullMQ.js";
import xmlCreator from "../xml/xmlCreator.js";
import fetchCommonData from "../Queries/fetchCommonData.js";



router.get("/" ,  async (req , res) => {
  let { domain , email } = req.query;
  let validationRes = validateDomain(domain);

  if(validationRes.error){
    res.status(401).send("invalid url")
  }


  let redisConnection = ""
  try {
    redisConnection = await redisController();
    res.status(400).send("شما در صف قرار گرفتید و نتیجه از طریق ایمیل به شما اطلاع داده خواهد شد");
  } catch (error) {
    console.log(error.message)
    res.status(500).send({
      message : error.message,
      code : 401
    })
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
    console.log(error.message)
    res.status(500).send({
      message : error.message,
      code : 401
    })
    return;
  }

  

  try {
    await xmlCreator(pages , page_posts , website_id , domain)
  } catch (error) {
    console.log(error.message)
    res.status(500).send({
      message : error.message,
      code : 401
    })
    return;
  }
  

  try {
    await bullmqCreator(pages , page_posts , redisConnection , domain , email);
  } catch (error) {
    console.log(error.message)
    res.status(500).send({
      message : error.message,
      code : 401
    })
    return;
  }

    
})


export default router;





