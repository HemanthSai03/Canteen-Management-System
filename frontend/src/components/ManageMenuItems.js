import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ManageMenuItems = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMenuItems();
  }, []);

  useEffect(() => {
    // Filter menu items based on the search query
    if (searchQuery) {
      setFilteredItems(
        menuItems.filter(item =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setFilteredItems(menuItems);
    }
  }, [searchQuery, menuItems]);

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

  const handleEdit = (id) => {
    navigate(`/edit-menu-item/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch('http://localhost:4000/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `
            mutation {
              deleteMenuItem(id: "${id}")
            }
          `,
        }),
      });

      const result = await response.json();
      if (result.errors) {
        console.error('Error deleting menu item:', result.errors);
      } else {
        setMenuItems(menuItems.filter(item => item.id !== id));
        console.log('Menu item deleted');
      }
    } catch (err) {
      console.error('Network error deleting menu item:', err);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleManage = () => {
    navigate('/manage-menu-items');
  };

  const handleView = () => {
    navigate('/view-menu-items');
  };

  const handleLogout = () => {
    // Handle logout logic here
    navigate('/login'); // Redirect to login page
  };

  const handleDashboard = () => {
    navigate('/admin-dashboard', { state: { itemCount: menuItems.length } });
  };

  return (
    <div style={styles.userDashboard}>
      <div style={styles.headerContainer}>
        <h1 style={styles.header}>Manage Menu Items</h1>
        <div style={styles.headerButtons}>
        <button onClick={handleDashboard} style={styles.dashboardButton}>Admin Dashboard</button>
          <button onClick={handleManage} style={styles.manageButton}>Manage Menu Items</button>
          <button onClick={handleView} style={styles.viewButton}>View Menu Items</button>
          <button onClick={handleLogout} style={styles.logoutButton}>Logout</button>
        </div>
      </div>
      <div style={styles.content}>
        <input
          type="text"
          placeholder="Search menu items..."
          value={searchQuery}
          onChange={handleSearchChange}
          style={styles.searchBar}
        />
        <div style={styles.cardContainer}>
          {filteredItems.map(item => (
            <div key={item.id} style={styles.card}>
              <h2 style={styles.cardTitle}>{item.name}</h2>
              <p style={styles.cardDescription}>{item.description}</p>
              <p style={styles.cardPrice}>${item.price}</p>
              <p style={styles.cardCategory}>{item.category}</p>
              <div style={styles.cardActions}>
                <button onClick={() => handleEdit(item.id)} style={styles.editButton}>Edit</button>
                <button onClick={() => handleDelete(item.id)} style={styles.deleteButton}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const styles = {
  userDashboard: {
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
  headerContainer: {
    position: 'fixed', // Fix the header at the top
    top: 0,
    left: 0,
    right: 0,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#000', // Header color
    padding: '20px',
    borderRadius: '0 0 5px 5px', // Rounded corners at the bottom
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    zIndex: 1000, // Ensure header is above other content
  },
  header: {
    fontSize: '2rem',
    margin: 0, // Remove default margin
  },
  headerButtons: {
    display: 'flex',
    flexDirection: 'row',
    gap: '10px', // Space between buttons
    marginLeft: 'auto', // Push buttons to the right
  },
  dashboardButton: {
    backgroundColor: 'transparent',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    padding: '10px',
    cursor: 'pointer',
    fontSize: '1rem',
  },
  manageButton: {
    backgroundColor: 'transparent',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    padding: '10px',
    cursor: 'pointer',
    fontSize: '1rem',
  },
  viewButton: {
    backgroundColor: 'transparent',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    padding: '10px',
    cursor: 'pointer',
    fontSize: '1rem',
  },
  logoutButton: {
    backgroundColor: 'transparent',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    padding: '10px 20px',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'background-color 0.3s ease',
  },
  searchBar: {
    width: '100%',
    maxWidth: '500px',
    padding: '10px',
    margin: '20px 0',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '1rem',
  },
  content: {
    marginTop: '80px', // Adjust content margin to account for fixed header
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  cardContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#e1f6f4',
    opacity: '0.8',
    color: '#333',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    width: '300px',
    textAlign: 'center',
  },
  cardTitle: {
    fontSize: '1.5rem',
    marginBottom: '10px',
  },
  cardDescription: {
    fontSize: '1rem',
    marginBottom: '10px',
  },
  cardPrice: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  cardCategory: {
    fontSize: '1rem',
    marginBottom: '10px',
  },
  cardActions: {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
  },
  editButton: {
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    padding: '5px 10px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  deleteButton: {
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    padding: '5px 10px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
};

export default ManageMenuItems;
