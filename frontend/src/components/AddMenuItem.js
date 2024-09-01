/**
 * The `AddMenuItem` component in React is a form that allows users to add a new menu item with name,
 * description, price, and category fields.
 * @returns The `AddMenuItem` component is being returned. It is a form that allows users to input
 * details of a menu item such as name, description, price, and category. When the form is submitted, a
 * mutation is executed to add the menu item with the provided details. The form includes input fields
 * for name, description, price, and category, along with a submit button labeled "Add Item".
 */
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_MENU_ITEM } from '../queries';

const AddMenuItem = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [addMenuItem] = useMutation(ADD_MENU_ITEM);

  const handleSubmit = (e) => {
    e.preventDefault();
    addMenuItem({
      variables: {
        menuItemInput: { name, description, price: parseFloat(price), category }
      }
    }).then(() => {
      setName('');
      setDescription('');
      setPrice('');
      setCategory('');
    }).catch(err => console.error(err));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Menu Item</h2>
      <label>
        Name:
        <input type="text" value={name} onChange={e => setName(e.target.value)} />
      </label>
      <label>
        Description:
        <input type="text" value={description} onChange={e => setDescription(e.target.value)} />
      </label>
      <label>
        Price:
        <input type="number" value={price} onChange={e => setPrice(e.target.value)} />
      </label>
      <label>
        Category:
        <input type="text" value={category} onChange={e => setCategory(e.target.value)} />
      </label>
      <button type="submit">Add Item</button>
    </form>
  );
};

export default AddMenuItem;
