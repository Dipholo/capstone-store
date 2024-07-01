import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"; // Import Link component from react-router-dom for navigation
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import FontAwesomeIcon component for using icons
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons"; // Import cart icon from FontAwesome

import "./TotalPrice.css"; // Import custom CSS for TotalPrice component

const TotalPrice = ({ totalPrice }) => {
  const location = useLocation(); // Hook to get the current location
  const navigate = useNavigate(); // Hook to perform navigation

  // Hide totalprice on specific pages
  if (
    location.pathname === "/cart" ||
    location.pathname === "/contact" ||
    location.pathname === "/about" ||
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname === "/main"
  ) {
    return null; // Return null to render nothing on these pages
  }
  return (
    <div
      style={{
        width: "12vw",
        marginLeft: "0vw",
        borderRadius: "100px",
        position: "fixed",
        zIndex: "1000",
      }}
    >
      <Link to="/cart" className="btn btn-secondary">
        {" "}
        {/* Link to Cart page */}
        Cashout {/* Text displayed for the link */}
        <FontAwesomeIcon icon={faShoppingCart} className="cart-icon" />{" "}
        {/* Cart icon from FontAwesome */}R{totalPrice.toFixed(2)}{" "}
        {/* Display total price formatted with two decimal places */}
      </Link>
    </div>
  );
};

export default TotalPrice;
