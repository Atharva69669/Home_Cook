import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useCookies } from "react-cookie";
import "../styles/Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cookies, setCookies] = useCookies();
  const nav=useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const isValidEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return !emailPattern.test(email); // Return true if email is invalid
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (isValidEmail(email)) {
        throw new Error("Enter valid email address");
      }
      const response = await toast.promise(
        axios.post("https://backend2-21yc.onrender.com/login", {
          email,
          password,
        }),
        {
          pending: "Logging in...",
          success: "Logged in",
          error: "Invalid Credentials",
        }
      );

      if (response.data.access_token) {
        setCookies("XYZ", response.data.access_token);
        setCookies("username", response.data.username);
      }
    } catch (error) {
      toast.error(error);
    }

    setEmail("");
    setPassword("");
  };

  useEffect(()=>{
   if(cookies.username && cookies.XYZ){
    nav('/')
   }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return (
    <div className="login-container">
      <div className="image-column">
        <img
          src="https://cdn.loveandlemons.com/wp-content/uploads/2023/07/margherita-pizza-recipe.jpg"
          alt="Dish"
        />
      </div>
      <div className="form-column">
        <h2>Login</h2>
        <p>Log in to save and review your favorite recipes.</p>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>
          <button type="submit">Login</button>
          <div className="signup">
            <Link to="/register">Don't have an account? Join now</Link>
          </div>
          <ToastContainer />
        </form>
      </div>
    </div>
  );
};

export default Login;
