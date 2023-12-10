import React from 'react';
import './style/nav.css';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import jwt_decode from 'jwt-decode'; 
import { CartProvider,useCart } from './admin/CartContext';

const Navbar = () => {
  const { addToCart } = useCart();
  const [cookies] = useCookies(['token']);
  let userName = null;

  // If token exists, decode it to get user information
  if (cookies.token) {
    const decodedToken = jwt_decode(cookies.token);
    userName = decodedToken.user?.name;
  }

  return (
    <CartProvider>
         <div className='navbar'>
      
      <div className="logo">
        <h2>
          UFranchise
        </h2>
      </div>
      <nav>
        <ul>
          <Link to="/">
            <li>Home</li>
          </Link>
          <Link to="/">
            <li>Products</li>
          </Link>
          <Link to="/">
            <li>About</li>
          </Link>
          <Link to="/">
            <li>Contact</li>
          </Link>
        </ul>
      </nav>

      <div className="btn">
        {userName ? (
          <span>Hi, {userName}</span>
        ) : (
          <>
            <Link to="/">
              <button>Login</button>
            </Link>
            <Link to="/register">
              <button>Register</button>
            </Link>
          </>
        )}
      </div>
    </div> 
    </CartProvider>

  );
};

export default Navbar;
