import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { UPDATE_MENU_ITEM } from '../graphql/mutations';

const EditMenuItem = () => {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [updateMenuItem] = useMutation(UPDATE_MENU_ITEM);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMenuItem();
  }, []);

  const fetchMenuItem = async () => {
    try {
      const response = await fetch('http://localhost:4000/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `
            query {
              menuItem(id: "${id}") {
                id
                name
                description
                price
                category
                imageUrl
              }
            }
          `,
        }),
      });

      const result = await response.json();
      if (result.errors) {
        console.error('Error fetching menu item:', result.errors);
      } else {
        const item = result.data.menuItem;
        setName(item.name);
        setDescription(item.description);
        setPrice(item.price);
        setCategory(item.category);
        setImageUrl(item.imageUrl);
      }
    } catch (err) {
      console.error('Network error fetching menu item:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateMenuItem({
        variables: {
          id,
          menuItemInput: {
            name,
            description,
            price: parseFloat(price),
            category,
            imageUrl
          }
        }
      });
      navigate('/manage-menu-items');
    } catch (err) {
      console.error('Error updating menu item:', err.message);
    }
  };

  return (
    <div>
      <h1>Edit Menu Item</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          placeholder="Name" 
          required 
        />
        <input 
          type="text" 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          placeholder="Description" 
          required 
        />
        <input 
          type="number" 
          value={price} 
          onChange={(e) => setPrice(e.target.value)} 
          placeholder="Price" 
          required 
        />
        <input 
          type="text" 
          value={category} 
          onChange={(e) => setCategory(e.target.value)} 
          placeholder="Category" 
          required 
        />
        <input 
          type="text" 
          value={imageUrl} 
          onChange={(e) => setImageUrl(e.target.value)} 
          placeholder="Image URL" 
        />
        <button type="submit">Update Menu Item</button>
      </form>
    </div>
  );
};

export default EditMenuItem;
