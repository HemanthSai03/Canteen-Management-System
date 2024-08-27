const { buildSchema } = require('graphql');

const schema = buildSchema(`
  type User {
    id: ID!
    username: String!
    email: String!
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
  }

  type RootQuery {
    login(email: String!, password: String!): AuthData
  }

  type RootMutation {
    createUser(userInput: UserInput): User
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`);

module.exports = schema;
