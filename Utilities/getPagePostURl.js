import { format } from 'date-fns-jalali'

function getPagePostURl(domain , id , slug , title , pageId , date , topic){
    let d = format(date, 'yyyy-MM-dd');

    return {
      id : id,
      webUrl : `https://www.${domain}/posts/${id}-${slug}`,
      filename : title,
      pageId : pageId , 
      title : title ,
      directory : `./${domain}/htmlbckup/${topic}/${d.slice(0 , 4)}/${d.slice(5 , 7)}/${id}`
    }
  }

export  default getPagePostURl;