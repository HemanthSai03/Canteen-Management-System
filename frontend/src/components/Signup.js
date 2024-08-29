import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../graphql/mutations';
import { useNavigate } from 'react-router-dom';

const lightModeStyles = {
  signupPage: {
    fontFamily: 'Arial, sans-serif',
    lineHeight: 1.6,
    color: '#fff', // Light text color
    backgroundColor: '#333', // Dark background color
    backgroundImage: 'url(https://wallpapers.com/images/hd/paella-dish-with-veggies-on-board-0ey63p78wcip8k67.jpg)', // Background image URL
    backgroundSize: 'cover', // Cover the entire background
    backgroundPosition: 'center', // Center the background image
    minHeight: '100vh', // Ensure the signupPage covers the full viewport height
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

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user'); // Default role
  const [signup, { error, data }] = useMutation(CREATE_USER);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await signup({
        variables: {
          userInput: { username, email, password, role }
        }
      });

      // Check if data returned from mutation is as expected
      if (data && data.createUser) {
        console.log('User created:', data.createUser);
        navigate('/login');
      }
    } catch (err) {
      console.error('Signup error:', err.message);
    }
  };

  return (
    <div style={lightModeStyles.signupPage}>
      <header style={lightModeStyles.header}>
        <h1 style={lightModeStyles.headerTitle}>Signup</h1>
      </header>

      <div style={lightModeStyles.formContainer}>
        <form onSubmit={handleSubmit}>
          <label style={lightModeStyles.formLabel}>
            Username:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={lightModeStyles.formInput}
            />
          </label>
          <label style={lightModeStyles.formLabel}>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              required
              style={lightModeStyles.formInput}
            />
          </label>
          <label style={lightModeStyles.formLabel}>
            Role:
            <select value={role} onChange={(e) => setRole(e.target.value)} style={lightModeStyles.formInput}>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </label>
          <button type="submit" style={lightModeStyles.formButton}>Signup</button>
          {error && <p style={lightModeStyles.errorMessage}>{error.message}</p>}
        </form>
      </div>
    </div>
  );
};

export default Signup;
