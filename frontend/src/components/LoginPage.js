import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Validation from './LoginValidation';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import loginimg from '../login.svg'



const LoginPage = () => {
  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [, setCookie] = useCookies(['token']);
  const navigate = useNavigate();



axios.defaults.withCredentials = true;
  const handleInput = (e) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform validation
    const validationErrors = Validation(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      axios.post('http://localhost:8081/login', values)
        .then(res => {
          if (res.data.Status === 'Success') {
            const userRole = res.data.user.role; 

            const token = res.data.token;

            // Store token as a cookie
            setCookie('token', token, { path: '/' });
               // Navigate based on user role
          if (userRole === 'admin') {
            navigate('/admin/dashboard');
          } else if (userRole === 'franchise') {
            navigate('/franchise/dashboard');
          } else {
            navigate('/user/dashboard');
          }


          } else {
            console.log("Error:", res.data.Error);
          }
        })
        .catch(err => console.error("Error:", err));
    }
  };
  


  return (
    <div className="login-page">

      <div className="left-side">
        <div className="circle-c">
        </div>
        <p id='pr'>Not a member yet? <Link to="/register">
          <button>
          Register here
          </button>
          </Link></p>
        <img src={loginimg} alt="login now" />
      </div>

      <div className="right-side-l">

      <form onSubmit={handleSubmit} className='right-form' id='rl'>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleInput}
          id='email'
        />
        {errors.email && <span>{errors.email}</span>}
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id='password'
          placeholder="Password"
          onChange={handleInput}
        />

        {errors.password && <span>{errors.password}</span>}

        <button type="submit">
          Login
        </button>
      </form>
      </div>


    </div>
  );
};

export default LoginPage;
