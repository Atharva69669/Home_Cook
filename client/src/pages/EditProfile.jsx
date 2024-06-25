import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCookies } from "react-cookie";

const EditProfile = () => {
  const [password, setPassword] = useState("");
  const [userAbout, setAbout] = useState(""); // State for about
  const [userPic, setUserImage] = useState(""); // State for user image
  const [cookies] = useCookies(['username']);

  const handleAboutChange = (event) => {
    // Handler for about change
    setAbout(event.target.value);
  };

  const handleUserImageChange = async (event) => {
    // Handler for user image change
    try {
      const file = event.target.files[0];
      const base64 = await convertToBase64(file);
      setUserImage(base64);
    } catch (error) {
      toast.error("Error converting image to base64:", error);
    }
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
        await toast.promise(
        axios.put(`https://backend2-21yc.onrender.com/edit`, {
          password,
          userAbout,
          userPic,
          username: cookies.username
        }),
        {
          pending: "Saving...",
          success: "Saved",
          error: "Error 404",
        }
      );
    } catch (error) {
      toast.error("Edit failed");
    }

    setPassword("");
    setAbout(""); // Reset about state after submission
    setUserImage(""); // Reset user image state after submission
  };

  // Function to convert image file to base64
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  return (
    <div className="login-container">
      <div className="image-column">
        <img
          src="https://cdn.loveandlemons.com/wp-content/uploads/2023/07/margherita-pizza-recipe.jpg"
          alt="Dish"
        />
      </div>
      <div className="form-column">
        <h2>Edit details</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="about">About:</label>
            <textarea id="about" value={userAbout} onChange={handleAboutChange} />
          </div>
          <div>
            <label htmlFor="userImage">User Image:</label>{" "}
            <input
              type="file"
              id="userImage"
              accept=".jpg"
              onChange={handleUserImageChange}
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
          <button type="submit">Save</button>
          <ToastContainer />
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
