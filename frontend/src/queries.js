/* This code snippet is defining GraphQL queries and mutations using the `gql` function from the
`@apollo/client` package in JavaScript. Here's a breakdown of what each part of the code is doing: */
import { gql } from '@apollo/client';

// Queries
export const GET_MENU_ITEMS = gql`
  query GetMenuItems {
    menuItems {
      id
      name
      description
      price
      category
    }
  }
`;

export const GET_MENU_ITEM = gql`
  query GetMenuItem($id: ID!) {
    menuItem(id: $id) {
      id
      name
      description
      price
      category
    }
  }
`;

// Mutations
export const ADD_MENU_ITEM = gql`
  mutation AddMenuItem($menuItemInput: MenuItemInput!) {
    addMenuItem(menuItemInput: $menuItemInput) {
      id
      name
      description
      price
      category
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
    }
  }
`;

export const DELETE_MENU_ITEM = gql`
  mutation DeleteMenuItem($id: ID!) {
    deleteMenuItem(id: $id)
  }
`;
