import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '.'; // Import the Cart Context
import '../components/UserDashboard.css'


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
      <header className="header">
        <h1>User Dashboard</h1>
        <nav>
          <ul>
            <li><Link to="/user-dashboard">Menu Items</Link></li>
            <li><Link to="/cart">Go to Cart ({cart.length})</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
          </ul>
        </nav>
      </header>

      <main>
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
      </main> 
      </div>
  );
};

export default UserDashboard;
