const { GraphQLServer } = require('graphql-yoga')

const typeDefs = `


`
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
    }
  }
}

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
})

server.start(() => console.log(`Server is running on http://localhost:4000`))