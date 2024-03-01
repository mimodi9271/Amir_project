const addCategories = (generator , categories) => {
    categories.map(item => {
        generator.addCategory({
            id : item.id,
            name : item.title,
            slug : item.slug,
            parent_id : item.parent_id,
            description : item?.description || ""
        })
      })
}

export default addCategories;