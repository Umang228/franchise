import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Validation from './RegisterValidation';
import axios from 'axios';
import './style/register.css'
import loginimg from '../login.svg'




const RegisterPage = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
    confirmpass: '',

  });

  const [errors, setErrors] = useState({

  });

  const handleInput = (e) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(Validation(values));
    if (errors.name === "" && errors.email === "" && errors.password === "") {
      axios.post('http://localhost:8081/register', values)
        .then(res => {
          navigate('/');
        })
        .catch(err => console.log(err));
    }
  };




  return (
    <div className="login-page">
      <div className="left-side">
        <div className="circle">
        </div>
        <p>Already a member? <Link to="/">

          <button>

            Sign in
          </button></Link></p>
        <img src={loginimg} alt="login now" />
      </div>

      <div className="right-side-l">
        <h2>Register</h2>
        <form onSubmit={handleSubmit} className='right-form'>
          <label htmlFor="name">Name</label>
          <input
            type="text" // 
            placeholder="Enter Your Name"
            name="name"
            id='name'
            onChange={handleInput}
          />
          {errors.name && <span>{errors.name}</span>}
          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="Enter Your Email"
            name="email"
            id='email'
            onChange={handleInput}
          />
          {errors.email && <span>{errors.email}</span>}
          <label htmlFor="username">Username</label>
          <input
            type="text" // 
            placeholder="Enter Your Username"
            name="username"
            id='username'
            onChange={handleInput}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Enter Your Password"
            name="password"
            id='password'
            onChange={handleInput}
          />
          <label htmlFor="confirmpass">Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm Your Password"
            name="confirmpass"
            id='confirmpass'
            onChange={handleInput}
          />
          {errors.password && <span>{errors.password}</span>}

          <button type="submit">
            Register
          </button>


        </form>
      </div>

    </div>
  );
};

export default RegisterPage;
