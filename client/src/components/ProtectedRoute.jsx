import { Navigate, Outlet } from 'react-router-dom';

// Define the ProtectedRoute component
const ProtectedRoute = () => {
  const token = localStorage.getItem('token'); // Retrieve the token from local storage

  // Check if the token exists
  if (!token) {
    return <Navigate to="/login" />; // Redirect to login page if no token
  }

  return <Outlet />; // Render the nested routes if the token exists
};

export default ProtectedRoute;
