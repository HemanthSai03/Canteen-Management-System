/* This code snippet is defining GraphQL queries and mutations using the `gql` function from the
`@apollo/client` package in JavaScript. Here's a breakdown of what each part is doing: */
import { gql } from '@apollo/client';

export const GET_MENU_ITEMS = gql`
  query GetMenuItems {
    getMenuItems {
      id
      name
      description
      price
      category
    }
  }
`;

export const ADD_MENU_ITEM = gql`
  mutation AddMenuItem($input: MenuItemInput!) {
    addMenuItem(input: $input) {
      id
      name
      description
      price
      category
    }
  }
`;

export const UPDATE_MENU_ITEM = gql`
  mutation UpdateMenuItem($id: ID!, $input: MenuItemInput!) {
    updateMenuItem(id: $id, input: $input) {
      id
      name
      description
      price
      category
    }
  }
`;

export const DELETE_MENU_ITEM = gql`
  mutation DeleteMenuItem($id: ID!) {
    deleteMenuItem(id: $id) {
      id
    }
  }
`;
