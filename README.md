# Canteen Management System (Capstone Project)
## Table of Contents
- [Introduction](#Introduction)
- [Project Overview](#Project_Overview)
- [System Architecture](#System_Architecture)
- [Technology Stack](#Technology_Stack)
- [Features](##Features)
- [Setup and Installation](#Setup_and_Installation)
- [Project Structure](Project_Structure)
- [GraphQL Schema](#GraphQL_Schema)
- [Project Dependencies](#ProjectProject_Dependencies)
- [Testing and Quality Assurance](#Testing_and_Quality_Assurance)
- [Deployment](#Deployment)


## Introduction
The Canteen Management System (CMS) is a comprehensive solution designed to manage menu items, user orders, and administrative tasks within a college canteen environment. This project demonstrates the use of modern web development technologies to create a responsive and efficient management system.

## Project Overview
The Canteen Management System (CMS) provides the following primary features:

User Authentication: Secure registration and login functionality.
Task Management: Create, update, delete, and categorize tasks related to canteen operations.
User Interface: A responsive and user-friendly interface for both web and mobile platforms.
Role-Based Access Control: Different views and functionalities for admins and regular users.


## System Architecture
The CMS is built with a separation of concerns in mind, utilizing a microservice-like architecture with distinct backend and frontend components.

Backend:
Technologies: Node.js, Express.js, MongoDB, GraphQL
Description: The backend handles user authentication, task management, and provides RESTful and GraphQL APIs for managing data.
Web Frontend:
Technologies: React, Redux, CSS, GraphQL
Description: The frontend is a single-page application built with React, styled with CSS, and integrated with GraphQL to handle data operations.

## Technology Stack
Frontend (Web)
React
Redux
CSS
GraphQL
Backend
Node.js
Express.js
MongoDB
GraphQL
Testing
PlayWright
Deployment


## Features
User Authentication: Secure login/signup using JWT.
Task Management: CRUD operations for managing tasks.
Responsive Design: Optimized for both desktop and mobile devices.
Role-Based Access: Different functionalities for admins and users.

## Demo

![Screenshot (68)](https://github.com/user-attachments/assets/b141f995-0e7b-4797-baba-75e16cbc917f)

![Screenshot (69)](https://github.com/user-attachments/assets/a8f1d83b-b8a2-4443-a100-326cc44175f9)

![Screenshot (70)](https://github.com/user-attachments/assets/e9617246-408e-4581-9871-335201921ad6)

![Screenshot (71)](https://github.com/user-attachments/assets/e73f8548-541e-4f6e-8266-650c6a7235f4)





## Setup and Installation
To run this application locally, follow these steps:

### Backend Setup
Clone the repository:
```bash
git clone[ https://github.com/hemanthsai0119/Canteen-Management-System.git]
```

2. Navigate to the backend directory:
```bash
Copy code
cd canteen-management-system/backend
```

Install the dependencies:
```bash
Copy code
npm install
```
Set up environment variables:
Create a .env file in the root of the backend directory and add your environment variables as shown in the .env.example.
Start the backend server:
```bash
Copy code
node src/index.js
```

Frontend Setup
Navigate to the frontend directory:
```bash
Copy code
cd ../frontend
```
Install the dependencies:
```bash
Copy code
npm install
```
Start the frontend server:
```bash
Copy code
npm start
```
Open your browser and navigate to: http://localhost:3000
## Project Structure
The project follows a modular structure to ensure scalability and maintainability. Key directories include:

/backend: Contains the Node.js backend code.
/frontend: Contains the React frontend code.


## GraphQL Schema
The GraphQL schema defines the structure of the API and is implemented using Apollo Server. Below is a brief overview of the schema:

```bash
graphql
Copy code
/* This code snippet is defining GraphQL type definitions using the Apollo Server library in a Node.js
environment. */
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

```

## Project Dependencies
1.Backend
@apollo/client: Apollo Client for managing GraphQL queries and mutations.
apollo-server: Apollo Server for setting up a GraphQL server.
bcryptjs: Library for hashing passwords.
dotenv: Module for loading environment variables.
graphql: GraphQL schema and query language.
jsonwebtoken: Library for handling JSON Web Tokens.
mongoose: MongoDB object modeling tool.


2.Frontend
@apollo/client: Apollo Client for managing GraphQL queries and mutations.
react-redux and @reduxjs/toolkit: Libraries for managing global state in React.
react-router-dom: Library for handling routing in React applications.
jest: Testing library for JavaScript.
Testing and Quality Assurance
The project includes comprehensive unit, integration, and end-to-end tests to ensure quality.

## Running Tests
Navigate to the backend or frontend directory.
Run the tests using Jest or Mocha:
```
bash
Copy code
npm test
```
Tools Used
Jest: For unit testing.
Mocha and Chai: For backend testing.
Karma: For end-to-end testing.
## Deployment
Deploying to Heroku or AWS
Create accounts on Heroku or AWS.
Connect your GitHub repository for deployment.
Set up the environment variables as needed.
