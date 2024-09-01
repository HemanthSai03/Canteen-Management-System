/* This code snippet is defining a Mongoose schema for a user in a restaurant application. It includes
fields for username, email, password, and role. Additionally, it includes pre-save middleware to
hash the user's password before saving it to the database using bcrypt. There is also a method
defined to compare passwords during authentication. Finally, the schema is exported as a Mongoose
model named 'User'. */
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const connectDB = require('./config/db');
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

// Connect to MongoDB
connectDB();

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const startServer = async () => {
  await server.start();
  server.applyMiddleware({ app });

  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}${server.graphqlPath}`);
  });
};

startServer();
