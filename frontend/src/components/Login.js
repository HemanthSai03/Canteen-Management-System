import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_MUTATION } from '../graphql/mutations';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../UseContext';

const lightModeStyles = {
  loginPage: {
    fontFamily: 'Arial, sans-serif',
    lineHeight: 1.6,
    color: '#fff', // Light text color
    backgroundColor: '#333', // Dark background color
    backgroundImage: 'url(https://wallpapers.com/images/hd/paella-dish-with-veggies-on-board-0ey63p78wcip8k67.jpg)', // Background image URL
    backgroundSize: 'cover', // Cover the entire background
    backgroundPosition: 'center', // Center the background image
    minHeight: '100vh', // Ensure the loginPage covers the full viewport height
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
  formContainer: {
    position: 'fixed', // Fix the container to the left corner
    top: '60px', // Position below the header
    left: '20px',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    padding: '20px',
    borderRadius: '10px', // Round the corners
    maxWidth: '300px', // Limit the width of the container
    opacity: 0, // Start hidden
    transform: 'translateY(-50px)', // Start above the viewport
    transition: 'opacity 0.5s ease, transform 0.5s ease', // Transition properties
  },
  formContainerVisible: {
    opacity: 1, // Fully visible
    transform: 'translateY(0)', // Move to its final position
  },
  formLabel: {
    marginBottom: '10px',
    fontSize: '1rem', // Decrease font size
    display: 'block',
  },
  formInput: {
    marginBottom: '10px',
    padding: '5px 10px', // Decrease padding for smaller buttons
    borderRadius: '5px', // Round the corners
    backgroundColor: 'rgba(255, 255, 255, 0.2)', // Semi-transparent background
    border: 'none',
    color: '#fff',
    fontSize: '1rem', // Decrease font size
    width: '100%',
  },
  formButton: {
    padding: '5px 10px', // Decrease padding for smaller buttons
    borderRadius: '5px', // Round the corners
    backgroundColor: 'rgba(255, 255, 255, 0.2)', // Semi-transparent background
    border: 'none',
    color: '#fff',
    fontSize: '1rem', // Decrease font size
    cursor: 'pointer',
    transition: 'background-color 0.3s ease', // Smooth transition for hover effect
  },
  formButtonHover: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)', // Change background color on hover
  },
  errorMessage: {
    color: 'red',
    fontSize: '1rem', // Decrease font size
  },
};

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login, { loading, error }] = useMutation(LOGIN_MUTATION);
  const navigate = useNavigate();
  const { setUser } = useUser();

  const [formVisible, setFormVisible] = useState(false);

  useEffect(() => {
    // Show the form with a delay
    const timer = setTimeout(() => {
      setFormVisible(true);
    }, 1000); // Delay of 1 second

    return () => clearTimeout(timer);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const { data } = await login({ variables: { email, password } });
      
      if (data && data.login) {
        const { token, role } = data.login;
  
        localStorage.setItem('token', token);
        localStorage.setItem('role', role);
  
        setUser({ role });
  
        if (role === 'admin') {
          navigate('/admin-dashboard');
        } else {
          navigate('/landing');
        }
      } else {
        console.error('No login data returned.');
      }
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  return (
    <div style={lightModeStyles.loginPage}>
      <header style={lightModeStyles.header}>
        <h1 style={lightModeStyles.headerTitle}>Login</h1>
      </header>

      <div
        style={{
          ...lightModeStyles.formContainer,
          ...(formVisible ? lightModeStyles.formContainerVisible : {}),
        }}
      >
        <form onSubmit={handleLogin}>
          <label style={lightModeStyles.formLabel}>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              style={lightModeStyles.formInput}
            />
          </label>
          <label style={lightModeStyles.formLabel}>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              style={lightModeStyles.formInput}
            />
          </label>
          <button type="submit" disabled={loading} style={lightModeStyles.formButton}>
            {loading ? 'Logging In...' : 'Login'}
          </button>
          {error && <p style={lightModeStyles.errorMessage}>Error: {error.message}</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;
