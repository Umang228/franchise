import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import jwt_decode from 'jwt-decode';

const Authentication = ({ children, allowedRoles }) => {
  const location = useLocation();
  const [cookies] = useCookies(['token']);
  const [token, setToken] = useState(cookies.token);
  const navigate = useNavigate();

  useEffect(() => {
    // Update token state when the cookie changes
    setToken(cookies.token);
  }, [cookies.token]);

  useEffect(() => {
    if (!token && location.pathname !== '/' && location.pathname !== '/register') {
      // Redirect to login if token is null (cookie was deleted)
      navigate('/');
    } else {
      try {
        if (token) {
          const decodedToken = jwt_decode(token);
          const userRole = decodedToken.user.role;
  
          if (Date.now() < decodedToken.exp * 1000) {
            // Redirect to the respective dashboard based on the user's role
            let targetDashboard;
            if (userRole === 'admin') {
              targetDashboard = '/admin/dashboard';
            } else if (userRole === 'franchise') {
              targetDashboard = '/franchise/dashboard';
            } else {
              targetDashboard = '/user/dashboard';
            }
            navigate(targetDashboard);
          } else {
            // Token expired, redirect to login
            navigate('/');
          }
        }
      } catch (error) {
        console.error('Error decoding token:', error);
        // Handle invalid token error here
        navigate('/');
      }
    }
  }, [token, location.pathname, navigate]);
  

  // Allow access to the register and login pages if no token
  if (location.pathname === '/' || location.pathname === '/register') {
    return children;
  }

  // Check if the user role matches the allowedRoles
  const decodedToken = token ? jwt_decode(token) : null;
  const userRole = decodedToken ? decodedToken.user.role : null;
  if (userRole && allowedRoles.includes(userRole)) {
    return children;
  }

  // Redirect to the respective dashboard based on the user's role
  let targetDashboard;
  if (userRole === 'admin') {
    targetDashboard = '/admin/dashboard';
  } else if (userRole === 'franchise') {
    targetDashboard = '/franchise/dashboard';
  } else {
    targetDashboard = '/user/dashboard';
  }

  return <Navigate to={targetDashboard} />;
};

export default Authentication;
