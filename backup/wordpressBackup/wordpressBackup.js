import fs from "fs"
import 'dotenv/config';
// import WXRGen from "wxrgen"
import path from "path";
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import fetchXmlData from "../../db/commonDataFetchers/fetchXmlData.js";
import addUsers from "./steps/addUsers.js";
import addCategories from "./steps/addCategories.js";
import addTags from "./steps/addTags.js";
import addpages from "./steps/addPages.js";
import addPagePosts from "./steps/addPagePosts.js";
import Generator  from "../../wxrGenerator/wxrGenerator.js"

const wordpressBackup = async (pages , page_posts , website_id , domain , pool) => {

  let __dirname = dirname(fileURLToPath(import.meta.url));
  __dirname = __dirname.slice(0 , __dirname.length-22)

  const generator = new Generator({
        name: 'localhost',
        url: 'http://localhost',
        description: 'This is my local wordpress website',
        language: 'fa-IR',
  });

  let users = "";
  let joinCategries = "";
  let categories = "";
  let joinTags = "";
  let tags = "";
  try {
    const result = await fetchXmlData(website_id , pool);
    users = result.users;
    joinCategries = result.joinCategries;
    categories = result.categories;
    joinTags = result.joinTags;
    tags = result.tags;
  } catch (error) {
    throw new Error(error.message)
  }

  
  // add users to xml
  addUsers(generator , users)
  

  // add categories to xml
  addCategories(generator , categories)
  console.log(categories.length)

  
  // add tags to xml
  addTags(generator , tags)


  // add pages to xml
  addpages(generator , pages)

  
  // add post to xml
  addPagePosts(generator , page_posts , joinCategries , joinTags)


  const xmlstring = generator.stringify();


  fs.mkdir(path.join(__dirname, `${domain}`) , {} , (err) => {
    if (err) console.log(err)
    fs.writeFile(path.join(__dirname, `${domain}`, `myxml.xml`), xmlstring , "utf-8" , (err , res) => {
      if (err) console.log(err , "..........");
    })
  });


}

export default wordpressBackup;