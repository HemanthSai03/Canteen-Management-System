const { gql } = require('apollo-server-express');

const typeDefs = gql`
  # The User type represents a user in your application
  type User {
    id: ID!
    username: String!
    email: String!
    role: String!
  }

  # The UserInput type is used for creating and updating users
  input UserInput {
    username: String!
    email: String!
    password: String!
    role: String
  }

  # The AuthData type represents the authentication data returned after login
  type AuthData {
    userId: ID!
    token: String!
    tokenExpiration: Int!
    role: String!
  }

  # The Query type contains the read-only operations
  type Query {
    # Returns a list of users
    users: [User]
    # Authenticates a user and returns the AuthData
    
  }

  # The Mutation type contains the write operations
  type Mutation {
    # Creates a new user
    createUser(userInput: UserInput!): User
    # Updates an existing user by ID
    updateUser(id: ID!, userInput: UserInput!): User
    login(email: String!, password: String!): AuthData
  }
`;

module.exports = typeDefs;
