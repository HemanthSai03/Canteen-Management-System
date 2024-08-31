import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserPlus, FaSignInAlt } from 'react-icons/fa'; // Import icons from react-icons

const lightModeStyles = {
  homePage: {
    fontFamily: 'Arial, sans-serif',
    lineHeight: 1.6,
    color: '#fff', // Light text color
    backgroundColor: '#333', // Dark background color
    backgroundImage: 'url(https://wallpapers.com/images/hd/paella-dish-with-veggies-on-board-0ey63p78wcip8k67.jpg)', // Background image URL
    backgroundSize: 'cover', // Cover the entire background
    backgroundPosition: 'center', // Center the background image
    minHeight: '100vh', // Ensure the homePage covers the full viewport height
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
    background: 'transparent', // Remove background color
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
  welcomeContainer: {
    position: 'fixed', // Fix the container to the left corner
    top: '60px', // Position below the header
    left: '20px',
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Increase opacity for better readability
    padding: '30px', // Increase padding for a larger box
    borderRadius: '10px', // Round the corners
    maxWidth: '350px', // Increase the width of the container
    color: '#fff',
  },
  welcomeMessage: {
    marginBottom: '20px',
    fontSize: '1.2rem', // Slightly increase font size
  },
  navList: {
    listStyle: 'none',
    margin: 0,
    padding: 0,
    display: 'flex',
    flexDirection: 'column', // Stack links vertically
    gap: '15px', // Add more space between links
  },
  navListItem: {
    margin: 0, // Remove default margin
  },
  navLink: {
    color: '#fff',
    textDecoration: 'none',
    fontWeight: 'bold',
    fontSize: '1.1rem', // Increase font size for buttons
    padding: '10px 15px', // Increase padding for larger buttons
    borderRadius: '5px', // Round the corners
    backgroundColor: 'rgba(255, 255, 255, 0.2)', // Semi-transparent background
    transition: 'background-color 0.3s ease', // Smooth transition for hover effect
    display: 'flex',
    alignItems: 'center', // Align text and icon vertically
    gap: '10px', // Space between icon and text
  },
  navLinkHover: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)', // Change background color on hover
  },
};

const HomePage = () => {
  return (
    <div style={lightModeStyles.homePage}>
      <header style={lightModeStyles.header}>
        <h1 style={lightModeStyles.headerTitle}>Canteen Management</h1>
      </header>

      <div style={lightModeStyles.welcomeContainer}>
        <div style={lightModeStyles.welcomeMessage}>
          <h2>Welcome to Our Canteen</h2>
          <p>Please sign up or log in to continue.</p>
        </div>
        <nav>
          <ul style={lightModeStyles.navList}>
            <li style={lightModeStyles.navListItem}>
              <Link 
                to="/signup" 
                style={lightModeStyles.navLink} 
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = lightModeStyles.navLinkHover.backgroundColor}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'}
              >
                <FaUserPlus /> Sign Up
              </Link>
            </li>
            <li style={lightModeStyles.navListItem}>
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
  );
};

export default HomePage;
