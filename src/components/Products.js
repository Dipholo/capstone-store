import React, { useState } from "react";
import { Card, Button, DropdownButton, Dropdown, Modal } from "react-bootstrap";
import "./Products.css"; // Import custom CSS for styling
import { useCart } from "../CartContext"; // Importing custom hook for cart operations
import productData from "./productData"; // Assuming productData is imported or defined elsewhere

const Products = ({ handleBuy }) => {
  // State management
  const [selectedColors, setSelectedColors] = useState({}); // State to track selected colors for each product
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [modalMessage, setModalMessage] = useState(""); // State to store modal message
  const { addToCart } = useCart(); // Custom hook usage for cart operations

  // Function to handle color selection for a product
  const handleColorSelect = (productId, color) => {
    setSelectedColors({ ...selectedColors, [productId]: color });
  };

  // Function to handle adding a product to cart
  const handleProductBuy = (product) => {
    addToCart(product); // Add product to cart using custom hook
    handleBuy(product.price); // Update parent component with price change
    setModalMessage(`${product.title} added to cart`); // Set modal message
    setShowModal(true); // Show modal
  };

  // Function to close the modal
  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="products-container">
      {/* Heading */}
      <h2 className="text-center mb-4">Products</h2>

      {/* Product cards */}
      <div className="row">
        {productData.map((product) => (
          <div className="col-md-2 mb-4" key={product.id}>
            {/* Individual product card */}
            <Card className="h-100">
              <Card.Img
                variant="top"
                src={product.imageUrl}
                alt={product.title}
              />
              <Card.Body>
                <Card.Title className="card-title">{product.title}</Card.Title>
                <Card.Text className="card-text">
                  {product.description}
                </Card.Text>
                <Card.Text>R{product.price.toFixed(2)}</Card.Text>

                {/* Dropdown for selecting colors */}
                <DropdownButton
                  id={`dropdown-colors-${product.id}`}
                  title={selectedColors[product.id] || "Select Color"}
                >
                  {product.colors.map((color, index) => (
                    <Dropdown.Item
                      key={index}
                      onClick={() => handleColorSelect(product.id, color)}
                      className="dropdown-item"
                      style={{ backgroundColor: color, color: "white" }} // Styling for dropdown items
                    >
                      {color}
                    </Dropdown.Item>
                  ))}
                </DropdownButton>

                {/* Button to add product to cart */}
                <Button
                  variant="primary"
                  className="mt-2 btn-primary"
                  onClick={() => handleProductBuy(product)}
                >
                  Add To Cart
                </Button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>

      {/* Modal to show confirmation message */}
      <Modal show={showModal} onHide={closeModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Item Added to Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalMessage}</Modal.Body>
        <Modal.Footer>
          <Button className="btn-secondary" onClick={closeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Products;
