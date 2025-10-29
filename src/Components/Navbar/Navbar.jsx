 import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    // hidden on mobile, visible on sm+ screens
    <nav className="hidden sm:block bg-yellow-50 border-t border-yellow-200 shadow-inner">
      <div className="container mx-auto flex justify-center gap-10 py-3 font-medium text-red-900 text-sm sm:text-base">
        <Link
          to="/"
          className="hover:text-red-700 hover:underline underline-offset-4 transition"
        >
          Home
        </Link>
        <Link
          to="/shop"
          className="hover:text-red-700 hover:underline underline-offset-4 transition"
        >
          Shop
        </Link>
        <Link
          to="/about"
          className="hover:text-red-700 hover:underline underline-offset-4 transition"
        >
          About
        </Link>
        <Link
          to="/contact"
          className="hover:text-red-700 hover:underline underline-offset-4 transition"
        >
          Contact
        </Link>

          <Link
          to="/blog"
          className="hover:text-red-700 hover:underline underline-offset-4 transition"
        >
          Blog
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
