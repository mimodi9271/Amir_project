import getPageURl from "./getPageURl.js";
import getPagePostURl from "./getPagePostURl.js";

const getWebsitePagesURL = async(pages , page_posts , domain) => {
    const allPagesList = [];

    pages.map(item => {
        let urlInfo = getPageURl(domain , item.id , item.slug , item.title) ;
        allPagesList.push(urlInfo)
    })


    page_posts.map(item => {
        let list = [...allPagesList]
        let selected = list.filter(c => c.id == item.page_id);
        let urlInfo = getPagePostURl(domain , item.id , item.slug , item.title , item.page_id , item.last_modified , selected[0]?.title) ;
        allPagesList.push(urlInfo)
    })

    return allPagesList;
}

export default getWebsitePagesURL;