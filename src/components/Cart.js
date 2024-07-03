import React, { useState } from "react"; // Import React and useState hook
import { useCart } from "../CartContext"; // Import useCart hook from CartContext
import { Button, Card, Modal, Form } from "react-bootstrap"; // Import necessary components from react-bootstrap
import { useSelector, useDispatch } from "react-redux"; // Import hooks from react-redux
import "./Cart.css"; // Import Cart-specific CSS

const Cart = ({ clearTotalPrice }) => {
  // Destructure clearTotalPrice prop
  const { cartItems, clearCart } = useCart(); // Get cart items and clearCart function from CartContext
  const [showHelpModal, setShowHelpModal] = useState(false); // State for showing/hiding Help modal
  const [showShippingModal, setShowShippingModal] = useState(false); // State for showing/hiding Shipping modal
  const [showPaymentModal, setShowPaymentModal] = useState(false); // State for showing/hiding Payment modal
  const [showAlertModal, setShowAlertModal] = useState(false); // State for showing/hiding Alert modal

  // State for payment form fields
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");

  const shippingMethod = useSelector((state) => state.shipping.shippingMethod); // Get the selected shipping method from the Redux store
  const dispatch = useDispatch(); // Get the dispatch function from Redux

  // Function to clear the cart and total price
  const handleClearCart = () => {
    clearCart();
    clearTotalPrice();
  };

  // Function to show the Shipping modal
  const handleCashout = () => {
    setShowShippingModal(true);
  };

  // Function to close all modals
  const handleCloseModal = () => {
    setShowHelpModal(false);
    setShowShippingModal(false);
    setShowPaymentModal(false);
    setShowAlertModal(false);
  };

  // Function to handle selecting a shipping method
  const handleSelectShippingMethod = (method) => {
    dispatch({ type: "SET_SHIPPING_METHOD", payload: method }); // Dispatch action to set the shipping method in the Redux store
    setShowShippingModal(false); // Close the Shipping modal
    setShowPaymentModal(true); // Show the Payment modal
  };

  // Calculate the total price of items in the cart
  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

  // Function to show the Help modal
  const handleRequestHelp = () => {
    setShowHelpModal(true);
  };

  // Function to handle payment
  const handlePayment = () => {
    // Check if all payment fields are filled
    if (cardNumber && expiryDate && cvv) {
      alert("Payment processed");
      setShowPaymentModal(false); // Close the Payment modal
    } else {
      setShowAlertModal(true); // Show the Alert modal if fields are not filled
    }
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

      <Modal show={showShippingModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Select Shipping Method</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Check
                type="radio"
                label="Standard Shipping: 5-7 business days"
                name="shippingMethod"
                onChange={() => handleSelectShippingMethod("Standard Shipping")}
                checked={shippingMethod === "Standard Shipping"}
              />
              <Form.Check
                type="radio"
                label="Express Shipping: 2-3 business days"
                name="shippingMethod"
                onChange={() => handleSelectShippingMethod("Express Shipping")}
                checked={shippingMethod === "Express Shipping"}
              />
              <Form.Check
                type="radio"
                label="Overnight Shipping: Next day delivery"
                name="shippingMethod"
                onChange={() =>
                  handleSelectShippingMethod("Overnight Shipping")
                }
                checked={shippingMethod === "Overnight Shipping"}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showPaymentModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Payment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Card Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter card number"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Expiry Date</Form.Label>
              <Form.Control
                type="text"
                placeholder="MM/YY"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>CVV</Form.Label>
              <Form.Control
                type="text"
                placeholder="CVV"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handlePayment}>
            Pay
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showAlertModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Alert</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Fill out all fields</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showHelpModal} onHide={handleCloseModal}>
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
