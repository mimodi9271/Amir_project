import fs from "fs"
import 'dotenv/config';
import WXRGen from "wxrgen"
import getImgSrc from 'get-img-src';
import get_WebId_Fun from "../Queries/websiteId.js";
import get_users from "../Queries/users.js";
import get_categories from "../Queries/categories.js";
import get_tags from "../Queries/tags.js";
import get_pages from "../Queries/pages.js";
import get_pagepost from "../Queries/pagePosts.js";
import path from "path";
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import fetchXmlData from "../Queries/fetchXmlData.js";

const xmlCreator = async (pages , page_posts , website_id , domain) => {

  let __dirname = dirname(fileURLToPath(import.meta.url));
  __dirname = __dirname.slice(0 , __dirname.length-4)

  const generator = new WXRGen({
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
    const result = await fetchXmlData(website_id);
    users = result.users;
    joinCategries = result.joinCategries;
    categories = result.categories;
    joinTags = result.joinTags;
    tags = result.tags;
  } catch (error) {
    throw new Error(error.message)
  }

  
  // add users to xml
  users.map(item => {
    generator.addUser({
      id : generator.rId(),
      username : item.username,
      email : item.email_address,
      first_name : item.name,
      last_name : item.last_name,
      display_name : `${item.username}`
    })
  })
  

  // add categories to xml
  categories.map(item => {
    generator.addCategory({
        id : item.id,
        name : item.title,
        slug : item.slug,
        parent_id : item.parent_id,
        description : item?.description || ""
    })
  })

  
  // add tags to xml
  tags.map(item => {
    generator.addTag({
        id: item.id,
        name : item.title,
        slug : item.title,
        description : item?.description || ""
    })
  })


  // add pages to xml
  let filterpage = pages.filter(item => item.html !== null);  
  filterpage.map((item , index) => {

      let slug = `http://localhost/rahatamooz2/?page_id=${item.id}`;
      let imgsercspage = getImgSrc(item.html);
      // console.log(imgsercs);

      imgsercspage.map(url => {
        generator.addAttachment({
          id : generator.rId(),
          url : url,
          title : item.title,
          attachment_type : "product_image"
        })
      })


      generator.addPage({
          id : generator.rId(),
          url: ``,
          title: item.title,
          author: `wordpress`,
          content: item.html,
          slug: slug,
          summary: item.description,
      })
  })

  
  // add post to xml
  page_posts.map((item , index) => {
    let categoriesitem = joinCategries.filter(i => i.post_id == item.id ).map(c => ({slug : c.slug , name : c.title}));
    // console.log(categoriesitem);

    let tagsitem = joinTags.filter(i => i.post_id == item.id ).map(c => ({slug : c.title , name : c.title}));
    // console.log(tagsitem);

    let htmlme = item.content_html.concat(item.more_html);

    let imgsercs = getImgSrc(htmlme);
    imgsercs = imgsercs.map(c => ({url : c , id : generator.rId()}));
    imgsercs = imgsercs.filter(c => c.url !== item.picture);
    // console.log(imgsercs)
    

    let  thumbnaiId = generator.rId();
    generator.addAttachment({
        id : thumbnaiId,
        url : item.picture,
        title : item.title,
        attachment_type : "product_image"
    })
    

    imgsercs.map( i =>{
      generator.addAttachment({
        id : i.id,
        url : i.url,
        title : item.title,
        attachment_type : "product_image"
      })
    })

    let slug = `http://localhost/rahatamooz2/?p=${item.id}`


    generator.addPost({
        id : generator.rId(),
        url : ``,
        title: item.title,
        author: `wordpress`,
        content: htmlme,
        slug: slug,
        summary: item.excerpt,
        date : item.last_modified,
        categories : categoriesitem,
        tags : tagsitem,
        imageID : thumbnaiId
    });
  })


  const xmlstring = generator.stringify();


  fs.mkdir(path.join(__dirname, `${domain}`) , {} , (err) => {
    if (err) console.log(err)
    fs.writeFile(path.join(__dirname, `${domain}`, `myxml.xml`), xmlstring , "utf-8" , (err , res) => {
      console.log(err , "..........");
    })
  });


}

export default xmlCreator;