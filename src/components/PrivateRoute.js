import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  // Check if user is logged in by retrieving the 'registeredUser' from localStorage
  const user = JSON.parse(localStorage.getItem("registeredUser"));

  // If user is logged in (user exists), render the children components
  // Otherwise, redirect to the login page using Navigate component from react-router-dom
  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
