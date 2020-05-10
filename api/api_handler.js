/* eslint linebreak-style: ["error", "windows"] */
/* global console */
/* eslint no-restricted-globals: "off" */

const fs = require('fs');
require('dotenv').config();
const { ApolloServer } = require('apollo-server-express');
const prods = require('./products.js');


const resolvers = {
  Query: {
    prodList: prods.list,
    prodFind: prods.get,
    prodCount: prods.counts,
  },
  Mutation: {
    addProd: prods.add,
    updateProd: prods.update,
    delProd: prods.del,
  },
};

const server = new ApolloServer({
  typeDefs: fs.readFileSync('schema.graphql', 'utf-8'),
  resolvers,
});

function installHandler(app) {
  const enableCors = (process.env.ENABLE_CORS || 'true') === 'true';
  console.log('CORS setting:', enableCors);
  server.applyMiddleware({ app, path: '/graphql', cors: enableCors });
}
module.exports = { installHandler };
