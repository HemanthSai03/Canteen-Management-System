import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [editId, setEditId] = useState(null);
  const navigate = useNavigate();

  const handleAddOrUpdate = async (e) => {
    e.preventDefault();

    const mutation = editId
      ? `
          mutation {
            updateMenuItem(id: "${editId}", menuItemInput: {
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
        `
      : `
          mutation {
            addMenuItem(menuItemInput: {
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
        `;

    try {
      const response = await fetch('http://localhost:4000/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: mutation }),
      });

      const result = await response.json();
      if (result.errors) {
        console.error('Error adding/updating menu item:', result.errors);
      } else {
        console.log('Menu item processed:', result.data);
        clearForm();
      }
    } catch (err) {
      console.error('Network error adding/updating menu item:', err);
    }
  };

  const handleEdit = (item) => {
    setEditId(item.id);
    setName(item.name);
    setDescription(item.description);
    setPrice(item.price);
    setCategory(item.category);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch('http://localhost:4000/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `
            mutation {
              deleteMenuItem(id: "${id}")
            }
          `,
        }),
      });

      const result = await response.json();
      if (result.errors) {
        console.error('Error deleting menu item:', result.errors);
      } else {
        console.log('Menu item deleted');
      }
    } catch (err) {
      console.error('Network error deleting menu item:', err);
    }
  };

  const clearForm = () => {
    setName('');
    setDescription('');
    setPrice('');
    setCategory('');
    setEditId(null);
  };

  const handleLogout = () => {
    console.log('User logged out');
    window.location.href = '/login';
  };

  const navigateToManageMenuItems = () => {
    navigate('/manage-menu-items');
  };

  const navigateToViewMenuItems = () => {
    navigate('/view-menu-items');
  };

  return (
    <div style={styles.userDashboard}>
      <h2>Dash Board</h2>
      <br></br>
      <header style={styles.headerContainer}>
        <h1 style={styles.header}>Admin Dashboard</h1>
        <div style={styles.headerButtons}>
          <button onClick={navigateToManageMenuItems} style={styles.manageButton}>
            Manage Menu Items
          </button>
          <button onClick={navigateToViewMenuItems} style={styles.viewButton}>
            View Menu Items
          </button>
          <button onClick={handleLogout} style={styles.logoutButton}>Logout</button>
        </div>
      </header>
      
      <main style={styles.main}>
        <h2>Welcome To Canteen Management</h2>
        <p>This is your dashboard. You can add your menu items here.</p>
      </main>
      
      {/* Container for "Add Menu Items Here" and the form */}
      <div style={styles.formContainer}>
        <h1 style={styles.formTitle}>Add Menu Items Here</h1>
        <form onSubmit={handleAddOrUpdate} style={styles.form}>
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
          <button type="submit" style={styles.submitButton}>
            {editId ? 'Update Menu Item' : 'Add Menu Item'}
          </button>
          {editId && <button type="button" onClick={clearForm} style={styles.cancelButton}>Cancel</button>}
        </form>
      </div>
    </div>
  );
};

const styles = {
  userDashboard: {
    fontFamily: 'Arial, sans-serif',
    lineHeight: 1.6,
    color: '#fff',
    backgroundColor: '#333',
    backgroundImage: 'url(https://wallpapers.com/images/hd/paella-dish-with-veggies-on-board-0ey63p78wcip8k67.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
  },
  headerContainer: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#000',
    padding: '20px',
    borderRadius: '0 0 5px 5px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    zIndex: 1000,
  },
  header: {
    fontSize: '2rem',
    margin: 0,
  },
  headerButtons: {
    display: 'flex',
    flexDirection: 'row',
    gap: '10px',
    marginLeft: 'auto',
  },
  logoutButton: {
    backgroundColor: 'transparent',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    padding: '10px 20px',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'background-color 0.3s ease',
  },
  formContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Semi-transparent background
    padding: '20px',
    borderRadius: '10px',
    maxWidth: '600px',
    margin: '50px auto', // Center the form container
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
  },
  formTitle: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  input: {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  submitButton: {
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    padding: '10px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: 'bold',
    transition: 'background-color 0.3s ease, transform 0.2s ease',
  },
  cancelButton: {
    backgroundColor: '#6c757d',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    padding: '10px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: 'bold',
    transition: 'background-color 0.3s ease',
  },
  manageButton: {
    backgroundColor: 'transparent',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    padding: '10px',
    cursor: 'pointer',
    fontSize: '1rem',
  },
  viewButton: {
    backgroundColor: 'transparent',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    padding: '10px',
    cursor: 'pointer',
    fontSize: '1rem',
  },
};

export default AdminDashboard;
