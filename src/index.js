const { GraphQLServer } = require('graphql-yoga')

let links = [{
  id: 'link-0',
  url: 'www.howtographql.com',
  description: 'Fullstack tutorial for graphql',
}]

// let idCount = links.length

const resolvers = {
  Query: {
    info:() => 'This is the api for Hackernews clone',
    feed: () => links,
  },
  Mutation: {
    
    post: (parent, {description, url}) => {
      const link = {
        id: `link-${links.length}`,
        description: description,
        url: url
      }
      links.push(link)
      return link
    },

    updateLink: (parent,{id, url, description}) => {
      const fileteredLinks = links.filter((value, index) => {
        if(value.id === id) {
          links[index] = {
            id,
            description,
            url
          }
          return true
        } else {
          return false
        }
      })
      if(fileteredLinks.length > 0) {
        return {
            id,
            description,
            url
          }
      } else {
        return null
      }
    },

    deleteLink: (parent,{id}) => {
      const fileteredLinks = links.filter((value, index) => {
        if(value.id === id) {
          delete links[index]
          return true
        } else {
          return false
        }
      })
      if(fileteredLinks.length > 0) {
        return fileteredLinks[0]
      } else {
        return null
      }
    }
  }
}

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
})

server.start(() => console.log(`Server is running on http://localhost:4000`))