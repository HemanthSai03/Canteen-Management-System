import React, { useState, useEffect } from 'react';

// Dummy function to simulate adding item to cart
const addToCart = (item) => {
  // This function would ideally interact with a cart context or global state
  console.log('Added to cart:', item);
};

const UserDashboard = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [cart, setCart] = useState([]); // State to manage cart items

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      const response = await fetch('http://localhost:4000/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
          // 'Authorization': `Bearer ${yourAuthToken}` // Uncomment if using authentication
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

  const handleOrderClick = (item) => {
    setCart([...cart, item]); // Add item to cart state
    addToCart(item); // Optional: Call a function to handle cart addition
  };

  return (
    <div>
      <h1>User Dashboard</h1>
      
      <h2>Menu Items</h2>
      <ul>
        {menuItems.length > 0 ? (
          menuItems.map((item) => (
            <li key={item.id}>
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <p>Price: ${item.price}</p>
              <p>Category: {item.category}</p>
              <button onClick={() => handleOrderClick(item)}>Order</button>
            </li>
          ))
        ) : (
          <p>No menu items available</p>
        )}
      </ul>

      <h2>Cart</h2>
      <ul>
        {cart.length > 0 ? (
          cart.map((item, index) => (
            <li key={index}>
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <p>Price: ${item.price}</p>
              <p>Category: {item.category}</p>
            </li>
          ))
        ) : (
          <p>Cart is empty</p>
        )}
      </ul>
    </div>
  );
};

export default UserDashboard;
