import createpageURl from "./pagesUrl.js";
import createpagepostURl from "./pagePostsUrl.js";

const allPageCreator = async(pages , page_posts , domain) => {
    const AllPagesList = [];

    pages.map(item => {
        let urlInfo = createpageURl(domain , item.id , item.slug , item.title) ;
        AllPagesList.push(urlInfo)
    })


    page_posts.map(item => {
        let list = [...AllPagesList]
        let selected = list.filter(c => c.id == item.page_id);
        let urlInfo = createpagepostURl(domain , item.id , item.slug , item.title , item.page_id , item.last_modified , selected[0].title) ;
        AllPagesList.push(urlInfo)
    })

    return AllPagesList;
}

export default allPageCreator;