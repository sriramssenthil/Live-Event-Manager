const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        id: ID!
        username: String!
        email: String!
        events: [Event!]!
    }

    type Event {
        id: ID!
        title: String!
        description: String!
        date: String!
        createdBy: User!
    }

    type Query {
        users: [User!]!
        events: [Event!]!
        event(id: ID!): Event
    }

    type Mutation {
        createUser(username: String!, email: String!): User!
        createEvent(title: String!, description: String!, date: String!, userId: ID!): Event!
    }
`;

module.exports = typeDefs;