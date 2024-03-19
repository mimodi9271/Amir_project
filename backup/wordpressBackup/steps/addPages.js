import getImgSrc from 'get-img-src';


const addpages = (generator , pages) => {
    let filterpage = pages.filter(item => item.html !== null);  
    filterpage.map((item , index) => {
  
        let slug = `http://localhost/rahatamooz2/?page_id=${item.id}`;
        let imgsercspage = getImgSrc(item.html);
  
        imgsercspage.map(url => {
          generator.addAttachment({
            url : url,
            title : item.title,
            attachment_type : "product_image"
          })
        })
  
  
        generator.addPage({
            url: ``,
            title: item.title,
            author: `wordpress`,
            content: item.html,
            slug: slug,
            summary: item.description,
        })
    })}
 
export default addpages;