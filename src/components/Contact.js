import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp, faFacebook } from "@fortawesome/free-brands-svg-icons";
import { Button, Form, Modal } from "react-bootstrap";
import ErrorPopup from "./ErrorPopup"; // Import ErrorPopup component
import "./Contact.css"; // Custom CSS for Contact page

const Contact = () => {
  // State variables for form fields and error handling
  const [firstName, setFirstName] = useState(""); // State for the user's first name
  const [lastName, setLastName] = useState(""); // State for the user's last name
  const [email, setEmail] = useState(""); // State for the user's email
  const [message, setMessage] = useState(""); // State for the user's message
  const [showErrorModal, setShowErrorModal] = useState(false); // State to control the error modal visibility
  const [errorMessage, setErrorMessage] = useState(""); // State for the error message
  const [showSuccessModal, setShowSuccessModal] = useState(false); // State to control the success modal visibility

  // Function to handle sending a message via email
  const handleSendMessage = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: "lipholo.info@gmail.com",
          subject: "Message from Contact Form",
          text: `Name: ${firstName} ${lastName}\nEmail: ${email}\nMessage: ${message}`,
        }),
      });

      if (response.ok) {
        setShowErrorModal(false); // Close error modal if open
        setShowSuccessModal(true); // Show success modal
      } else {
        openErrorModal("Failed to send message. Please try again later.");
      }
    } catch (error) {
      openErrorModal("Failed to send message. Please try again later.");
      console.error("Error sending message:", error);
    }
  };

  // Function to handle sending a message via WhatsApp
  const handleSendWhatsapp = () => {
    window.open(
      `https://api.whatsapp.com/send?phone=0027799008449&text=${encodeURIComponent(
        message
      )}`
    );
  };

  // Function to handle sending a message via Facebook
  const handleSendFacebook = () => {
    window.open("https://web.facebook.com/profile.php?id=100068827675227");
  };

  // Function to open the error modal with a specific error message
  const openErrorModal = (errorMessage) => {
    setErrorMessage(errorMessage);
    setShowErrorModal(true);
  };

  // Function to close the error modal
  const closeErrorModal = () => setShowErrorModal(false);

  // Function to close the success modal
  const closeSuccessModal = () => setShowSuccessModal(false);

  return (
    <div className="contact-page">
      <div className="description-container">
        <h2>Want To Know More? Reach out to us!</h2>
        <br />
        <h3>Questions, bug reports, feedback - we're here for it all.</h3>
        <p className="contact-description">
          Need to get in touch with us? Either fill out the form with your
          inquiry and send a message through email, or you can send us a message
          on WhatsApp or get in touch with us through our Facebook page.
          Whatever method you choose to get in touch with us, we will reply
          instantly.
        </p>
        <img
          src="https://aaabusinessplans.com/wp-content/uploads/2023/05/contact-banner.png"
          alt="Contact Us"
          className="contact-image"
        />
      </div>
      <div className="contact-content">
        <Form>
          <Form.Group controlId="formFirstName">
            <Form.Label>First Name*</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your first name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </Form.Group>
          <br />

          <Form.Group controlId="formLastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </Form.Group>
          <br />

          <Form.Group controlId="formEmail">
            <Form.Label>Email*</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <br />

          <Form.Group controlId="formMessage">
            <Form.Label>What can we help you with?</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter your message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </Form.Group>

          <div className="button-container">
            <Button variant="primary" onClick={handleSendMessage}>
              Submit <FontAwesomeIcon icon={faEnvelope} />
            </Button>

            <Button variant="success" onClick={handleSendWhatsapp}>
              WhatsApp <FontAwesomeIcon icon={faWhatsapp} />
            </Button>

            <Button variant="info" onClick={handleSendFacebook}>
              Facebook <FontAwesomeIcon icon={faFacebook} />
            </Button>
          </div>
        </Form>
      </div>

      {/* Error Popup */}
      <ErrorPopup
        isOpen={showErrorModal}
        onClose={closeErrorModal}
        message={errorMessage}
      />

      {/* Success Popup */}
      <Modal show={showSuccessModal} onHide={closeSuccessModal}>
        <Modal.Header closeButton>
          <Modal.Title>Message Sent Successfully</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Your message has been sent successfully!</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeSuccessModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Contact;
