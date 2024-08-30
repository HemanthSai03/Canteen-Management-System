import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditMenuItem = () => {
  const { id } = useParams();
  const [menuItem, setMenuItem] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
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
        setMenuItem(item);
        setName(item.name);
        setDescription(item.description);
        setPrice(item.price);
        setCategory(item.category);
      }
    } catch (err) {
      console.error('Network error fetching menu item:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `
            mutation {
              updateMenuItem(id: "${id}", menuItemInput: {
                name: "${name}",
                description: "${description}",
                price: ${price},
                category: "${category}"
              }) {
                id
                name
                description
                price
                category
              }
            }
          `,
        }),
      });

      const result = await response.json();
      if (result.errors) {
        console.error('Error updating menu item:', result.errors);
      } else {
        console.log('Menu item updated:', result.data);
        navigate('/manage-menu-items');
      }
    } catch (err) {
      console.error('Network error updating menu item:', err);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Edit Menu Item</h1>
      {menuItem ? (
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
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    lineHeight: 1.6,
    color: '#333',
    backgroundColor: '#f9f9f9',
    padding: '20px',
  },
  header: {
    fontSize: '2rem',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '500px',
    margin: '0 auto',
  },
  input: {
    marginBottom: '10px',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '5px',
  },
  submitButton: {
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    padding: '10px 20px',
    cursor: 'pointer',
  },
};

export default EditMenuItem;
