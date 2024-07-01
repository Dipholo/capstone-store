import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik"; // Import Formik components for form handling
import * as Yup from "yup"; // Import Yup for form validation
import "./RegistrationPage.css"; // Import CSS for styling
import ErrorPopup from "./ErrorPopup"; // Import ErrorPopup component for displaying errors
import SuccessPopup from "./SuccessPopup"; // Import SuccessPopup component for displaying success messages

const RegistrationPage = () => {
  const [registrationError, setRegistrationError] = useState(""); // State variable for registration errors
  const [registrationSuccess, setRegistrationSuccess] = useState(false); // State variable for success message

  // Validation schema using Yup for form validation
  const validationSchema = Yup.object({
    firstName: Yup.string()
      .max(15, "Must be 15 characters or less")
      .required("Required"),
    lastName: Yup.string()
      .max(20, "Must be 20 characters or less")
      .required("Required"),
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@R!%*?&])[A-Za-z\d@R!%*?&]{8,}R/,
        "Must contain 8 characters, one uppercase, one lowercase, one number and one special case character"
      )
      .required("Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Required"),
  });

  // Handle form submission
  const handleSubmit = (values) => {
    const { confirmPassword, ...userData } = values;

    const registeredUser = JSON.parse(localStorage.getItem("registeredUser"));

    // Check if user is already registered
    if (registeredUser && registeredUser.email === userData.email) {
      setRegistrationError("User already registered. Please login instead.");
    } else {
      localStorage.setItem("registeredUser", JSON.stringify(userData)); // Store user data in localStorage
      setRegistrationError(""); // Clear registration error message
      setRegistrationSuccess(true); // Set registration success state to true
    }
  };

  // Function to close error popup
  const closeErrorPopup = () => {
    setRegistrationError("");
  };

  // Function to close success popup
  const closeSuccessPopup = () => {
    setRegistrationSuccess(false); // Close success popup
  };

  return (
    <div className="container">
      <h1 className="header">Register</h1>

      {/* Display error popup if registrationError is not empty */}
      {registrationError && (
        <ErrorPopup
          isOpen={true}
          onClose={closeErrorPopup}
          message={registrationError}
        />
      )}

      {/* Formik component for managing form state, validation, and submission */}
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {/* Form element containing input fields */}
        <Form>
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <Field name="firstName" type="text" />
            <ErrorMessage name="firstName" component="div" className="error" />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <Field name="lastName" type="text" />
            <ErrorMessage name="lastName" component="div" className="error" />
          </div>
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
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <Field name="confirmPassword" type="password" />
            <ErrorMessage
              name="confirmPassword"
              component="div"
              className="error"
            />
          </div>
          {/* Submit button for registration form */}
          <button type="submit">Register</button>
        </Form>
      </Formik>

      {/* Display success popup if registrationSuccess is true */}
      {registrationSuccess && (
        <SuccessPopup
          isOpen={true}
          onClose={closeSuccessPopup}
          message="Registration successful!"
        />
      )}
    </div>
  );
};

export default RegistrationPage;
