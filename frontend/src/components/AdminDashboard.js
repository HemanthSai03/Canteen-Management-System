/**
 * The `AdminDashboard` component in React manages menu items, allows adding, updating, and deleting
 * items, displays total item count, and provides navigation options.
 * @returns The `AdminDashboard` component is being returned. It contains JSX elements for displaying
 * an admin dashboard interface with features like managing menu items, viewing menu items,
 * adding/updating menu items, and logging out. The component includes form inputs for adding/updating
 * menu items, buttons for navigation, a carousel for displaying images, and styling for layout and
 * design.
 */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';

const AdminDashboard = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [editId, setEditId] = useState(null);
  const [itemCount, setItemCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMenuItemsCount = async () => {
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
                }
              }
            `,
          }),
        });

        const result = await response.json();
        if (result.errors) {
          console.error('Error fetching menu items:', result.errors);
        } else {
          setItemCount(result.data.menuItems.length);
        }
      } catch (err) {
        console.error('Network error fetching menu items:', err);
      }
    };

    fetchMenuItemsCount();
  }, []);

  const handleAddOrUpdate = async (e) => {
    e.preventDefault();

    const mutation = editId
      ? `
          mutation {
            updateMenuItem(id: "${editId}", menuItemInput: {
              name: "${name}",
              description: "${description}",
              price: ${price},
              category: "${category}"
            }) {
              id
              name
              description
              price
              category
            }
          }
        `
      : `
          mutation {
            addMenuItem(menuItemInput: {
              name: "${name}",
              description: "${description}",
              price: ${price},
              category: "${category}"
            }) {
              id
              name
              description
              price
              category
            }
          }
        `;

    try {
      const response = await fetch('http://localhost:4000/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: mutation }),
      });

      const result = await response.json();
      if (result.errors) {
        console.error('Error adding/updating menu item:', result.errors);
      } else {
        console.log('Menu item processed:', result.data);
        clearForm();
        setItemCount(editId ? itemCount : itemCount + 1);
      }
    } catch (err) {
      console.error('Network error adding/updating menu item:', err);
    }
  };

  const handleEdit = (item) => {
    setEditId(item.id);
    setName(item.name);
    setDescription(item.description);
    setPrice(item.price);
    setCategory(item.category);
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
        console.log('Menu item deleted');
        setItemCount(itemCount - 1);
      }
    } catch (err) {
      console.error('Network error deleting menu item:', err);
    }
  };

  const clearForm = () => {
    setName('');
    setDescription('');
    setPrice('');
    setCategory('');
    setEditId(null);
  };

  const handleLogout = () => {
    console.log('User logged out');
    window.location.href = '/login';
  };

  const navigateToManageMenuItems = () => {
    navigate('/manage-menu-items');
  };

  const navigateToViewMenuItems = () => {
    navigate('/view-menu-items');
  };

  return (
    <div style={styles.userDashboard}>
      <header style={styles.headerContainer}>
        <h1 style={styles.header}>Admin Dashboard</h1>
        <div style={styles.headerButtons}>
          <button onClick={navigateToManageMenuItems} style={styles.manageButton}>
            Manage Menu Items
          </button>
          <button onClick={navigateToViewMenuItems} style={styles.viewButton}>
            View Menu Items
          </button>
          <button onClick={handleLogout} style={styles.logoutButton}>Logout</button>
        </div>
      </header>

      <main style={styles.main}>
        <div style={styles.itemContainer}>
          <div style={styles.itemBox}>
            <p style={styles.itemCount}>Total Menu Items: {itemCount}</p>
          </div>
          <div style={styles.welcomeMessage}>
            <h2>Welcome To Canteen Management</h2>
            <p>This is your dashboard. You can add your menu items here.</p>
          </div>
        </div>

        <div style={styles.carouselContainer}>
          <Carousel style={styles.carousel}>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://www.avikalp.com/cdn/shop/products/MWZ3176_wallpaper1.jpg?v=1653194773"
                alt="First slide"
                style={styles.carouselImage}
              />
              <Carousel.Caption>
                <h3>Canteen Interior</h3>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://www.hotelierindia.com/public/styles/full_img_sml/public/images/2020/02/11/Cecconi's-Soho-House.jpg?OYxSvFyK"
                alt="Second slide"
                style={styles.carouselImage}
              />
              <Carousel.Caption>
                <h3>Canteen Outlet</h3>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://t3.ftcdn.net/jpg/05/70/58/64/240_F_570586447_Qac4sKftVudy34uwVpPjMMW2xeygNZAO.jpg"
                alt="Third slide"
                style={styles.carouselImage}
              />
              <Carousel.Caption>
                <h3>Famous Dish</h3>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </div>
      </main>

      <div style={styles.formContainer}>
        <h1 style={styles.formTitle}>Add Menu Items Here</h1>
        <form onSubmit={handleAddOrUpdate} style={styles.form}>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            placeholder="Name" 
            required 
            style={styles.input}
          />
          <input 
            type="text" 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            placeholder="Description" 
            required 
            style={styles.input}
          />
          <input 
            type="number" 
            value={price} 
            onChange={(e) => setPrice(e.target.value)} 
            placeholder="Price" 
            required 
            style={styles.input}
          />
          <input 
            type="text" 
            value={category} 
            onChange={(e) => setCategory(e.target.value)} 
            placeholder="Category" 
            required 
            style={styles.input}
          />
          <button type="submit" style={styles.submitButton}>
            {editId ? 'Update Menu Item' : 'Add Menu Item'}
          </button>
          {editId && <button type="button" onClick={clearForm} style={styles.cancelButton}>Cancel</button>}
        </form>
      </div>
    </div>
  );
};

const styles = {
  userDashboard: {
    fontFamily: 'Arial, sans-serif',
    lineHeight: 1.6,
    color: 'black',
    backgroundColor: 'rgb(174,182,191',
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
    color: '#fff',
  },
  headerButtons: {
    display: 'flex',
    flexDirection: 'row',
    gap: '10px',
    marginLeft: 'auto',
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
  formContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: '20px',
    borderRadius: '10px',
    maxWidth: '600px',
    margin: '50px auto',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
  },
  formTitle: {
    textAlign: 'center',
    marginBottom: '20px',
    color: `white`
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  input: {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  submitButton: {
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    padding: '10px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: 'bold',
    transition: 'background-color 0.3s ease, transform 0.2s ease',
  },
  cancelButton: {
    backgroundColor: '#6c757d',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    padding: '10px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: 'bold',
    transition: 'background-color 0.3s ease',
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
  main: {
    marginTop: '80px', // Adjust margin to account for the fixed header
  },
  itemContainer: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '20px',
    marginBottom: '20px',
  },
  itemBox: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: '10px 20px',
    borderRadius: '5px',
    flex: '1',
    maxWidth: '250px',
  },
  itemCount: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: '#fff',
  },
  welcomeMessage: {
    flex: '2',
  },
  carouselContainer: {
    marginTop: '20px',
  },
  carousel: {
    maxWidth: '100%',
  },
  carouselImage: {
    height: '400px', // Adjust height to decrease image size
    objectFit: 'cover', // Ensure image covers the area without distortion
  },
};

export default AdminDashboard;
