const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        id: ID!
        username: String!
        email: String!
        events: [Event!]!
    }

    
`;

module.exports = typeDefs;