 import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  UserPlusIcon,
  ArrowRightOnRectangleIcon,
  PowerIcon,
} from "@heroicons/react/24/outline";

const TopNav = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  // ✅ Detect login/logout instantly across app
  useEffect(() => {
    const handleAuthChange = () => {
      setIsLoggedIn(!!localStorage.getItem("token"));
    };

    window.addEventListener("authChange", handleAuthChange);
    window.addEventListener("storage", handleAuthChange);

    return () => {
      window.removeEventListener("authChange", handleAuthChange);
      window.removeEventListener("storage", handleAuthChange);
    };
  }, []);

  const handleSearch = () => {
    if (searchTerm.trim()) navigate("/shop");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.dispatchEvent(new Event("authChange")); // ✅ tell navbar to update
    navigate("/");
  };

  return (
    <>
      {/* ======= MAIN NAVBAR ======= */}
      <nav className="bg-red-900 text-yellow-100 shadow-md py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center flex-wrap gap-4">
            {/* ==== LEFT SECTION ==== */}
            <div className="flex items-center space-x-2 w-auto sm:w-auto">
              {/* Mobile menu button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-yellow-100 hover:text-yellow-300 transition sm:hidden"
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

              {/* Brand name */}
              <h1
                onClick={() => navigate("/")}
                className="text-2xl font-extrabold text-yellow-100 tracking-wide text-center w-full sm:w-auto cursor-pointer"
              >
                Shivyantra
              </h1>
            </div>

            {/* ==== CENTER SECTION (Search) ==== */}
            <div className="flex-grow sm:flex-grow-0 w-full sm:w-auto order-3 sm:order-none">
              <div className="flex bg-white rounded-full border border-yellow-300 overflow-hidden focus-within:ring-2 focus-within:ring-yellow-400 transition-all">
                <input
                  type="text"
                  placeholder="Search for products..."
                  className="flex-grow px-4 py-2 text-sm text-gray-800 outline-none"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                />
                <button
                  onClick={handleSearch}
                  className="bg-yellow-400 text-red-900 px-5 font-semibold hover:bg-yellow-300 transition-all"
                >
                  Search
                </button>
              </div>
            </div>

            {/* ==== RIGHT SECTION ==== */}
            <div className="flex items-center space-x-4 text-sm font-semibold">
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1 hover:text-yellow-300 transition-all"
                >
                  <PowerIcon className="w-5 h-5" />
                  Logout
                </button>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="flex items-center gap-1 hover:text-yellow-300 transition-all"
                  >
                    <ArrowRightOnRectangleIcon className="w-5 h-5" />
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="flex items-center gap-1 hover:text-yellow-300 transition-all"
                  >
                    <UserPlusIcon className="w-5 h-5" />
                    Register
                  </Link>
                </>
              )}

              {/* Cart icon */}
              <Link
                to="/cart"
                className="relative hover:scale-105 transition-transform"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-7 h-7 text-yellow-100"
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
                <span className="absolute -top-2 -right-2 bg-yellow-300 text-red-900 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  0
                </span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* ==== MOBILE MENU ==== */}
      {isMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-40 z-40"
            onClick={() => setIsMenuOpen(false)}
          ></div>

          <div className="fixed top-0 left-0 w-64 h-full bg-red-900 text-yellow-100 shadow-xl z-50 p-5 overflow-y-auto">
            <h2 className="text-xl font-bold mb-4 border-b border-yellow-200 pb-2">
              Menu
            </h2>

            <Link
              to="/"
              className="block py-2 hover:text-yellow-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/shop"
              className="block py-2 hover:text-yellow-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Shop
            </Link>
            <Link
              to="/about"
              className="block py-2 hover:text-yellow-300"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to="/blog"
              className="block py-2 hover:text-yellow-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Blog
            </Link>
            <Link
              to="/contact"
              className="block py-2 hover:text-yellow-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>

            <div className="mt-4 border-t border-yellow-300 pt-3">
              {isLoggedIn ? (
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center gap-2 text-yellow-100 hover:text-yellow-300 w-full text-left"
                >
                  <PowerIcon className="w-5 h-5" />
                  Logout
                </button>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="block py-2 hover:text-yellow-300"
                  >
                    <ArrowRightOnRectangleIcon className="w-5 h-5 inline-block mr-1" />
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setIsMenuOpen(false)}
                    className="block py-2 hover:text-yellow-300"
                  >
                    <UserPlusIcon className="w-5 h-5 inline-block mr-1" />
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default TopNav;
