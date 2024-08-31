import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../src/UseContext';

const ProtectedRoute = ({ element: Component, allowedRoles = [] }) => {
  const { user } = useUser();
  
  if (!user) {
    // If the user is not authenticated, redirect to login
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.length && !allowedRoles.includes(user.role)) {
    // If the user role is not in allowedRoles, redirect to home or an error page
    return <Navigate to="/" replace />;
  }

  return <Component />;
};

export default ProtectedRoute;
