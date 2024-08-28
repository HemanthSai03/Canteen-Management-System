import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import UserDashboard from './components/UserDashboard';
import AdminDashboard from './components/AdminDashboard';
import MenuItemList from './components/MenuItemList';
import AddMenuItem from './components/AddMenuItem';
import UpdateMenuItem from './components/UpdateMenuItem'; // Example route usage
import DeleteMenuItem from './components/DeletMenuItem'; // Example route usage

const App = () => {
  return (
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
      </Routes>
    </Router>
  );
};

export default App;
