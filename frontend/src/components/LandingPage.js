import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../CartContext'; // Import the Cart Context
// import './LandingPage.css'; // Import the CSS file for styling

const LandingPage = () => {
  const { cart } = useCart(); // Use Cart Context

  return (
    <div>
      <header className="header">
        <h1>Welcome to the Dashboard</h1>
        <nav>
          <ul>
            <li><Link to="/user-dashboard">Menu Items</Link></li>
            <li><Link to="/cart">Go to Cart ({cart.length})</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
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
