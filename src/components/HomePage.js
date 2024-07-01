import React from "react";
import { Link } from "react-router-dom";
import "./HomePage.css"; // Custom CSS for HomePage

const HomePage = () => {
  return (
    <div className="main-container">
    
      {/* Call to Action buttons */}
      <div className="cta-buttons">
        <Link
          to="/login"
          className="btn btn-primary mr-3"
          style={{ width: "10vw", marginLeft: "70vw" }}
        >
          Login
        </Link>
        <Link
          to="/register"
          className="btn btn-secondary"
          style={{ width: "10vw", marginLeft: "3vw" }}
        >
          Register
        </Link>
      </div>

      {/* Main content section */}
      <div className="homepage-container">
        {/* Left content */}
        <div className="content-left">
          <div className="discount-heading">
            <h2 className="discount-title">20% OFF</h2>
            <h2 className="discount-subtitle">ON EVERYTHING</h2>
          </div>
          <p className="discount-description">
            Explore our exclusive collection featuring the latest trends and
            timeless classics. Enjoy a special 20% discount across our entire
            range, available for a limited time only. Whether you're searching
            for stylish apparel, elegant accessories, or unique gifts, our
            curated selection ensures you find exactly what you need. Embrace
            effortless style and exceptional quality with every purchase. Shop
            now to discover the perfect blend of fashion and value at your
            fingertips.
          </p>
          <Link
            to="/login"
            className="btn btn-primary mr-3"
            style={{ width: "10vw", marginTop: "10vh" }}
          >
            Get Started
          </Link>
        </div>

        {/* Right image */}
        <div className="image-right">
          <img
            src="https://s3.amazonaws.com/static.northpass.com/Cin7/categories+images/Category+Icon+1.png"
            alt="Smiling Person"
            className="person-image"
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
