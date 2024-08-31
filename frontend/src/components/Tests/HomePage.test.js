import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import HomePage from '../HomePage'; // Adjust the import path as needed

// Helper component to wrap HomePage with Router
const renderWithRouter = (ui) => {
  return render(<Router>{ui}</Router>);
};

describe('HomePage', () => {
  test('renders the header with the correct title', () => {
    renderWithRouter(<HomePage />);
    const headerTitle = screen.getByText(/Canteen Management/i);
    expect(headerTitle).toBeInTheDocument();
  });

  test('renders the welcome message', () => {
    renderWithRouter(<HomePage />);
    const welcomeMessage = screen.getByText(/Welcome to Our Canteen/i);
    expect(welcomeMessage).toBeInTheDocument();
  });

  test('renders the Login link', () => {
    renderWithRouter(<HomePage />);
    const loginLink = screen.getByText(/Login/i);
    expect(loginLink).toBeInTheDocument();
  });
});
