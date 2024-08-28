import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { gql } from '@apollo/client';

// GraphQL Mutation
const ADD_MENU_ITEM = gql`
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

const MenuItemForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
  });

  const [addMenuItem, { data, loading, error }] = useMutation(ADD_MENU_ITEM);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addMenuItem({
        variables: {
          menuItemInput: {
            name: formData.name,
            description: formData.description,
            price: parseFloat(formData.price),  // Convert price to float
            category: formData.category,
          },
        },
      });
      setFormData({ name: '', description: '', price: '', category: '' }); // Clear form
      alert('Menu item added successfully!');
    } catch (err) {
      console.error('Error adding menu item:', err.message);
    }
  };

  return (
    <div>
      <h2>Add a New Menu Item</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="number"
            step="0.01"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Category:</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Adding...' : 'Add Menu Item'}
        </button>
        {error && <p>Error: {error.message}</p>}
        {data && <p>Menu item added: {data.addMenuItem.name}</p>}
      </form>
    </div>
  );
};

export default MenuItemForm;
