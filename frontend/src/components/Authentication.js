// Authentication.js
import { useCookies } from 'react-cookie';
import { Navigate, useLocation } from 'react-router-dom';

const Authentication = ({ children }) => {
  const [cookies] = useCookies(['token']);
  const location = useLocation();

  const token = cookies.token;


  // If the token does not exist, allow access to the login and register pages
  if (location.pathname === '/' || location.pathname === '/register') {
    return children;
  }

  // If the token does not exist and the user is on any other page, redirect to the login page
  return <Navigate to="/" />;
};

// Function to decode the token (you'll need to implement this)
const decodeToken = (token) => {
  // Implement token decoding logic here
  // For example:
  // const decodedToken = jwt_decode(token);
  // return decodedToken;
  return null;
};

export default Authentication;
