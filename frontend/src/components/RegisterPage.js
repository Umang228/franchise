import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./style/register.css";
import loginimg from "../login.svg";

const RegisterPage = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    confirmpass: "",
  });

  const [emailError, setEmailError] = useState("");

  const handleInput = (e) => {
    const inputName = e.target.name;
    const inputValue = e.target.value;
    setValues((prev) => ({ ...prev, [inputName]: inputValue }));

    // Email validation
    if (inputName === "email") {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const isValidEmail = emailPattern.test(inputValue);
      setEmailError(isValidEmail ? "" : "Please enter a valid email address");
    }
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check for email validation error
    if (emailError) {
      return;
    }
    // Check if password and confirm password match
    if (values.password !== values.confirmpass) {
      alert("Passwords do not match");
      return;
    }

    axios
      .post("http://localhost:8081/register", values)
      .then((res) => {
        navigate("/");
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
        <div className="circle"></div>
        <p>
          Already a member?{" "}
          <Link to="/">
            <button>Sign in</button>
          </Link>
        </p>
        <img src={loginimg} alt="login now" />
      </div>

      <div className="right-side-l">
        <h2>Register</h2>
        <form onSubmit={handleSubmit} className="right-form">
          <label htmlFor="name">Name</label>
          <input
            type="text" //
            placeholder="Enter Your Name"
            name="name"
            id="name"
            onChange={handleInput}
            required
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="Enter Your Email"
            name="email"
            id="email"
            onChange={handleInput}
            required
          />
          {emailError && <span className="error">{emailError}</span>}

          <label htmlFor="username">Username</label>
          <input
            type="text"
            placeholder="Enter Your Username"
            name="username"
            id="username"
            onChange={handleInput}
            required
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Enter Your Password"
            name="password"
            id="password"
            onChange={handleInput}
            required
          />
          <label htmlFor="confirmpass">Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm Your Password"
            name="confirmpass"
            id="confirmpass"
            onChange={handleInput}
            required
          />

          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
