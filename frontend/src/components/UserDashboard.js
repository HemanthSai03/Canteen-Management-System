import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../CartContext'; // Import the Cart Context

const lightModeStyles = {
  userDashboard: {
    fontFamily: 'Arial, sans-serif',
    lineHeight: 1.6,
    color: '#fff', // Light text color
    backgroundColor: '#333', // Dark background color
    backgroundImage: 'url(https://wallpapers.com/images/hd/paella-dish-with-veggies-on-board-0ey63p78wcip8k67.jpg)', // Background image URL
    backgroundSize: 'cover', // Cover the entire background
    backgroundPosition: 'center', // Center the background image
    backgroundAttachment: 'fixed', // Keep the background fixed
    minHeight: '100vh', // Ensure the userDashboard covers the full viewport height
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
  searchFilter: {
    display: 'flex',
    alignItems: 'center',
    margin: '20px 0',
  },
  searchBar: {
    flex: 1,
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    marginRight: '10px',
  },
  categoryFilter: {
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
  },
  menuList: {
    display: 'flex',
    flexWrap: 'wrap', // Allows items to wrap onto the next line
    gap: '20px', // Add space between the cards
    padding: 0,
    margin: 0,
    listStyle: 'none',
  },
  menuItemCard: {
    flex: '1 1 calc(33.333% - 20px)', // Adjust width to fit 3 items per row with gaps
    backgroundColor: 'rgb(255,246,244)',
    color: '#000',
    border: '1px solid #ddd',
    borderRadius: '10px', // Rounded corners for a card-like appearance
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Add subtle shadow for a card effect
    overflow: 'hidden', // Ensure content doesn't overflow the card
    display: 'flex',
    flexDirection: 'column', // Stack content vertically
    justifyContent: 'space-between', // Distribute space evenly
    padding: '20px',
  },
  menuItemTitle: {
    marginTop: 0,
    marginBottom: '10px',
    fontSize: '1.2rem',
    fontWeight: 'bold',
  },
  menuItemDescription: {
    fontSize: '0.9rem',
    marginBottom: '15px',
    color: '#555',
  },
  menuItemPrice: {
    fontSize: '1rem',
    fontWeight: 'bold',
    color: '#333',
  },
  orderButton: {
    background: '#4caf50',
    color: '#fff',
    border: 'none',
    padding: '10px',
    cursor: 'pointer',
    borderRadius: '4px',
    transition: 'background-color 0.3s ease', // Smooth transition for hover effect
    marginTop: 'auto', // Push the button to the bottom
  },
  orderButtonHover: {
    background: '#388e3c',
  },
  cartItemsContainer: {
    display: 'flex',
    flexWrap: 'wrap', // Allow wrapping of items to the next line
    gap: '15px', // Space between cart items
  },
  cartItem: {
    flex: '1 1 calc(33.333% - 15px)', // Adjust width to fit 3 items per row with gaps
    boxSizing: 'border-box',
    border: '1px solid #ddd',
    borderRadius: '4px',
    padding: '15px',
    background: '#fff',
    color: '#000', // Set text color to black
  },
};

const UserDashboard = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); // State for search query
  const [selectedCategory, setSelectedCategory] = useState('All'); // State for selected category
  const { cart, addToCart } = useCart(); // Use Cart Context
  const navigate = useNavigate(); // For navigation after logout

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      const response = await fetch('http://localhost:4000/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
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
          `,
        }),
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
    addToCart(item); // Add item to cart context
    alert(`${item.name} has been added to your cart!`);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleLogout = () => {
    // Clear any authentication-related information, such as tokens
    localStorage.removeItem('authToken');
    // Redirect to login page or home page
    navigate('/login');
  };

  const filteredMenuItems = menuItems
    .filter((item) =>
      item.name.toLowerCase().includes(searchQuery) ||
      item.description.toLowerCase().includes(searchQuery) ||
      item.category.toLowerCase().includes(searchQuery)
    )
    .filter((item) =>
      selectedCategory === 'All' ? true : item.category === selectedCategory
    );

  const uniqueCategories = ['All', ...new Set(menuItems.map(item => item.category))];

  return (
    <div style={lightModeStyles.userDashboard}>
      <header style={lightModeStyles.header}>
        <h1 style={lightModeStyles.headerTitle}>User Dashboard</h1>
        <nav>
          <ul style={lightModeStyles.navList}>
            <li style={lightModeStyles.navListItem}>
              <Link to="/user-dashboard" style={lightModeStyles.navLink}>Menu Items</Link>
            </li>
            <li style={lightModeStyles.navListItem}>
              <Link to="/cart" style={lightModeStyles.navLink}>Go to Cart ({cart.length})</Link>
            </li>
            <li style={lightModeStyles.navListItem}>
              <Link to="/contact" style={lightModeStyles.navLink}>Contact Us</Link>
            </li>
            <li style={lightModeStyles.navListItem}>
              <button
                onClick={handleLogout}
                style={lightModeStyles.logoutButton}
                onMouseOver={(e) => e.currentTarget.style.background = lightModeStyles.logoutButtonHover.background}
                onMouseOut={(e) => e.currentTarget.style.background = lightModeStyles.logoutButton.background}
              >
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </header>

      <main>
        <h2>Menu Items</h2>
        <div style={lightModeStyles.searchFilter}>
          <input
            type="text"
            placeholder="Search menu items..."
            value={searchQuery}
            onChange={handleSearchChange}
            style={lightModeStyles.searchBar}
          />
          <select
            onChange={handleCategoryChange}
            value={selectedCategory}
            style={lightModeStyles.categoryFilter}
          >
            {uniqueCategories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <ul style={lightModeStyles.menuList}>
          {filteredMenuItems.length > 0 ? (
            filteredMenuItems.map((item) => (
              <li key={item.id} style={lightModeStyles.menuItemCard}>
                <h3 style={lightModeStyles.menuItemTitle}>{item.name}</h3>
                <p style={lightModeStyles.menuItemDescription}>{item.description}</p>
                <p style={lightModeStyles.menuItemPrice}>Price: ${item.price}</p>
                <p>Category: {item.category}</p>
                <button
                  onClick={() => handleOrderClick(item)}
                  style={lightModeStyles.orderButton}
                  onMouseOver={(e) => e.currentTarget.style.background = lightModeStyles.orderButtonHover.background}
                  onMouseOut={(e) => e.currentTarget.style.background = lightModeStyles.orderButton.background}
                >
                  Order
                </button>
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
