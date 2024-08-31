import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import UserDashboard from './components/UserDashboard';
import AdminDashboard from './components/AdminDashboard';
import MenuItemList from './components/MenuItemList';
import AddMenuItem from './components/AddMenuItem';
import UpdateMenuItem from './components/UpdateMenuItem';
import DeleteMenuItem from './components/DeletMenuItem';
import ContactUs from './components/ContactUs';
import CartPage from './components/CartPage';
import { CartProvider } from './CartContext';
import LandingPage from './components/LandingPage';
import HomePage from './components/HomePage';
import ManageMenuItems from './components/ManageMenuItems';
import EditMenuItem from './components/EditMenuItem';
import ViewMenuItems from './components/ViewMenuItem';
import ProtectedRoute from '../src/ProtectedRoutes';

const App = () => {
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/user-dashboard"
            element={<ProtectedRoute element={UserDashboard} allowedRoles={['user']} />}
          />
          <Route
            path="/admin-dashboard"
            element={<ProtectedRoute element={AdminDashboard} allowedRoles={['admin']} />}
          />
          <Route
            path="/manage-menu-items"
            element={<ProtectedRoute element={ManageMenuItems} allowedRoles={['admin']} />}
          />
          <Route
            path="/edit-menu-item/:id"
            element={<ProtectedRoute element={EditMenuItem} allowedRoles={['admin']} />}
          />
          <Route
            path="/view-menu-items"
            element={<ProtectedRoute element={ViewMenuItems} allowedRoles={['user', 'admin']} />}
          />
          <Route
            path="/menu-items"
            element={<ProtectedRoute element={MenuItemList} allowedRoles={['user', 'admin']} />}
          />
          <Route
            path="/add-menu-item"
            element={<ProtectedRoute element={AddMenuItem} allowedRoles={['admin']} />}
          />
          <Route
            path="/update-menu-item/:id"
            element={<ProtectedRoute element={UpdateMenuItem} allowedRoles={['admin']} />}
          />
          <Route
            path="/delete-menu-item/:id"
            element={<ProtectedRoute element={DeleteMenuItem} allowedRoles={['admin']} />}
          />
          <Route
            path="/cart"
            element={<ProtectedRoute element={CartPage} allowedRoles={['user']} />}
          />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/landing" element={<LandingPage />} />
        </Routes>
      </Router>
    </CartProvider>
  );
};

export default App;
