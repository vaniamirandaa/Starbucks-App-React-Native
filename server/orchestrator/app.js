const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require('@apollo/server/standalone');


const { typeDefs: itemTypeDefs, resolvers: itemResolvers } = require('./schemas/itemSchema');
const { typeDefs: userTypeDefs, resolvers: userResolvers } = require('./schemas/userSchema');

const server = new ApolloServer({
  typeDefs: [ itemTypeDefs, userTypeDefs ],
  resolvers: [ itemResolvers, userResolvers],
  introspection: true
});

startStandaloneServer(server, {
    listen: { port: process.env.PORT || 4000 }
}).then (({ url }) =>{
    console.log(`🚀  Server ready at: ${url}`);
})