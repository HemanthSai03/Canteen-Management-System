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
           //'Authorization': `Bearer ${process.env.JWT_SECRET}` // Uncomment if using authentication
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
          // 'Authorization': `Bearer ${yourAuthToken}` // Uncomment if using authentication
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
          // 'Authorization': `Bearer ${yourAuthToken}` // Uncomment if using authentication
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
    <div>
      <h1>Admin Dashboard</h1>
      
      <form onSubmit={handleAddOrUpdate}>
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
        <button type="submit">
          {editId ? 'Update Menu Item' : 'Add Menu Item'}
        </button>
        {editId && <button type="button" onClick={clearForm}>Cancel</button>}
      </form>

      <h2>Menu Items</h2>
      <ul>
        {menuItems.map((item) => (
          <li key={item.id}>
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <p>Price: ${item.price}</p>
            <p>Category: {item.category}</p>
            <button onClick={() => handleEdit(item)}>Edit</button>
            <button onClick={() => handleDelete(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
