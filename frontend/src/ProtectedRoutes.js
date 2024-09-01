/**
 * The ProtectedRoute component checks if a user is authenticated and has the required role to access a
 * specific route, redirecting them if necessary.
 * @returns The `ProtectedRoute` component is returning either a `Navigate` component to redirect the
 * user to the login page if they are not authenticated, or to the home page if their role is not
 * allowed. If the user is authenticated and their role is allowed, it returns the `Component` passed
 * as a prop.
 */
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
