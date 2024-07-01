import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import "./NavBar.css"; // Import custom CSS file for styling

const NavBar = () => {
  const location = useLocation(); // Hook to get the current location
  const navigate = useNavigate(); // Hook to perform navigation

  // Retrieve the logged-in user's information from localStorage
  const user = JSON.parse(localStorage.getItem("registeredUser"));

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove the token from localStorage
    navigate("/main"); // Redirect to the login page
  };

  // Define navigation links
  const navLinks = [
    { to: "/products", text: "Products" },
    { to: "/about", text: "About Us" },
    { to: "/contact", text: "Contact Us" },
    { to: "/cart", text: "My Cart" },
  ];

  // Hide NavBar on specific pages
  if (
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname === "/main"
  ) {
    return null; // Return null to render nothing on these pages
  }

  return (
    <header className="navbar-container">
      {/* Logo */}
      <div className="logo">
        <img
          src="https://img.freepik.com/premium-vector/design-sports-logo-jahgsport-shoe-store-specializing-athletic-footwear-logo_764382-7809.jpg"
          alt="logo"
          style={{ width: "4vw", height: "8vh", marginTop: "0rem" }}
        />
      </div>

      {/* Navigation Links */}
      <nav className="nav-links">
        <ul>
          {/* Mapping over navLinks array to dynamically render NavItem components */}
          {navLinks.map((link, index) => (
            <NavItem
              key={index}
              to={link.to}
              currentPath={location.pathname}
              text={link.text}
            />
          ))}
        </ul>
      </nav>

      {/* Display logged-in user's name and Logout Button only if not on the homepage */}
      {user && location.pathname !== "/main" && (
        <div className="user-actions">
          <span className="username">
            <FontAwesomeIcon icon={faUser} className="user-icon" />{" "}
            {/* Font Awesome icon */}
            Welcome, {user.firstName}
          </span>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    </header>
  );
};

// Custom NavItem component to handle active link styling
const NavItem = ({ to, currentPath, text }) => {
  const isActive = currentPath === to; // Check if the current path matches the link
  const linkClass = isActive ? "active" : ""; // Apply "active" class if isActive is true

  return (
    <li className={`nav-item ${linkClass}`}>
      <Link to={to}>{text}</Link> {/* Link component from react-router-dom */}
    </li>
  );
};

export default NavBar;
