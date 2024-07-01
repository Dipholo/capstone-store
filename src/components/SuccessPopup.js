import React from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

const SuccessPopup = ({ isOpen, onClose, message }) => (
  <Popup open={isOpen} closeOnDocumentClick onClose={onClose}>
    <div className="success-popup-content">
      <div className="success-message">{message}</div>
      <button className="close-button" onClick={onClose}>
        <FontAwesomeIcon icon={faCheckCircle} />
      </button>
    </div>
  </Popup>
);

export default SuccessPopup;
