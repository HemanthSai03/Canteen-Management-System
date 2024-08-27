// // src/components/UserDashboard.js
// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// const UserDashboard = () => {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     // Clear token and redirect
//     localStorage.removeItem('token');
//     navigate('/login');
//   };

//   return (
//     <div>
//       <h2>User Dashboard</h2>
//       <button onClick={handleLogout}>Logout</button>
//     </div>
//   );
// };

// export default UserDashboard;

import React from 'react';

const UserDashboard = () => {
  return <h1>Welcome to the User Dashboard</h1>;
};

export default UserDashboard;
