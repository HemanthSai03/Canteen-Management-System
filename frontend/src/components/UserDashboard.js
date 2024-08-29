import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import { useCart } from '../CartContext'; // Import the Cart Context
import '../components/UserDashboard.css';

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
    <div>
      <header className="header">
        <h1>User Dashboard</h1>
        <nav>
          <ul>
            <li><Link to="/user-dashboard">Menu Items</Link></li>
            <li><Link to="/cart">Go to Cart ({cart.length})</Link></li> {/* Show cart item count */}
            <li><Link to="/contact">Contact Us</Link></li>
            <li><button onClick={handleLogout} className="logout-button">Logout</button></li> {/* Logout button */}
          </ul>
        </nav>
      </header>

      <main>
        <h2>Menu Items</h2>
        <input
          type="text"
          placeholder="Search menu items..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="search-bar" // Optional: Add a className for styling
        />

        <select onChange={handleCategoryChange} value={selectedCategory} className="category-filter">
          {uniqueCategories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>

        <ul>
          {filteredMenuItems.length > 0 ? (
            filteredMenuItems.map((item) => (
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
