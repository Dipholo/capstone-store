import React from "react";
import Popup from "reactjs-popup"; // Import Popup component from reactjs-popup
import "reactjs-popup/dist/index.css"; // Import default styles for reactjs-popup
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

// ErrorPopup component receives props isOpen (boolean), onClose (function), and message (string)
const ErrorPopup = ({ isOpen, onClose, message }) => (
  <Popup open={isOpen} closeOnDocumentClick onClose={onClose}>
    {" "}
    {/* Popup component */}
    <div className="error-popup-content">
      {" "}
      {/* Container for popup content */}
      <div className="error-message">{message}</div>{" "}
      {/* Display error message */}
      <button className="close-button" onClick={onClose}>
        {" "}
        {/* Close button with FontAwesome icon */}
        <FontAwesomeIcon icon={faTimesCircle} />
      </button>
    </div>
  </Popup>
);

export default ErrorPopup; // Export ErrorPopup component
