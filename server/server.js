const { ApolloServer } = require('apollo-server-express');
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core');
const http = require('http');
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();
const typeDefs = require('./graphQL/schema');
const { readdirSync } = require('fs');

const PORT = process.env.PORT || 8000;

async function startApolloServer(typeDefs) {
  const app = express();
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    typeDefs,
    mocks: true,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  //db
  mongoose
    .connect(process.env.MONGO_CONNECTION_URI)
    .then(() => console.log('db connected 😁'))
    .catch(error => console.log('error connecting db 😐', error));

  await server.start();

  //applying middlewares
  app.use(morgan('dev'));
  app.use(bodyParser.json({ limit: '2mb' }));
  app.use(cors());
  app.use(helmet());

  //routes
  readdirSync('./routes').map(r => app.use('/api', require(`./routes/${r}`)));

  server.applyMiddleware({ app });

  await new Promise(resolve => httpServer.listen({ port: PORT }, resolve));
  console.log(`🚀 Server ready at http://localhost:${PORT}`);
  console.log(
    `📭 GraphQL endpoint at  http://localhost:${PORT}${server.graphqlPath}`
  );
}

startApolloServer(typeDefs);
