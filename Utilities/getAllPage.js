import getPageURl from "./getPageURl.js";
import getPagePost from "./getPagePostURl.js";
import getPagePostURl from "./getPagePostURl.js";

const getAllPage = async(pages , page_posts , domain) => {
    const AllPagesList = [];

    pages.map(item => {
        let urlInfo = getPageURl(domain , item.id , item.slug , item.title) ;
        AllPagesList.push(urlInfo)
    })


    page_posts.map(item => {
        let list = [...AllPagesList]
        let selected = list.filter(c => c.id == item.page_id);
        let urlInfo = getPagePostURl(domain , item.id , item.slug , item.title , item.page_id , item.last_modified , selected[0].title) ;
        AllPagesList.push(urlInfo)
    })

    return AllPagesList;
}

export default getAllPage;