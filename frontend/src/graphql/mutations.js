import { gql } from '@apollo/client';

// Define the LOGIN_MUTATION GraphQL mutation
export const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      role
    }
  }
`;

// Other mutations can be added here as needed
export const CREATE_USER = gql`
  mutation CreateUser($userInput: UserInput!) {
    createUser(userInput: $userInput) {
      id
      username
      email
      role
    }
  }
`;
