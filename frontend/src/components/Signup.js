// src/components/Signup.js
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../graphql/mutations';
import { useNavigate } from 'react-router-dom';

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
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Role:
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </label>
        <br />
        <button type="submit">Signup</button>
        {error && <p style={{ color: 'red' }}>{error.message}</p>}
      </form>
    </div>
  );
};

export default Signup;
