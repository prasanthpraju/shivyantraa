 import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-red-900 shadow-lg hidden lg:flex justify-evenly items-center h-16 px-5">
      {/* Logo */}
      <div className="flex justify-start">
        <Link to="/" className="text-xl font-bold text-white">
          Shivyantra
        </Link>
      </div>

      {/* Navigation Links */}
      <div className="flex space-x-6">
        <Link to="/" className="text-white hover:underline font-bold ml-10">
          Home
        </Link>
        <Link to="/shop" className="text-white hover:underline font-bold ml-3">
          Shop
        </Link>
        <Link to="/about" className="text-white hover:underline font-bold ml-3">
          About
        </Link>
        <Link to="/blog" className="text-white hover:underline font-bold ml-3">
          Blog
        </Link>
        <Link to="/contact" className="text-white hover:underline font-bold ml-3">
          Contact
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
