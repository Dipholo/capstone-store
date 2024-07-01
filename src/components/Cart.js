import React, { useState } from "react";
import { useCart } from "../CartContext"; // Import the custom cart context
import { Button, Card, Modal, Form } from "react-bootstrap"; // Import Bootstrap components
import "./Cart.css"; // Import custom CSS for Cart page

const Cart = ({ clearTotalPrice }) => {
  const { cartItems, clearCart } = useCart(); // Destructure cartItems and clearCart from the custom cart context
  const [showModal, setShowModal] = useState(false); // State to manage modal visibility

  // Function to handle clearing the cart
  const handleClearCart = () => {
    clearCart(); // Clear the cart items
    clearTotalPrice(); // Clear the total price
  };

  // Function to handle cashout (to be implemented)
  const handleCashout = () => {
    setShowModal(true); // Show the modal
  };

  // Function to handle closing the modal
  const handleCloseModal = () => {
    setShowModal(false); // Hide the modal
  };

  // Calculate the total price of the items in the cart
  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

  // Function to handle displaying help information
  const handleRequestHelp = () => {
    setShowModal(true); // Show the modal
    // Additional logic to fetch or display help information
  };

  return (
    <div className="cart-page">
      <div className="container-fluid">
        <h2 className="cart-heading">Cart</h2>
        {cartItems.length > 0 && (
          <div className="cart-actions">
            <Button variant="danger" onClick={handleClearCart} className="mr-2">
              Clear Cart
            </Button>
            <Button variant="success" onClick={handleCashout}>
              Cashout
            </Button>
            <Button
              variant="primary"
              onClick={handleRequestHelp}
              className="ml-2"
            >
              Request Help
            </Button>
          </div>
        )}
        {cartItems.length === 0 ? (
          <p className="empty-cart-message">Your cart is empty</p>
        ) : (
          <div>
            <div className="row">
              {/* Mapping over cart items to display each item */}
              {cartItems.map((item, index) => (
                <div className="col-md-2 mb-4" key={index}>
                  <Card className="h-100">
                    <Card.Img
                      variant="top"
                      src={item.imageUrl}
                      alt={item.title}
                    />
                    <Card.Body>
                      <Card.Title>{item.title}</Card.Title>
                      <Card.Text>{item.description}</Card.Text>
                      <Card.Text>R{item.price.toFixed(2)}</Card.Text>
                    </Card.Body>
                  </Card>
                </div>
              ))}
            </div>
            <div className="total-price">
              <h3>Total Price: R{totalPrice.toFixed(2)}</h3>
            </div>
          </div>
        )}
      </div>

      {/* Modal for help information */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Help Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            If you need assistance with shipping methods or have other
            questions, please contact our customer support at <br></br>
            <strong>lipholo.info@gmail.com.</strong>
          </p>
          <p>
            Shipping Methods:
            <ul>
              <li>Standard Shipping: 5-7 business days</li>
              <li>Express Shipping: 2-3 business days</li>
              <li>Overnight Shipping: Next day delivery</li>
            </ul>
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Cart;
