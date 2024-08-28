import React, { useState } from 'react';

const AdminDashboard = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:4000/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Replace `yourAuthToken` with the actual token if authentication is used
          'Authorization': `Bearer ${process.env.JWT_SECRET}`
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
      }
    } catch (err) {
      console.error('Network error:', err);
    }
  };

  return (
    <div>
      <h2>Add New Menu Item</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label>Description:</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div>
          <label>Category:</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <button type="submit">Add Menu Item</button>
      </form>
    </div>
  );
};

export default AdminDashboard;
