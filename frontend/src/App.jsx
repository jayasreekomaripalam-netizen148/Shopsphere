import Checkout from "./pages/Checkout";
import Cart from "./pages/Cart";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Categories from "./pages/Categories";
import ProductDetails from "./pages/ProductDetails";
import Orders from "./pages/Orders";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Wishlist from "./pages/Wishlist";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categories" element={<Categories />} />
<Route path="/checkout" element={<Checkout />} />          
<Route path="/orders" element={<Orders />} />
<Route path="/login" element={<Login />} />
<Route path="/profile" element={<Profile />} />
<Route path="/wishlist" element={<Wishlist />} />

<Route path="/cart" element={<Cart />} />
<Route 
path="/products/:id" element={<ProductDetails />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

