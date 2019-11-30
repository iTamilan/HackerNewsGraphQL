const {
  ApolloServer,
  gql
} = require('apollo-server')

const typeDefs = require('./typedefs')

const {
  prisma
} = require('./generated/prisma-client')

const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const User = require('./resolvers/User')
const Link = require('./resolvers/Link')
const Subscription = require('./resolvers/Subscription')
const Vote = require('./resolvers/Vote')

const resolvers = {
  Query,
  Mutation,
  User,
  Link,
  Subscription,
  Vote,
}

// 3

// const schema = makeExecutableSchema({
//   typeDefs,
//   resolvers
// })

const server = new ApolloServer({
  typeDefs,
  resolvers,
  // schema: schema,
  context: ({
    req
  }) => ({
    ...req,
    prisma
  }),
  // playground: '/playground',
  // debug: process.env.NODE_ENV === 'development'
})

server.listen(3000)
  .then(({
    url,
    server
  }) => {
    console.log(`Server is running on ${url}`)
  })