function getPageURl(domain , id , slug , title){ 
    return {
      id : id,
      webUrl : `https://www.${domain}/${id}-${slug}`,
      filename : title, 
      title : title,
      directory : `./${domain}/${title}/index`
    }
  }

  export default getPageURl;