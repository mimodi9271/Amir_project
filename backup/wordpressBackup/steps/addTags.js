const addTags = (generator , tags) => {
    tags.map(item => {
        generator.addTag({
            id: item.id,
            name : item.title,
            slug : item.title,
            description : item?.description || ""
        })
      })
}
 
export default addTags;