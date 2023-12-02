import React, { useState, useEffect } from 'react'; 
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import loginimg from '../login.svg'



const LoginPage = () => {
  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const [emailError, setEmailError] = useState("");
  const [, setCookie] = useCookies(['token']);
  const navigate = useNavigate();



  const handleInput = (e) => {
    const inputName = e.target.name;
    const inputValue = e.target.value;
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
     // Email validation
     if (inputName === "email") {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const isValidEmail = emailPattern.test(inputValue);
      setEmailError(isValidEmail ? "" : "Please enter a valid email address");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
     // Check for email validation error
     if (emailError) {
      return;
    }
  
      axios.post('http://localhost:8081/login', values)
        .then(res => {
          if (res.data.Status === 'Success') {
            const userRole = res.data.user.role;
            const token = res.data.token;
            setCookie('token', token, { path: '/', maxAge: 7200 });
            localStorage.setItem('token',token)
            console.log('Token stored in localStorage:', localStorage.getItem('token'));
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            console.log('Axios headers set with token:', axios.defaults.headers.common['Authorization']);
            
  
            // Navigate based on user role
            if (userRole === 'admin') {
              navigate('/homepage');
            } else if (userRole === 'franchise') {
              navigate('/homepage');
            } else {
              navigate('/homepage');
            }
          } else {
            console.log("Error:", res.data.Error);
          }
        })
        .catch((error) => {
          if (error.response) {
            // Show the error message in an alert
            alert(error.response.data.Error);
          } else if (error.request) {
            // The request was made but no response was received
            console.log("No response received from the server");
          } else {
            // Something happened in setting up the request that triggered an error
            console.log("Error:", error.message);
          }
        });
    
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
          required
        />
        {emailError && <span className="error">{emailError}</span>}

        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id='password'
          placeholder="Password"
          onChange={handleInput}
          required
        />

        <button type="submit">
          Login
        </button>
      </form>
      </div>


    </div>
  );
};

export default LoginPage;
