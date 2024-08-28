// src/components/Login.js
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_MUTATION } from '../graphql/mutations';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login, { loading, error }] = useMutation(LOGIN_MUTATION);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Execute the login mutation
      const { data } = await login({ variables: { email, password } });
      console.log('Login response data:', data);

      if (data && data.login) {
        const { token, role } = data.login;

        // Store the token in localStorage
        localStorage.setItem('token', token);

        // Redirect based on user role
        if (role === 'admin') {
          navigate('/admin-dashboard');
        } else {
          navigate('/landing'); // Redirect to the LandingPage for users
        }
      } else {
        // Handle the case where data or login field is undefined
        console.error('No login data returned.');
      }
    } catch (err) {
      console.error('Login error:', err);
      // Display a user-friendly error message
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
        </div>
        <div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Logging In...' : 'Login'}
        </button>
        {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}
      </form>
    </div>
  );
};

export default Login;
