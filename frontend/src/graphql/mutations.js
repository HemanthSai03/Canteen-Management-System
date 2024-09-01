/* This JavaScript code is defining GraphQL mutation operations using the `gql` function from the
`@apollo/client` library. Each mutation operation is defined as a constant variable with a specific
GraphQL query structure. */
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


export const ADD_MENU_ITEM = gql`
  mutation AddMenuItem($menuItemInput: MenuItemInput!) {
    addMenuItem(menuItemInput: $menuItemInput) {
      id
      name
      description
      price
      category
      imageUrl
    }
  }
`;

export const UPDATE_MENU_ITEM = gql`
  mutation UpdateMenuItem($id: ID!, $menuItemInput: MenuItemInput!) {
    updateMenuItem(id: $id, menuItemInput: $menuItemInput) {
      id
      name
      description
      price
      category
      imageUrl
    }
  }
`;

export const DELETE_MENU_ITEM = gql`
  mutation DeleteMenuItem($id: ID!) {
    deleteMenuItem(id: $id)
  }
`;
