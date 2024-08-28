import React, { useState, useEffect } from 'react';

const AdminDashboard = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      const response = await fetch('http://localhost:4000/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.JWT_SECRET}` // If using authentication
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
        console.error('Error:', result.errors);
      } else {
        setMenuItems(result.data.menuItems);
      }
    } catch (err) {
      console.error('Network error:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:4000/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.JWT_SECRET}` // If using authentication
        },
        body: JSON.stringify({
          query: `
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
          `
        })
      });

      const result = await response.json();
      if (result.errors) {
        console.error('Error:', result.errors);
      } else {
        console.log('Menu item added:', result.data.addMenuItem);
        fetchMenuItems(); // Refresh the menu items list after adding a new item
      }
    } catch (err) {
      console.error('Network error:', err);
    }
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      
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
        <button type="submit">Add Menu Item</button>
      </form>

      <h2>Menu Items</h2>
      <ul>
        {menuItems.map((item) => (
          <li key={item.id}>
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <p>Price: ${item.price}</p>
            <p>Category: {item.category}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
