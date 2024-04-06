import getImgSrc from 'get-img-src';


const addPagePosts = (generator , page_posts , joinCategries , joinTags , postFiles) => {
    page_posts.map((item , index) => {
        
        let categoriesitem = joinCategries.filter(i => i.post_id == item.id ).map(c => ({slug : c.slug , name : c.title}));
    
        let tagsitem = joinTags.filter(i => i.post_id == item.id ).map(c => ({slug : c.title , name : c.title}));

        let fileItems = postFiles.filter(i => i.post_id == item.id);
        let addFilesTag = "";
        fileItems.forEach(item => {
          addFilesTag = `${addFilesTag} <br> <a href=${item.url}>${item.title}</a>`
        })
    
        let htmlme = item.content_html.concat(item.more_html);
        htmlme = item.content_html.concat(addFilesTag);

    

       
        let imgsercs = getImgSrc(htmlme);
        imgsercs = imgsercs.map(c => ({url : c , id : generator.rId()}));
        imgsercs = imgsercs.filter(c => c.url !== item.picture);
        
    
        let  thumbnaiId = generator.rId();
        if(item.picture){
          generator.addAttachment({
            id : thumbnaiId,
            url : item.picture,
            title : item.title,
            attachment_type : "product_image"
          })
        }
        
        
    
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
      })}
 
export default addPagePosts;