import React, { useState } from 'react';
import { useCart } from '../CartContext'; // Import the Cart Context
import PaymentModal from './PaymentModal'; // Import the PaymentModal component

const lightModeStyles = {
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
  navList: {
    listStyle: 'none',
    margin: 0,
    padding: 0,
    display: 'flex',
    gap: '10px', // Add space between links
  },
  navListItem: {
    margin: 0, // Remove default margin
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
  list: {
    listStyleType: 'none',
    padding: '0',
    display: 'flex',
    flexWrap: 'wrap', // Allow items to wrap to the next line
    gap: '10px', // Space between items
  },
  item: {
    borderBottom: '1px solid #ddd',
    padding: '10px',
    background: '#ffe4e1', // Pinkish white background
    color: '#000', // Black text color
    width: 'calc(33% - 10px)', // Set width to one-third minus gap
    boxSizing: 'border-box', // Include padding in width
    marginBottom: '10px', // Add space at the bottom
  },
  itemName: {
    fontSize: '1.2rem',
    marginBottom: '5px',
  },
  itemDescription: {
    fontSize: '1rem',
    marginBottom: '5px',
  },
  itemPrice: {
    fontSize: '1rem',
    marginBottom: '5px',
  },
  itemCategory: {
    fontSize: '1rem',
    marginBottom: '10px',
  },
  removeButton: {
    backgroundColor: '#dc3545', /* Red background */
    color: '#fff', /* White text */
    border: 'none',
    borderRadius: '5px',
    padding: '10px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: 'bold',
    transition: 'background-color 0.3s ease',
  },
  emptyMessage: {
    textAlign: 'center',
    fontSize: '1.2rem',
    color: '#888',
  },
  paymentButton: {
    backgroundColor: '#28a745', /* Green background */
    color: '#fff', /* White text */
    border: 'none',
    borderRadius: '5px',
    padding: '15px',
    cursor: 'pointer',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    transition: 'background-color 0.3s ease',
    marginTop: '20px',
    width: '100%',
    textAlign: 'center',
  },
};

const CartPage = () => {
  const { cart, removeFromCart } = useCart(); // Use Cart Context
  const [showModal, setShowModal] = useState(false);

  const handleRemoveClick = (item) => {
    removeFromCart(item);
    alert(`${item.name} has been removed from your cart!`);
  };

  const handlePaymentClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div style={lightModeStyles.container}>
      <header style={lightModeStyles.header}>
        <h1 style={lightModeStyles.headerTitle}>Your Cart</h1>
      </header>
      <main>
        <h2>Items</h2>
        {cart.length > 0 ? (
          <>
            <ul style={lightModeStyles.list}>
              {cart.map((item, index) => (
                <li key={index} style={lightModeStyles.item}>
                  <h3 style={lightModeStyles.itemName}>{item.name}</h3>
                  <p style={lightModeStyles.itemDescription}>{item.description}</p>
                  <p style={lightModeStyles.itemPrice}>Price: ${item.price}</p>
                  <p style={lightModeStyles.itemCategory}>Category: {item.category}</p>
                  <button
                    onClick={() => handleRemoveClick(item)}
                    style={lightModeStyles.removeButton}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
            <button
              onClick={handlePaymentClick}
              style={lightModeStyles.paymentButton}
            >
              Proceed to Payment
            </button>
          </>
        ) : (
          <p style={lightModeStyles.emptyMessage}>Your cart is empty.</p>
        )}
      </main>
      {showModal && <PaymentModal cart={cart} onClose={handleCloseModal} />}
    </div>
  );
};

export default CartPage;
