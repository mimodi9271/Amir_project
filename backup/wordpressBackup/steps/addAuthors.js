const addAuthors = (generator , users) => {
    users.map(item => {
        generator.addUser({
          username : item.username,
          email : item.email_address,
          first_name : item.name,
          last_name : item.last_name,
          display_name : `${item.username}`
        })
      })
}

export default addAuthors;