import React from 'react'
import './style/nav.css'
import { Link } from 'react-router-dom';
const Navbar = () => {
    return (
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
            <Link to="/">
                <button>Login</button>
            </Link>
            <Link to="/register">
                <button>Register</button>
            </Link>
            </div>

        </div>
    )
}

export default Navbar