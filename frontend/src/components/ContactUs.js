import React from 'react';

const contactUsStyles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    lineHeight: 1.6,
    color: '#fff', // Light text color
    backgroundColor: '#333', // Dark background color
    backgroundImage: 'url(https://wallpapers.com/images/hd/paella-dish-with-veggies-on-board-0ey63p78wcip8k67.jpg)', // Background image URL
    backgroundSize: 'cover', // Cover the entire background
    backgroundPosition: 'center', // Center the background image
    minHeight: '100vh', // Ensure the container covers the full viewport height
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
    background: '#000', // Black background color
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
  content: {
    marginTop: '60px', // Ensure content is below the fixed header
    textAlign: 'center',
  },
  contactList: {
    listStyleType: 'none',
    padding: '0',
    textAlign: 'left',
    margin: '20px auto',
    maxWidth: '600px',
  },
  contactItem: {
    background: 'rgba(255, 255, 255, 0.1)', // Transparent background
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '5px',
  },
};

const ContactUs = () => {
  return (
    <div style={contactUsStyles.container}>
      <header style={contactUsStyles.header}>
        <h1 style={contactUsStyles.headerTitle}>Contact Us</h1>
      </header>
      <main style={contactUsStyles.content}>
        <h1>Contact Us</h1>
        <p>If you have any questions, feel free to reach out to us:</p>
        <ul style={contactUsStyles.contactList}>
          <li style={contactUsStyles.contactItem}>Email: support@canteenmanagement.com</li>
          <li style={contactUsStyles.contactItem}>Phone: +1-234-567-890</li>
          <li style={contactUsStyles.contactItem}>Address: 123 Canteen Street, Food City, FC 12345</li>
        </ul>
      </main>
    </div>
  );
};

export default ContactUs;
