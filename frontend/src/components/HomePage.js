/* This JavaScript code snippet defines a React functional component called `HomePage`. The component
represents a webpage for a Canteen Management system. Here's a breakdown of what the code is doing: */
import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserPlus, FaSignInAlt, FaUtensils, FaShoppingCart, FaChartPie } from 'react-icons/fa';

const lightModeStyles = {
  homePage: {
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
  header: {
    background: 'transparent',
    color: '#fff',
    padding: '10px 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 1000,
  },
  headerTitle: {
    margin: 0,
    fontSize: '2.5rem', // Increased the font size
  },
  authContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '100px',
    gap: '20px',
  },
  authBox: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: '20px',
    borderRadius: '10px',
    maxWidth: '45%',
    flexGrow: 1,
    color: '#fff',
  },
  authTitle: {
    fontSize: '1.5rem',
    marginBottom: '10px',
    textAlign: 'center',
  },
  authMessage: {
    marginBottom: '20px',
    fontSize: '1rem',
    textAlign: 'center',
  },
  navList: {
    listStyle: 'none',
    margin: 0,
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    textAlign: 'center',
  },
  navLink: {
    color: '#fff',
    textDecoration: 'none',
    fontWeight: 'bold',
    fontSize: '1.1rem',
    padding: '10px 15px',
    borderRadius: '5px',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    transition: 'background-color 0.3s ease',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px',
  },
  navLinkHover: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
  featuresContainer: {
    marginTop: '50px',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
    padding: '20px',
  },
  featureBox: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: '20px',
    borderRadius: '10px',
    textAlign: 'center',
    color: '#fff',
  },
  featureTitle: {
    fontSize: '1.5rem',
    marginBottom: '10px',
  },
  featureDescription: {
    fontSize: '1rem',
  },
};

const HomePage = () => {
  return (
    <div style={lightModeStyles.homePage}>
      <header style={lightModeStyles.header}>
        <h1 style={lightModeStyles.headerTitle}>Canteen Management</h1>
      </header>

      <div style={lightModeStyles.authContainer}>
        <div style={lightModeStyles.authBox}>
          <h2 style={lightModeStyles.authTitle}>Sign Up</h2>
          <p style={lightModeStyles.authMessage}>Create an account to start ordering delicious meals.</p>
          <nav>
            <ul style={lightModeStyles.navList}>
              <li>
                <Link 
                  to="/signup" 
                  style={lightModeStyles.navLink} 
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = lightModeStyles.navLinkHover.backgroundColor}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'}
                >
                  <FaUserPlus /> Sign Up
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <div style={lightModeStyles.authBox}>
          <h2 style={lightModeStyles.authTitle}>Login</h2>
          <p style={lightModeStyles.authMessage}>Already have an account? Log in to continue.</p>
          <nav>
            <ul style={lightModeStyles.navList}>
              <li>
                <Link 
                  to="/login" 
                  style={lightModeStyles.navLink} 
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = lightModeStyles.navLinkHover.backgroundColor}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'}
                >
                  <FaSignInAlt /> Login
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <div style={lightModeStyles.featuresContainer}>
        <div style={lightModeStyles.featureBox}>
          <FaUtensils size={40} />
          <h3 style={lightModeStyles.featureTitle}>Menu Management</h3>
          <p style={lightModeStyles.featureDescription}>Easily add, edit, and delete menu items. Manage your canteen's offerings with a simple interface.</p>
        </div>
        <div style={lightModeStyles.featureBox}>
          <FaShoppingCart size={40} />
          <h3 style={lightModeStyles.featureTitle}>Shopping Cart</h3>
          <p style={lightModeStyles.featureDescription}>Keep track of selected items with our user-friendly shopping cart system.</p>
        </div>
        <div style={lightModeStyles.featureBox}>
          <FaChartPie size={40} />
          <h3 style={lightModeStyles.featureTitle}>Dashboard Insights</h3>
          <p style={lightModeStyles.featureDescription}>Get insights into sales and menu performance with our comprehensive dashboard.</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
