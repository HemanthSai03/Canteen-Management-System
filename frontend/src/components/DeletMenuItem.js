/**
 * The DeleteMenuItem component uses Apollo Client's useMutation hook to delete a menu item with the
 * specified id.
 * @returns The DeleteMenuItem component is being returned, which consists of a button element with the
 * text "Delete Item" and an onClick event handler that calls the handleDelete function when clicked.
 * The handleDelete function invokes the deleteMenuItem mutation with the id variable passed as an
 * argument.
 */

import React from 'react';
import { useMutation } from '@apollo/client';
import { DELETE_MENU_ITEM } from '../queries';

const DeleteMenuItem = ({ id }) => {
  const [deleteMenuItem] = useMutation(DELETE_MENU_ITEM);

  const handleDelete = () => {
    deleteMenuItem({ variables: { id } }).catch(err => console.error(err));
  };

  return (
    <button onClick={handleDelete}>Delete Item</button>
  );
};

export default DeleteMenuItem;
