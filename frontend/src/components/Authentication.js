// Authentication.js
import { useCookies } from 'react-cookie';
import { Navigate, useLocation } from 'react-router-dom';

const Authentication = ({ children, allowedRoles }) => {
  const [cookies] = useCookies(['user']);
  const location = useLocation();

  const user = cookies.user;

  // Check if the user cookie exists
  if (user) {
    // Check if the user's role is included in the allowedRoles array
    if (allowedRoles && !allowedRoles.includes(user.role)) {
      // Redirect to the respective dashboard based on the user's role
      let targetDashboard;

      if (user.role === 'admin') {
        targetDashboard = '/admin/dashboard';
      } else if (user.role === 'franchise') {
        targetDashboard = '/franchise/dashboard';
      } else {
        targetDashboard = '/user/dashboard';
      }

      return <Navigate to={targetDashboard} />;
    }

    // Render the protected content if authenticated and authorized
    return children;
  }

   // If the user cookie does not exist, allow access to the register page
   if (location.pathname === '/register') {
    return children;
  }

  // If the user cookie does not exist, redirect to the login page
  if (location.pathname !== '/') {
    return <Navigate to="/" />;
  }

  // If the user cookie does not exist and they are on the login page, render the content
  return children;
};

export default Authentication;
