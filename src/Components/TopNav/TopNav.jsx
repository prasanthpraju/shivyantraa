 import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  UserPlusIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";

const TopNav = () => {
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate("/shop");
    }
  };

  const handleCategoryClick = (category) => {
    navigate("/shop");
  };

  return (
    <>
      {/* ======= MAIN NAVBAR ======= */}
      <nav className="shadow-lg sm:py-4 items-center bg-white">
        <div className="px-5 sm:px-10">
          <div className="flex justify-between items-center h-14">

            {/* ==== Left Section ==== */}
            <div className="flex flex-row items-center text-sm font-semibold">
              <div className="text-2xl font-bold text-red-900">
                9063408133
              </div>
            </div>

            {/* ==== Middle Section (Search) ==== */}
            <div className="hidden lg:flex items-center justify-center">
              <div className="flex bg-white border border-red-900 rounded-full w-96 transition duration-300 hover:shadow-md hover:border-red-700">
                <div className="flex w-10 items-center justify-center p-5">
                  <svg
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                    className="pointer-events-none w-5 fill-red-900"
                  >
                    <path d="M16.72 17.78a.75.75 0 1 0 1.06-1.06l-1.06 1.06Z" />
                    <path d="M9 14.5A5.5 5.5 0 0 1 3.5 9H2a7 7 0 0 0 7 7v-1.5ZM3.5 9A5.5 5.5 0 0 1 9 3.5V2a7 7 0 0 0-7 7h1.5ZM9 3.5A5.5 5.5 0 0 1 14.5 9H16a7 7 0 0 0-7-7v1.5Zm3.89 10.45 3.83 3.83 1.06-1.06-3.83-3.83-1.06 1.06Z"></path>
                  </svg>
                </div>

                <input
                  type="text"
                  className="w-[300px] text-black pl-2 text-base font-semibold outline-0"
                  placeholder="Search for the product..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                />
                <button
                  onClick={handleSearch}
                  className="bg-red-900 text-yellow-100  px-5 rounded-tr-full rounded-br-full font-semibold cursor-pointer transition-all duration-300  text-yellow-200"
                >
                  Search
                </button>
              </div>
            </div>

            {/* ==== Right Section ==== */}
            <div className="flex items-center space-x-5">
              {/* Login */}
              <Link
                to="/login"
                className="flex items-center gap-1 text-sm font-semibold text-red-900 cursor-pointer hover:text-red-700 transition duration-300"
              >
                <ArrowRightOnRectangleIcon className="w-5 h-5" />
                Login
              </Link>

              {/* Register */}
              <Link
                to="/register"
                className="flex items-center gap-1 text-sm font-semibold text-red-900 cursor-pointer hover:text-red-700 transition duration-300"
              >
                <UserPlusIcon className="w-5 h-5" />
                Register
              </Link>

              {/* Cart */}
               {/* Cart */}
<Link
  to="/cart"
  className="relative text-red-900 hover:-translate-y-1 transition-all duration-300 cursor-pointer "
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-8 h-8"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 
      1.263 12A1.125 1.125 0 0 1 19.25 22H4.75a1.125 
      1.125 0 0 1-1.12-1.243l1.264-12A1.125 
      1.125 0 0 1 5.513 7.5h12.974a1.125 
      1.125 0 0 1 1.119 1.007Z"
    />
  </svg>

  {/* === Cart Count Badge === */}
  <span className="absolute -top-2 -right-2 bg-red-900 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
    0
  </span>
</Link>


              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-red-900 lg:hidden cursor-pointer hover:text-red-700 transition duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      

      {/* ==== MOBILE MENU ==== */}
      {isMenuOpen && (
        <div
          className="fixed top-0 right-0 w-64 h-full bg-white shadow-lg z-50 p-5 overflow-y-auto"
          onClick={() => setIsMenuOpen(false)}
        >
          <h2 className="text-xl font-bold text-red-900 mb-4">Menu</h2>
          <Link to="/" className="block py-2 font-semibold cursor-pointer hover:text-red-700">Home</Link>
          <Link to="/shop" className="block py-2 font-semibold cursor-pointer hover:text-red-700">Shop</Link>
          <Link to="/about" className="block py-2 font-semibold cursor-pointer hover:text-red-700">About</Link>
          <Link to="/blog" className="block py-2 font-semibold cursor-pointer hover:text-red-700">Blog</Link>
          <Link to="/contact" className="block py-2 font-semibold cursor-pointer hover:text-red-700">Contact</Link>
        </div>
      )}
    </>
  );
};

export default TopNav;
