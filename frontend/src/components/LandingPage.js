// src/components/LandingPage.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import { useCart } from '../CartContext'; // Import the Cart Context
// import './LandingPage.css'; // Import the CSS file for styling

const LandingPage = () => {
  const { cart } = useCart(); // Use Cart Context
  const navigate = useNavigate(); // Initialize navigate

  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Example: remove token
    navigate('/login'); // Redirect to login page
  };

  return (
    <div>
      <header className="header">
        <h1>Welcome to the Dashboard</h1>
        <nav>
          <ul>
            <li><Link to="/user-dashboard">Menu Items</Link></li>
            <li><Link to="/cart">Go to Cart ({cart.length})</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
            <li><button onClick={handleLogout} className="logout-button">Logout</button></li> {/* Logout button */}
          </ul>
        </nav>
      </header>

      <main>
        <h2>Welcome, User!</h2>
        <p>This is your dashboard. Explore our menu items or manage your cart.</p>
      </main>
    </div>
  );
};

export default LandingPage;
