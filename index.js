const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ApolloProvider } from '@apollo/client';
import client from './apolloClient';

const app = express();
const port = process.env.PORT || 4000;

async function startServer(typeDefs, resolvers) {
    const apolloServer = new ApolloServer({ typeDefs, resolvers });
    await apolloServer.start();

    apolloServer.applyMiddleware({ app, path: '/graphql'});

    app.listen(port, () =>
        console.log(`Server ready at http://localhost:${port}${apolloServer.graphqlPath}`)
    );
}

startServer(typeDefs, resolvers);

ReactDOM.render(
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>,
    document.getElementById('root')
  );

