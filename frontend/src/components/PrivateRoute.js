// src/components/PrivateRoute.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ component: Component, role, ...rest }) => {
  const token = localStorage.getItem('token');
  const userRole = /* Decode JWT token and get user role */;

  return (
    <Route
      {...rest}
      render={(props) =>
        token && (role === userRole || role === 'user') ? (
          <Component {...props} />
        ) : (
          <Navigate to="/login" />
        )
      }
    />
  );
};

export default PrivateRoute;
