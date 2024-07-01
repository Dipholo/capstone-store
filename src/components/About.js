// About.js
import React from "react";
import { Figure, Button } from "react-bootstrap";
import "./About.css"; // Import custom CSS for About page
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import { Link, useLocation, useNavigate } from "react-router-dom"; // Import routing functionalities

// About component with handleBuy prop
const About = ({ handleBuy }) => {
  const navigate = useNavigate(); // Hook to navigate programmatically

  // Function to simulate a purchase
  const handleTestBuy = () => {
    handleBuy(0); // Simulate a purchase to make TotalPrice visible
  };

  // Function to redirect to the products page
  const handleExplore = () => {
    navigate("/products"); // Redirect to products page
  };

  return (
    <div className="about-page">
      {" "}
      {/* Container for About page */}
      <div className="about-content">
        {" "}
        {/* Container for About content */}
        <h2 className="about-heading">Discover Our Story</h2>{" "}
        {/* Heading for the About section */}
        <p className="about-description">
          {/* Description of the store layout and product range */}
          Explore our spacious and modern store layout, thoughtfully designed to
          make your shopping experience seamless and enjoyable. Our shelves are
          stocked with a diverse range of products, from everyday essentials to
          exclusive items that enhance your lifestyle. Each product is carefully
          selected to meet the highest standards of quality, ensuring that you
          receive the best value for your money.
        </p>
        <Figure className="about-image">
          {" "}
          {/* Image figure for the store */}
          <Figure.Image
            width={600}
            height={400}
            alt="Our Store"
            src="https://th.bing.com/th/id/R.954748c88bd13a82fc239ace06b58d12?rik=wKWAuvi2olBN%2fw&riu=http%3a%2f%2fimages.solecollector.com%2fcomplex%2fimage%2fupload%2fe3bauc5kxgoyr8nzve9y.jpg&ehk=UhboFf8EoeTJQ7lFjmQYQ3IsFYYVJqy3mY8diW8HbkQ%3d&risl=1&pid=ImgRaw&r=0"
          />
          <Figure.Caption className="figure-caption">
            Our modern and inviting store layout. {/* Caption for the image */}
          </Figure.Caption>
        </Figure>
        <p className="about-description">
          {/* Additional description of the physical store */}
          Step into our vibrant and welcoming physical store, where shopping
          meets an exceptional in-person experience. Our store, established in
          2020, has been dedicated to providing high-quality products and
          unparalleled customer service, mirroring the same excellence you find
          in our online store.
        </p>
        <Figure className="about-image">
          {" "}
          {/* Image figure for the products */}
          <Figure.Image
            width={600}
            height={400}
            alt="Our Products"
            src="https://www.citydisplay.co.uk/site/assets/files/1193/nike.jpg"
          />
          <Figure.Caption className="figure-caption">
            A glimpse of our diverse product range.{" "}
            {/* Caption for the image */}
          </Figure.Caption>
        </Figure>
        <div className="additional-content">
          {" "}
          {/* Container for additional content */}
          <h3 className="additional-heading">Our Commitment</h3>{" "}
          {/* Heading for the additional content */}
          <p className="additional-description">
            {/* Description of the store's commitment */}
            At our Online Store, we are dedicated to bringing you the best
            shopping experience possible. With a focus on quality, diversity,
            and customer satisfaction, we strive to exceed your expectations
            every time you shop with us.
          </p>
        </div>
        <Button
          variant="primary"
          onClick={handleExplore}
          className="explore-btn"
        >
          Explore Our Products {/* Button to explore products */}
        </Button>
      </div>
    </div>
  );
};

export default About;
