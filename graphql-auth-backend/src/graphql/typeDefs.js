const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    role: String!
  }

  input UserInput {
    username: String!
    email: String!
    password: String!
    role: String
  }

  type AuthData {
    userId: ID!
    token: String!
    tokenExpiration: Int!
  }

  type Query {
    users: [User]
    login(email: String!, password: String!): AuthData
  }

  type Mutation {
    createUser(userInput: UserInput!): User
    updateUser(id: ID!, userInput: UserInput!): User
  }
`;

module.exports = typeDefs;
