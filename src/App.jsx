import React from "react";
import TopSlider from "./Components/TopNav/Tapslider";
import Navbar from "./Components/Navbar";
import TopNav from "./Components/TopNav/TopNav";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Shop from "./Pages/Shop/Shop";
import Login from "./Pages/Login/Login";
import Contact from "./Pages/Contact/Contact";
import { ToastContainer } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css";
import About from "./Pages/About/About";
import Footer from "./Components/Footer";
import CancellationPolicy from "./Insights/CancellationPolicy";
import ReplacementPolicy from "./Insights/ReplacementPolicy";
import Register from "./Pages/Login/Register";
import ShippingPolicy from "./Insights/ShippingPolicy";
import StrategicVision from "./Insights/StrategicVision";
import Blog from "./Pages/Blog/Blog";
import BlogDetail from "./Pages/Blog/BlogDetail";
import ForgotPassword from "./Pages/Login/ForgotPassword";
import ResetPassword from "./Pages/Login/ResetPassword";
import ScrollTopAndSocials from "./Components/ScrollTopAndSocials";
import Cart from "./Pages/Cart";
import Profile from "./Pages/Profile";

const App = () => {
  return (
    <div>
      <ToastContainer position="top-center" autoClose={3000} />
      <ScrollTopAndSocials/>
      <TopSlider />
      <Navbar />
      <TopNav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blog/>}/>
        <Route path="/blog/:id" element={<BlogDetail/>}/>
        <Route path="/cancellationPolicy" element={<CancellationPolicy />} />
        <Route path="/replacementPolicy" element={<ReplacementPolicy />} />
        <Route path="/shippingPolicy" element={<ShippingPolicy />} />
        <Route path="/strategicVision" element={<StrategicVision />} />
        <Route path="register" element={<Register/>}/>
        <Route path="forgot-password" element={<ForgotPassword/>}/>
        <Route path="reset-password" element={<ResetPassword/>}/>
        <Route path="cart" element={<Cart/>}/>
        <Route path="profile" element={<Profile/>}/>
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
