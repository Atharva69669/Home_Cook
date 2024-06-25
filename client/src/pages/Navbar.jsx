import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import "../styles/Navbar.css";


const Navbar = () => {
  const [cookies] = useCookies(["XYZ", "username"]);
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };



  const categories = [
    {
      name: "Meals",
      subcategories: [
        "Breakfast",
        "Brunch",
        "Lunch",
        "Healthy",
        "Appetizers",
        "Snacks",
        "Salads",
        "Side Dishes",
        "Soups",
        "Bread",
        "Drinks",
        "Desserts",
      ],
    },
    {
      name: "Cuisines",
      subcategories: [
        "Mexican",
        "Italian",
        "Chinese",
        "Indian",
        "German",
        "Greek",
        "Filipino",
        "Japanese",
      ],
    },
    {
      name: "Ingredients",
      subcategories: [
        "Chicken",
        "Rice",
        "Cheese",
        "Bread",
        "Seafood",
        "Pasta",
        "Fruits",
        "Vegetables",
      ],
    },
    {
      name: "Ocassions",
      subcategories: [
        "Diwali",
        "Holi",
        "Christmas",
        "New Year",
        "Onam",
        "Makar Sankranti",
        "Ganesh Chathurti",
      ],
    },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="logo-link">
          <div className="logo">
            <img
              className="logo-image"
              src="https://cdn.vectorstock.com/i/preview-1x/73/82/food-logo-vector-38377382.jpg"
              alt="Home Cook Logo"
            />
            <div className="logo-text">Home Cook</div>
          </div>
        </Link>
        <div
          className={`hamburger ${isOpen ? "active" : ""}`}
          onClick={toggleNavbar}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>

        <ul className={`nav-menu ${isOpen ? "active" : ""}`}>
          <li>
            <Link to="/all" style={{textDecoration:"none",color:"black"}}>Explore</Link>
          </li>
          {categories.map((category, index) => (
            <li key={index} className="dropdown">
              <span className="dropdown-btn">{category.name}</span>
              <div className="dropdown-content">
                {category.subcategories.map((subcategory, subIndex) => (
                  <Link
                    key={subIndex}
                    to={`/${category.name.toLowerCase()}/${subcategory}`}
                  >
                    {subcategory}
                  </Link>
                ))}
              </div>
            </li>
          ))}

          <li>
            {!cookies.XYZ ? (
              <Link to="/login" style={{textDecoration:"none"}}>Login</Link>
            ) : (
              <Link to={`/userprofile/${cookies.username}`}>
                <div className="navbar-user-pic">
                  <img
                    src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg"
                    alt="User Profile"
                  />
                </div>
              </Link>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
