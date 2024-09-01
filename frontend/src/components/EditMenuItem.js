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
    <div style={styles.container}>
      <h1 style={styles.header}>Edit Menu Item</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
          style={styles.input}
        />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          required
          style={styles.input}
        />
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
          required
          style={styles.input}
        />
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Category"
          required
          style={styles.input}
        />
        <button type="submit" style={styles.submitButton}>Update Menu Item</button>
      </form>
    </div>
  );
};

export default EditMenuItem;

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    lineHeight: 1.6,
    color: '#fff',
    backgroundColor: '#333',
    backgroundImage: 'url(https://wallpapers.com/images/hd/paella-dish-with-veggies-on-board-0ey63p78wcip8k67.jpg)',
    backgroundSize: 'cover',       // Cover the entire viewport
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    minHeight: '100vh',
    width: '100vw',
    margin: '0',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  header: {
    fontSize: '2rem',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '10px',
    width: '100%',
    maxWidth: '500px',
  },
  input: {
    width: '100%',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '1rem',
  },
  submitButton: {
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    padding: '10px 20px',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'background-color 0.3s ease',
  },
};
