import React from "react";
import Cart from "../pages/Cart/Cart";
import Checkout from "../pages/Checkout/Checkout";
import Home from "../pages/Home/Home";
import Product from "../pages/Product/Product";
import ProductDetail from "../pages/ProductDetail/ProductDetail";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import { Route, Routes, Navigate} from "react-router-dom";
import Contact from "../pages/Contact/Contact";
import Brand from "../pages/Brand/Brand";
import Blog from "../pages/Blog/Blog";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home"/>}/>
      <Route path="home" element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="product" element={<Product />} />
      <Route path="product/:id" element={<ProductDetail />} />
      <Route path="cart" element={<Cart />} />
      <Route path="checkout" element={<Checkout />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="contact" element={<Contact/>}/>
      <Route path="brand" element={<Brand/>}/>
      <Route path="blog" element={<Blog/>}/>
    </Routes>
  );
};

export default Router;
