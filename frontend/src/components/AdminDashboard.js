// // src/components/AdminDashboard.js
// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// const AdminDashboard = () => {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     // Clear token and redirect
//     localStorage.removeItem('token');
//     navigate('/login');
//   };

//   return (
//     <div>
//       <h2>Admin Dashboard</h2>
//       <button onClick={handleLogout}>Logout</button>
//     </div>
//   );
// };

// export default AdminDashboard;

import React from 'react';

const AdminDashboard = () => {
  return <h1>Welcome to the Admin Dashboard</h1>;
};

export default AdminDashboard;
