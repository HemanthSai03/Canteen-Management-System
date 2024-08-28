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
