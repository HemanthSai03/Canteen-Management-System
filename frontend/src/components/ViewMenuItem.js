/**
 * The `ViewMenuItems` component in React fetches and displays a list of menu items, with options to
 * manage, view, navigate to the admin dashboard, and logout.
 * @returns The `ViewMenuItems` component is being returned. It is a functional component that displays
 * a list of menu items fetched from a GraphQL endpoint. The component includes header buttons for
 * managing menu items, viewing menu items, accessing the admin dashboard, and logging out. The menu
 * items are displayed in a table format with columns for name, description, price, and category. If
 * there are no menu items available
 */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ViewMenuItems = () => {
  const [menuItems, setMenuItems] = useState([]);
  const navigate = useNavigate();

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

  const handleManage = () => {
    navigate('/manage-menu-items');
  };

  const handleView = () => {
    navigate('/view-menu-items');
  };

  const handleLogout = () => {
    navigate('/login');
  };

  const handleDashboard = () => {
    navigate('/admin-dashboard', { state: { itemCount: menuItems.length } });
  };

  return (
    <div style={styles.container}>
      <div style={styles.headerContainer}>
        <h1 style={styles.header}>Menu Items</h1>
        <div style={styles.headerButtons}>
          <button onClick={handleManage} style={styles.manageButton}>Manage Menu Items</button>
          <button onClick={handleView} style={styles.viewButton}>View Menu Items</button>
          <button onClick={handleDashboard} style={styles.dashboardButton}>Admin Dashboard</button>
          <button onClick={handleLogout} style={styles.logoutButton}>Logout</button>
        </div>
      </div>
      <div style={styles.content}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Description</th>
              <th style={styles.th}>Price</th>
              <th style={styles.th}>Category</th>
            </tr>
          </thead>
          <tbody>
            {menuItems.length > 0 ? (
              menuItems.map(item => (
                <tr key={item.id}>
                  <td style={styles.td}>{item.name}</td>
                  <td style={styles.td}>{item.description}</td>
                  <td style={styles.td}>${item.price}</td>
                  <td style={styles.td}>{item.category}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={styles.td}>No menu items available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const styles = {
  container: {
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
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#000',
    padding: '20px',
    borderRadius: '0 0 5px 5px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    zIndex: 1000,
  },
  header: {
    fontSize: '2rem',
    margin: 0,
  },
  headerButtons: {
    display: 'flex',
    flexDirection: 'row',
    gap: '10px',
    marginLeft: 'auto',
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
  dashboardButton: {
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
  content: {
    marginTop: '80px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  th: {
    backgroundColor: '#007bff',
    color: 'black',
    padding: '10px',
    textAlign: 'left',
  },
  td: {
    padding: '10px',
    borderBottom: '1px solid #ddd',
    backgroundColor: 'white',
    color: 'black',
  },
};

export default ViewMenuItems;
