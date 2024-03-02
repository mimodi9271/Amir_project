const addCategories = (generator , categories) => {
    categories.map(item => {
        generator.addCategory({
            name : item.title,
            slug : item.slug,
        })
      })
}

export default addCategories;