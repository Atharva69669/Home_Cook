import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Register.css";
import { useEffect } from "react";
import { useCookies } from "react-cookie";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [cookies,setCookies]=useCookies(['XYZ','username'])
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const nav=useNavigate();;

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleOtpChange = (event) => {
    setOtp(event.target.value);
  };

  const handleSendOtp = async () => {
    try {
      if (!email) {
        throw new Error("Please enter your email");
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new Error("Please enter a valid email address");
      }

      await toast.promise(
        axios.post("https://backend2-21yc.onrender.com/sendotp", { email }),
        {
          pending: "Sending OTP...",
          success: "OTP sent successfully!",
          error: "Recheck your email address",
        }
      );
      setShowOtpInput(true);
    } catch (error) {
      toast.error(error.message);
    }
  };
  const handleLogin = async () => {
    try {
        const response = await toast.promise(
            axios.post('https://backend2-21yc.onrender.com/login', {
                email,
                password
            }),
            {
                pending: 'Logging in...',
                success: 'Logged in',
                error: 'Invalid Credentials'
            }
        );
        if (response.data.access_token) {
            setCookies('XYZ', response.data.access_token);
            setCookies('username', response.data.username);
        }
    } catch (error) {
        toast.error(error);
    }
};

  const handleSignup = async () => {
    try {
      if (!username || !password || !email || !otp) {
        toast.error("Please enter all fields");
      }
      await toast.promise(
        axios.post("https://backend2-21yc.onrender.com/signup", {
          username,
          password,
          email,
          otp,
        }),
        {
          pending: "Signing up...",
          success: "Signup successful!",
          error: "Signup failed",
        }
      );
      await handleLogin();
      nav('/');
    } 
    catch (error) {
      toast.error(error.message);
    }
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
          src="https://www.skinnytaste.com/wp-content/uploads/2020/05/Margherita-Pizza-1-3.jpg"
          alt="Dish"
        />
      </div>
      <div className="form-column">
        <h2>Signup</h2>
        <form>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          {showOtpInput && (
            <>
              <div>
                <label htmlFor="username">Set Username:</label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={handleUsernameChange}
                />
              </div>
              <div>
                <label htmlFor="password">Set Password:</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </div>
              <div>
                <label htmlFor="otp">Enter OTP:</label>
                <input
                  type="text"
                  id="otp"
                  value={otp}
                  onChange={handleOtpChange}
                />
              </div>
            </>
          )}
          <button
            type="button"
            onClick={showOtpInput ? handleSignup : handleSendOtp}
          >
            {showOtpInput ? "Signup" : "Send OTP"}
          </button>
          <div className="signup">
            <Link to="/login">Already have an account? Login</Link>
          </div>
          <ToastContainer />
        </form>
      </div>
    </div>
  );
};

export default Register;
