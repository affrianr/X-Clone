const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const userTypeDefs = require('./schema/userSchema')
const userResolvers = require('./resolvers/userResolver')
const postTypeDefs = require('./schema/postSchema')
const postResolvers = require('./resolvers/postResolver')
const followTypeDefs = require('./schema/followSchema')
const followResolvers = require('./resolvers/followResolvers')
const {connect} = require('./config/mongodb')
const authentication = require('./middlewares/authentication')

const server = new ApolloServer({
  typeDefs: [userTypeDefs, postTypeDefs, followTypeDefs],
  resolvers: [userResolvers, postResolvers, followResolvers],
  introspection: true,
})

// async function startServer() {
//   try {
//     const { url } = await startStandaloneServer(server, {
//       context: async ({ req }) => ({ token: req.headers.token }),
//       listen: { port: process.env.PORT || 3000 },
//     });
//     console.log(`🚀  Server ready at ${url}`);
//   } catch (error) {
//     console.log(error)
//   }
// }
// startServer()
connect().then(() => {
  console.log('connect database');
  return startStandaloneServer(server, {
    context: async({ req, res }) => {
      return {
        authentication: async () => await authentication(req)
      }
    },
    listen: { port: process.env.PORT || 3000 },
  })
}).then(({url}) => {
  console.log(`🚀🚀 Server read at: ${url}`)
}).catch(err => console.log(err))