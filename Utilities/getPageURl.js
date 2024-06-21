function getPageURl(domain , id , slug , title){ 
    let newTitle = title.replace(/[|&;$%@"<>()+,]/g, "");

    return {
      id : id,
      webUrl : `https://www.${domain}/${id}-${slug}`,
      filename : title, 
      title : title,
      directory : `./${domain}/htmlbckup/${newTitle}/index`
    }
  }

  export default getPageURl;