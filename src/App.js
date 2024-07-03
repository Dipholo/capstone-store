import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Provider } from "react-redux"; // Import Redux Provider
import { createStore, combineReducers } from "redux"; // Import createStore and combineReducers
import Products from "./components/Products";
import TotalPrice from "./components/TotalPrice";
import LoginPage from "./components/LoginPage";
import RegistrationPage from "./components/RegistrationPage";
import HomePage from "./components/HomePage";
import NavBar from "./components/NavBar";
import About from "./components/About";
import Cart from "./components/Cart";
import Contact from "./components/Contact";
import { CartProvider } from "./CartContext";
import PrivateRoute from "./components/PrivateRoute";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

// Redux actions and reducer
const SET_SHIPPING_METHOD = "SET_SHIPPING_METHOD";

const setShippingMethod = (method) => ({
  type: SET_SHIPPING_METHOD,
  payload: method,
});

const initialState = {
  shippingMethod: "Standard Shipping",
};

const shippingReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SHIPPING_METHOD:
      return {
        ...state,
        shippingMethod: action.payload,
      };
    default:
      return state;
  }
};

// Create Redux store
const rootReducer = combineReducers({
  shipping: shippingReducer,
});

const store = createStore(rootReducer);

const App = () => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [isTotalPriceVisible, setIsTotalPriceVisible] = useState(false);

  const handleBuy = (price) => {
    setTotalPrice((prevTotal) => prevTotal + price);
    setIsTotalPriceVisible(true);
  };

  const clearTotalPrice = () => {
    setTotalPrice(0);
    setIsTotalPriceVisible(false);
  };

  return (
    <Provider store={store}>
      <Router>
        <CartProvider>
          <div>
            <NavBar />
            <div className="content-container">
              <Content
                totalPrice={totalPrice}
                isTotalPriceVisible={isTotalPriceVisible}
                handleBuy={handleBuy}
                clearTotalPrice={clearTotalPrice}
              />
            </div>
          </div>
        </CartProvider>
      </Router>
    </Provider>
  );
};

const Content = ({
  totalPrice,
  isTotalPriceVisible,
  handleBuy,
  clearTotalPrice,
}) => {
  return (
    <div>
      {isTotalPriceVisible && (
        <div className="total-price-container">
          <TotalPrice totalPrice={totalPrice} />
        </div>
      )}
      <Routes>
        <Route path="/" element={<Navigate to="/main" />} />
        <Route path="/main" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route
          path="/products"
          element={
            <PrivateRoute>
              <Products handleBuy={handleBuy} />
            </PrivateRoute>
          }
        />
        <Route
          path="/about"
          element={
            <PrivateRoute>
              <About />
            </PrivateRoute>
          }
        />
        <Route
          path="/contact"
          element={
            <PrivateRoute>
              <Contact />
            </PrivateRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <PrivateRoute>
              <Cart clearTotalPrice={clearTotalPrice} />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
