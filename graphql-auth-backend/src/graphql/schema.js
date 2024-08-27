// schema.js
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
  }

  input UserInput {
    username: String!
    email: String!
    password: String!
    role: String!
  }

  type RootQuery {
    # This is where you define your queries, not mutations
  }

  type RootMutation {
    createUser(userInput: UserInput): User
    updateUser(id: ID!, userInput: UserInput): User
    login(email: String!, password: String!): AuthData  # Added login to mutations
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`);

module.exports = schema;
