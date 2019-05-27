const { GraphQLServer } = require('graphql-yoga')
const { prisma } = require('./generated/prisma-client')

// let idCount = links.length

const resolvers = {
  Query: {
    info:() => 'This is the api for Hackernews clone',
    feed: (root, args, context, info) => {
      return context.prisma.links()
    },
  },
  Mutation: {

    post: (root, args, context) => {
      return context.prisma.createLink({
        url: args.url,
        description: args.description,
      })
    },

    // updateLink: (parent,{id, url, description}) => {
    //   const fileteredLinks = links.filter((value, index) => {
    //     if(value.id === id) {
    //       links[index] = {
    //         id,
    //         description,
    //         url
    //       }
    //       return true
    //     } else {
    //       return false
    //     }
    //   })
    //   if(fileteredLinks.length > 0) {
    //     return {
    //         id,
    //         description,
    //         url
    //       }
    //   } else {
    //     return null
    //   }
    // },

    // deleteLink: (parent,{id}) => {
    //   const fileteredLinks = links.filter((value, index) => {
    //     if(value.id === id) {
    //       delete links[index]
    //       return true
    //     } else {
    //       return false
    //     }
    //   })
    //   if(fileteredLinks.length > 0) {
    //     return fileteredLinks[0]
    //   } else {
    //     return null
    //   }
    // }
  }
}

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    context: { prisma },
})

server.start(() => console.log(`Server is running on http://localhost:4000`))