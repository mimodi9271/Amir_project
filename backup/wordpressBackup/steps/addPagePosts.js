import getImgSrc from 'get-img-src';


const addPagePosts = (generator , page_posts , joinCategries , joinTags) => {
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
      })}
 
export default addPagePosts;