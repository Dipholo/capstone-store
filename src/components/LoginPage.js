import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./LoginPage.css";
import ErrorPopup from "./ErrorPopup"; // Import ErrorPopup component

const LoginPage = () => {
  const navigate = useNavigate();
  const [showError, setShowError] = useState(false); // State to control error popup visibility
  const [errorMessage, setErrorMessage] = useState(""); // State to store error message

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Required"),
  });

  const handleSubmit = (values) => {
    const registeredUser = JSON.parse(localStorage.getItem("registeredUser"));
    if (registeredUser) {
      const { email, password } = values;
      if (
        registeredUser.email === email &&
        registeredUser.password === password
      ) {
        navigate("/products", { state: { user: registeredUser } });
      } else {
        setErrorMessage("Invalid email or password."); // Set error message for invalid credentials
        setShowError(true); // Show error popup for invalid credentials
      }
    } else {
      setErrorMessage("No registered user found. Please register first.");
      setShowError(true); // Show error popup for no registered user
    }
  };

  const closeErrorPopup = () => {
    setShowError(false); // Close error popup
  };

  return (
    <div className="container">
      <h1 className="header">Login</h1>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <Field name="email" type="email" />
            <ErrorMessage name="email" component="div" className="error" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <Field name="password" type="password" />
            <ErrorMessage name="password" component="div" className="error" />
          </div>
          <button type="submit">Login</button>
        </Form>
      </Formik>

      {/* ErrorPopup component for displaying error messages */}
      <ErrorPopup
        isOpen={showError}
        onClose={closeErrorPopup}
        message={errorMessage}
      />
    </div>
  );
};

export default LoginPage;
