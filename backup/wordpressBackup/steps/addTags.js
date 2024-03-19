const addTags = (generator , tags) => {
    tags.map(item => {
        generator.addTag({
            name : item.title,
            slug : item.title,
        })
      })
}
 
export default addTags;