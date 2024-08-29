import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../CartContext'; // Import the Cart Context

const styles = {
  landingPage: {
    fontFamily: 'Arial, sans-serif',
    lineHeight: 1.6,
    color: '#fff', // Light text color
    backgroundColor: '#333', // Dark background color
    backgroundImage: 'url(https://wallpapers.com/images/hd/paella-dish-with-veggies-on-board-0ey63p78wcip8k67.jpg)', // Background image URL
    backgroundSize: 'cover', // Cover the entire background
    backgroundPosition: 'center', // Center the background image
    minHeight: '100vh', // Ensure the landingPage covers the full viewport height
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
  },
  header: {
    position: 'fixed', // Make the header stick to the top
    top: 0,
    left: 0,
    right: 0,
    background: 'black', // Remove background color
    color: '#fff',
    padding: '10px 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 1000, // Ensure the header is above other content
  },
  headerTitle: {
    margin: 0,
    fontSize: '1.5rem',
  },
  navList: {
    listStyle: 'none',
    margin: 0,
    padding: 0,
    display: 'flex',
  },
  navListItem: {
    margin: '0 10px',
  },
  navLink: {
    color: '#fff',
    textDecoration: 'none',
    fontWeight: 'bold',
    fontSize: '1rem', // Decrease font size
    padding: '5px 10px', // Decrease padding for smaller buttons
    borderRadius: '5px', // Round the corners
    backgroundColor: 'rgba(255, 255, 255, 0.2)', // Semi-transparent background
    transition: 'background-color 0.3s ease', // Smooth transition for hover effect
  },
  navLinkHover: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)', // Change background color on hover
  },
  logoutButton: {
    background: '#f44336',
    color: '#fff',
    border: 'none',
    padding: '5px 10px',
    cursor: 'pointer',
    borderRadius: '5px', // Round the corners
    transition: 'background-color 0.3s ease', // Smooth transition for hover effect
  },
  logoutButtonHover: {
    background: '#d32f2f',
  },
  main: {
    marginTop: '60px', // Add margin to account for the fixed header
    padding: '20px',
  },
};

const LandingPage = () => {
  const { cart } = useCart(); // Use Cart Context
  const navigate = useNavigate(); // Initialize navigate

  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Example: remove token
    navigate('/login'); // Redirect to login page
  };

  return (
    <div style={styles.landingPage}>
      <header style={styles.header}>
        <h1 style={styles.headerTitle}>Welcome to the Dashboard</h1>
        <nav>
          <ul style={styles.navList}>
            <li style={styles.navListItem}><Link to="/user-dashboard" style={styles.navLink}>Menu Items</Link></li>
            <li style={styles.navListItem}><Link to="/cart" style={styles.navLink}>Go to Cart ({cart.length})</Link></li>
            <li style={styles.navListItem}><Link to="/contact" style={styles.navLink}>Contact Us</Link></li>
            <li style={styles.navListItem}>
              <button
                onClick={handleLogout}
                style={styles.logoutButton}
                onMouseOver={(e) => e.currentTarget.style.background = styles.logoutButtonHover.background}
                onMouseOut={(e) => e.currentTarget.style.background = styles.logoutButton.background}
              >
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </header>

      <main style={styles.main}>
        <h2>Welcome, User!</h2>
        <p>This is your dashboard. Explore our menu items or manage your cart.</p>
      </main>
    </div>
  );
};

export default LandingPage;
