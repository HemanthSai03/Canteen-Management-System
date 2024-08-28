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
import CartPage from './components/CartPage'; // Import CartPage
import { CartProvider }  from './CartContext'; // Import CartProvider

const App = () => {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          {/* Menu Management Routes */}
          <Route path="/menu-items" element={<MenuItemList />} />
          <Route path="/add-menu-item" element={<AddMenuItem />} />
          <Route path="/update-menu-item/:id" element={<UpdateMenuItem />} />
          <Route path="/delete-menu-item/:id" element={<DeleteMenuItem />} />
          {/* Cart Page Route */}
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </Router>
    </CartProvider>
  );
};

export default App;
