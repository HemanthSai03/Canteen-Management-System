import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../graphql/mutations';
import { useNavigate } from 'react-router-dom';

const lightModeStyles = {
  signupPage: {
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
  header: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    background: 'transparent',
    color: '#fff',
    padding: '10px 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 1000,
  },
  headerTitle: {
    margin: 0,
    fontSize: '1.5rem',
  },
  formContainer: {
    position: 'fixed',
    top: '60px',
    left: '20px',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: '20px',
    borderRadius: '10px',
    maxWidth: '300px',
    transform: 'translateY(-100%)',
    opacity: 0,
    transition: 'transform 1s ease, opacity 1s ease',
  },
  formContainerVisible: {
    transform: 'translateY(0)',
    opacity: 1,
  },
  formBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  },
  formLabel: {
    marginBottom: '10px',
    fontSize: '1rem',
    display: 'block',
  },
  formInput: {
    marginBottom: '10px',
    padding: '5px 10px',
    borderRadius: '5px',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    border: 'none',
    color: '#fff',
    fontSize: '1rem',
    width: '100%',
  },
  formButton: {
    padding: '5px 10px',
    borderRadius: '5px',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    border: 'none',
    color: '#fff',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  formButtonHover: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
  errorMessage: {
    color: 'red',
    fontSize: '1rem',
  },
};


const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user'); // Default role
  const [signup, { error, data }] = useMutation(CREATE_USER);
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Trigger the animation after a second
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);

    return () => clearTimeout(timer); // Clean up the timer
  }, []);

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

      <div style={{ 
        ...lightModeStyles.formContainer, 
        ...(isVisible ? lightModeStyles.formContainerVisible : {}) 
      }}>
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
