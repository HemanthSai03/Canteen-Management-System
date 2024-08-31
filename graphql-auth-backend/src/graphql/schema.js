const { buildSchema } = require('graphql');

const schema = buildSchema(`
  type User {
    id: ID!
    username: String!
    email: String!
    role: String!
  }

  type AuthData {
    userId: ID!
    token: String!
    tokenExpiration: Int!
    role: String!
  }

  input UserInput {
    username: String!
    email: String!
    password: String!
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
    # User queries
    users: [User]
    # Menu item queries
    menuItems: [MenuItem]
    menuItem(id: ID!): MenuItem
  }

  type Mutation {
    # User mutations
    createUser(userInput: UserInput!): User
    updateUser(id: ID!, userInput: UserInput!): User
    login(email: String!, password: String!): AuthData

    # Menu item mutations
    addMenuItem(menuItemInput: MenuItemInput!): MenuItem
    updateMenuItem(id: ID!, menuItemInput: MenuItemInput!): MenuItem
    deleteMenuItem(id: ID!): Boolean
  }

  schema {
    query: Query
    mutation: Mutation
  }
`);

module.exports = schema;
