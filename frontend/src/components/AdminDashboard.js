import React, { useState, useEffect } from 'react';

const AdminDashboard = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      const response = await fetch('http://localhost:4000/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          query: `
            query {
              menuItems {
                id
                name
                description
                price
                category
              }
            }
          `
        })
      });

      const result = await response.json();
      if (result.errors) {
        console.error('Error fetching menu items:', result.errors);
      } else {
        setMenuItems(result.data.menuItems);
      }
    } catch (err) {
      console.error('Network error fetching menu items:', err);
    }
  };

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
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query: mutation })
      });

      const result = await response.json();
      if (result.errors) {
        console.error('Error adding/updating menu item:', result.errors);
      } else {
        console.log('Menu item processed:', result.data);
        fetchMenuItems(); // Refresh the menu items list after operation
        clearForm(); // Clear form fields
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
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          query: `
            mutation {
              deleteMenuItem(id: "${id}")
            }
          `
        })
      });

      const result = await response.json();
      if (result.errors) {
        console.error('Error deleting menu item:', result.errors);
      } else {
        console.log('Menu item deleted');
        fetchMenuItems(); // Refresh the menu items list after deletion
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

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Admin Dashboard</h1>
      
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

      <h2 style={styles.subHeader}>Menu Items</h2>
      <ul style={styles.menuList}>
        {menuItems.map((item) => (
          <li key={item.id} style={styles.menuItem}>
            <h3 style={styles.itemName}>{item.name}</h3>
            <p style={styles.itemDescription}>{item.description}</p>
            <p style={styles.itemPrice}>Price: ${item.price}</p>
            <p style={styles.itemCategory}>Category: {item.category}</p>
            <button onClick={() => handleEdit(item)} style={styles.editButton}>Edit</button>
            <button onClick={() => handleDelete(item.id)} style={styles.deleteButton}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    fontSize: '2rem',
    marginBottom: '20px',
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '500px',
    margin: '0 auto',
  },
  input: {
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  submitButton: {
    backgroundColor: '#28a745', /* Green background */
    color: '#fff', /* White text */
    border: 'none',
    borderRadius: '5px',
    padding: '10px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: 'bold',
    transition: 'background-color 0.3s ease, transform 0.2s ease',
    marginBottom: '10px',
  },
  cancelButton: {
    backgroundColor: '#6c757d', /* Gray background */
    color: '#fff', /* White text */
    border: 'none',
    borderRadius: '5px',
    padding: '10px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: 'bold',
    transition: 'background-color 0.3s ease',
  },
  subHeader: {
    fontSize: '1.5rem',
    marginBottom: '10px',
    textAlign: 'center',
  },
  menuList: {
    listStyle: 'none',
    padding: 0,
  },
  menuItem: {
    border: '1px solid #ddd',
    borderRadius: '5px',
    padding: '15px',
    marginBottom: '10px',
    backgroundColor: '#f9f9f9',
  },
  itemName: {
    fontSize: '1.25rem',
    margin: '0 0 10px 0',
  },
  itemDescription: {
    fontSize: '1rem',
    margin: '0 0 10px 0',
  },
  itemPrice: {
    fontSize: '1rem',
    margin: '0 0 10px 0',
  },
  itemCategory: {
    fontSize: '1rem',
    margin: '0 0 10px 0',
  },
  editButton: {
    backgroundColor: '#007bff', /* Blue background */
    color: '#fff', /* White text */
    border: 'none',
    borderRadius: '5px',
    padding: '10px',
    cursor: 'pointer',
    fontSize: '0.875rem',
    fontWeight: 'bold',
    marginRight: '5px',
    transition: 'background-color 0.3s ease',
  },
  deleteButton: {
    backgroundColor: '#dc3545', /* Red background */
    color: '#fff', /* White text */
    border: 'none',
    borderRadius: '5px',
    padding: '10px',
    cursor: 'pointer',
    fontSize: '0.875rem',
    fontWeight: 'bold',
    transition: 'background-color 0.3s ease',
  },
};

export default AdminDashboard;
