const { ApolloServer } = require('apollo-server');
require('dotenv').config();
const typeDefs = require('./src/schema');
const resolvers = require('./src/resolvers');

//API's
const CategoryAPI = require('./src/datasources/category-api');

console.log(`${process.env.REST_API_BASEURL}/category`);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => {
    return {
      categoryAPI: new CategoryAPI(),
    };
  },
});

server.listen().then(() => {
  console.log(`
    🚀  Server is running!
    🔉  Listening on port 4000
    📭  Query at https://studio.apollographql.com/dev
  `);
});
