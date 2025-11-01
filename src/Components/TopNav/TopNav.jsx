import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  UserPlusIcon,
  ArrowRightOnRectangleIcon,
  PowerIcon,
} from "@heroicons/react/24/outline";
import swal from "sweetalert2";
import axios from "axios";

const TopNav = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("refresh_token")
  );

  // ✅ Detect login/logout instantly across the app
  useEffect(() => {
    const handleAuthChange = () => {
      const loggedIn = !!localStorage.getItem("refresh_token");
      setIsLoggedIn(loggedIn);
    };

    // Check auth status on component mount
    handleAuthChange();

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

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("refresh_token");
      const email = localStorage.getItem("Email");
      const userData = localStorage.getItem("user");

      console.log("Logout attempt - Email:", email);
      console.log("Logout attempt - Token:", token);

      // Prepare user data for backend update
      let user;
      if (userData) {
        try {
          user = JSON.parse(userData);
        } catch (e) {
          console.error("Error parsing user data:", e);
        }
      }

      // Call logout API if we have the necessary data
      if (email && token) {
        try {
          await axios.post(
            "https://shivyantra.onrender.com/api/logout",
            { 
              email: email,
              refresh_token: token
            },
            { 
              headers: { 
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
              } 
            }
          );
          console.log("✅ Logout API call successful");
        } catch (apiError) {
          console.warn("⚠️ Logout API call failed, but continuing with client-side logout:", apiError);
          // Continue with client-side logout even if API fails
        }
      } else {
        console.warn("❌ Missing email or token, performing client-side logout only");
      }

      // 🔹 ALWAYS clear frontend storage (even if API call fails)
      const itemsToRemove = [
        "refresh_token", 
        "username", 
        "Email", 
        "isLoginned", 
        "user",
        "token",
        "auth_token"
      ];

      itemsToRemove.forEach(item => {
        localStorage.removeItem(item);
        sessionStorage.removeItem(item); // Clear sessionStorage too for safety
      });

      // 🔹 Trigger auth change for UI update
      window.dispatchEvent(new Event("authChange"));
      setIsLoggedIn(false);

      // 🔹 Show success message
      await swal.fire({
        icon: "success",
        title: "Logged Out!",
        text: "You have been successfully logged out.",
        showConfirmButton: false,
        timer: 1500,
      });

      // 🔹 Close mobile menu if open
      setIsMenuOpen(false);

      // 🔹 Redirect to homepage and reload to reset app state
      navigate("/", { replace: true });
      
      // Small delay before reload to ensure navigation happens
      setTimeout(() => {
        window.location.reload();
      }, 100);

    } catch (error) {
      console.error("❌ Unexpected error during logout:", error);
      
      // 🔹 Emergency cleanup - ensure user is logged out even if something goes wrong
      localStorage.clear();
      sessionStorage.clear();
      
      window.dispatchEvent(new Event("authChange"));
      setIsLoggedIn(false);
      setIsMenuOpen(false);

      swal.fire({
        icon: "info",
        title: "Logged Out",
        text: "You have been logged out from the application.",
        showConfirmButton: false,
        timer: 1500,
      });

      navigate("/", { replace: true });
      setTimeout(() => {
        window.location.reload();
      }, 100);
    }
  };

  return (
    <>
      {/* ======= MAIN NAVBAR ======= */}
      <nav className="via-red-900 bg-red-800 text-yellow-200 shadow-lg py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center flex-wrap gap-4">
            {/* ==== LEFT SECTION ==== */}
            <div className="flex items-center space-x-2 w-auto sm:w-auto">
              {/* Mobile menu button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-yellow-100 hover:text-yellow-300 transition sm:hidden"
                aria-label="Toggle menu"
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
                className="text-3xl font-extrabold bg-gradient-to-r from-yellow-300 via-yellow-100 to-yellow-300 bg-clip-text text-transparent tracking-widest drop-shadow-md cursor-pointer"
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
                  className="bg-yellow-200 text-red-900 px-5 font-semibold hover:bg-yellow-100 transition-all"
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
                  className="flex items-center gap-1 hover:text-yellow-300 transition-all cursor-pointer"
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
                  onClick={handleLogout}
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
                    className="flex items-center gap-2 py-2 hover:text-yellow-300"
                  >
                    <ArrowRightOnRectangleIcon className="w-5 h-5" />
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-2 py-2 hover:text-yellow-300"
                  >
                    <UserPlusIcon className="w-5 h-5" />
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