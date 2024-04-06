import fs from "fs"
import 'dotenv/config';
// import WXRGen from "wxrgen"
import path from "path";
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import fetchXmlData from "../../db/commonDataFetchers/fetchXmlData.js";
import addAuthors from "./steps/addAuthors.js";
import addCategories from "./steps/addCategories.js";
import addTags from "./steps/addTags.js";
import addpages from "./steps/addPages.js";
import addPagePosts from "./steps/addPagePosts.js";
import Generator  from "../../wxrGenerator/wxrGenerator.js"


const wordpressBackup = async (pages , page_posts , website_id , domain , mysqlConnectionPool) => {

  let __dirname = dirname(fileURLToPath(import.meta.url));
  __dirname = __dirname.slice(0 , __dirname.length-22)
 

  const generator = new Generator({
        name: 'localhost',
        url: 'http://localhost',
        description: 'This is my local wordpress website',
        language: 'fa-IR',
  });

  let authors = "";
  let joinCategries = "";
  let categories = "";
  let joinTags = "";
  let tags = "";
  let postFiles = "";
  try {
    const result = await fetchXmlData(website_id , mysqlConnectionPool);
    authors = result.authors;
    joinCategries = result.joinCategries;
    categories = result.categories;
    joinTags = result.joinTags;
    tags = result.tags;
    postFiles = result.postFiles
  } catch (error) {
    throw new Error(error.message)
  }

  
  // add users to xml
  addAuthors(generator , authors)
  

  // add categories to xml
  addCategories(generator , categories)

  
  // add tags to xml
  addTags(generator , tags)


  // add pages to xml
  addpages(generator , pages)

  
  // add post to xml
  addPagePosts(generator , page_posts , joinCategries , joinTags , postFiles)


  const xmlstring = generator.stringify();


  fs.mkdir(path.join(__dirname, `${domain}`) , {} , (err) => {
    fs.mkdir(path.join(__dirname, `${domain}` , "wordpressbackup") , {} , (err) => {
      fs.writeFile(path.join(__dirname, `${domain}`, "wordpressbackup" , `نسخه ی بکاپ وردپرس.xml`), xmlstring , "utf-8" , (err , res) => {
      })
    });
  })

  


}

export default wordpressBackup;