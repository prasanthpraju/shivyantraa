 import React from "react";
import { Link } from "react-router-dom";
import { useScrollReveal } from "./useScrollReveal";

const Navbar = () => {
  const [ref, visible] = useScrollReveal();

  return (
    // hidden on mobile, visible on sm+ screens
    <nav
      ref={ref}
      className={`hidden sm:block bg-gradient-to-r from-[#310502] via-[#420303] to-[#3d0101] border-t border-[#5c1a0c] shadow-inner 
      transform transition-all duration-700 ease-out 
      ${visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-5"}`}
    >
      <div className="container mx-auto flex justify-center gap-10 py-3 font-medium text-[#f7f7f7] text-sm sm:text-base">
        <Link
          to="/"
          className="hover:text-[#d4af37] hover:underline underline-offset-4 transition"
        >
          Home
        </Link>
        <Link
          to="/shop"
          className="hover:text-[#d4af37] hover:underline underline-offset-4 transition"
        >
          Shop
        </Link>
        <Link
          to="/about"
          className="hover:text-[#d4af37] hover:underline underline-offset-4 transition"
        >
          About
        </Link>
        <Link
          to="/contact"
          className="hover:text-[#d4af37] hover:underline underline-offset-4 transition"
        >
          Contact
        </Link>
        <Link
          to="/blog"
          className="hover:text-[#d4af37] hover:underline underline-offset-4 transition"
        >
          Blog
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
