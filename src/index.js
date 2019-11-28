const {
  ApolloServer,
  makeExecutableSchema
} = require('apollo-server')
const {
  importSchema
} = require('graphql-import')
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
const typeDefs = importSchema('src/schema.graphql')

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

const server = new ApolloServer({
  schema: schema,
  context: ({
    req
  }) => ({
    ...req,
    prisma
  }),
  playground: '/playground',
  // debug: process.env.NODE_ENV === 'development'
})

server.listen(8080, '35.200.150.210')
  .then(({
    url,
    server
  }) => {
    console.log(`Server is running on ${url}`)
  })