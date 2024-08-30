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
    role: String!
  }

  type MenuItem {
    id: ID!
    name: String!
    description: String!
    price: Float!
    category: String!
    imageUrl: String
  }

  input MenuItemInput {
    name: String!
    description: String!
    price: Float!
    category: String!
    imageUrl: String
  }

  type Query {
    users: [User]
    menuItems: [MenuItem]
    menuItem(id: ID!): MenuItem
  }

  type Mutation {
    createUser(userInput: UserInput!): User
    updateUser(id: ID!, userInput: UserInput!): User
    login(email: String!, password: String!): AuthData
    addMenuItem(menuItemInput: MenuItemInput!): MenuItem
    updateMenuItem(id: ID!, menuItemInput: MenuItemInput!): MenuItem
    deleteMenuItem(id: ID!): Boolean
  }
`;

module.exports = typeDefs;
