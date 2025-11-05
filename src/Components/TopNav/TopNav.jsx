import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  UserPlusIcon,
  ArrowRightOnRectangleIcon,
  PowerIcon,
  Bars3Icon,
  XMarkIcon,
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

  useEffect(() => {
    const handleAuthChange = () => {
      const loggedIn = !!localStorage.getItem("refresh_token");
      setIsLoggedIn(loggedIn);
    };
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

      if (email && token) {
        try {
          await axios.post(
            "https://shivyantra.onrender.com/api/logout",
            { email, refresh_token: token },
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );
        } catch (apiError) {
          console.warn("Logout API failed, continuing client-side:", apiError);
        }
      }

      [
        "refresh_token",
        "username",
        "Email",
        "isLoginned",
        "user",
        "token",
        "auth_token",
      ].forEach((i) => {
        localStorage.removeItem(i);
        sessionStorage.removeItem(i);
      });

      window.dispatchEvent(new Event("authChange"));
      setIsLoggedIn(false);

      await swal.fire({
        icon: "success",
        title: "Logged Out!",
        text: "You have been successfully logged out.",
        showConfirmButton: false,
        timer: 1500,
      });

      setIsMenuOpen(false);
      navigate("/", { replace: true });
      setTimeout(() => window.location.reload(), 100);
    } catch (error) {
      console.error("Logout error:", error);
      localStorage.clear();
      sessionStorage.clear();
      setIsLoggedIn(false);
      setIsMenuOpen(false);
      swal.fire({
        icon: "info",
        title: "Logged Out",
        text: "You have been logged out.",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/", { replace: true });
      setTimeout(() => window.location.reload(), 100);
    }
  };

  return (
    <>
      {/* ======= MAIN NAVBAR ======= */}
      <nav className="bg-gradient-to-r from-[#310502] via-[#420303] to-[#3d0101] text-[#f7f7f7] shadow-lg py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center flex-wrap gap-4">
            {/* ==== LEFT SECTION (Logo) ==== */}
            <div className="flex items-center space-x-2">
              <h1
                onClick={() => navigate("/")}
                className="text-3xl font-extrabold bg-gradient-to-r from-[#d4af37] via-[#f7f7f7] to-[#d4af37] bg-clip-text text-transparent tracking-widest drop-shadow-md cursor-pointer "
              >
                Shivyantra
              </h1>
            </div>

            {/* ==== CENTER SECTION (Search) ==== */}
            <div className="hidden sm:flex bg-[#f7f7f7] rounded-full border border-[#d4af37] overflow-hidden focus-within:ring-2 focus-within:ring-[#d4af37] transition-all w-96">
              <input
                type="text"
                placeholder="Search for products..."
                className="flex-grow px-4 py-2 text-sm text-[#310502] outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
              <button
                onClick={handleSearch}
                className="bg-[#d4af37] text-[#310502] px-5 font-semibold hover:bg-[#f0cf77] transition-all"
              >
                Search
              </button>
            </div>

            {/* ==== RIGHT SECTION ==== */}
            <div className="flex items-center space-x-4 text-sm font-semibold">
              {/* Desktop login/register/logout */}
              <div className="hidden sm:flex items-center space-x-4">
                {isLoggedIn ? (
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-1 hover:text-[#d4af37] transition-all cursor-pointer"
                  >
                    <PowerIcon className="w-5 h-5" />
                    Logout
                  </button>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="flex items-center gap-1 hover:text-[#d4af37] transition-all"
                    >
                      <ArrowRightOnRectangleIcon className="w-5 h-5" />
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="flex items-center gap-1 hover:text-[#d4af37] transition-all"
                    >
                      <UserPlusIcon className="w-5 h-5" />
                      Register
                    </Link>
                  </>
                )}
              </div>

              {/* Profile Icon */}
              {isLoggedIn && (
                <div
                  className="w-9 h-9 rounded-full bg-[#d4af37] text-[#310502] flex items-center justify-center font-bold cursor-pointer hover:bg-[#f0cf77] transition-all"
                  title={localStorage.getItem("username") || "User"}
                  onClick={() => navigate("/profile")}
                >
                  {(localStorage.getItem("username") || "u")
                    .charAt(0)
                    .toUpperCase()}
                </div>
              )}

              {/* Cart Icon */}
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
                  className="w-7 h-7 text-[#f7f7f7]"
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
                <span className="absolute -top-2 -right-2 bg-[#d4af37] text-[#310502] text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  0
                </span>
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(true)}
                className="text-[#f7f7f7] hover:text-[#d4af37] transition sm:hidden"
              >
                <Bars3Icon className="w-7 h-7" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* ==== MOBILE MENU ==== */}
      {isMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30"
            onClick={() => setIsMenuOpen(false)}
          ></div>

          <div className="fixed top-0 right-0 w-64 h-full bg-[#3d0101] text-[#f7f7f7] shadow-xl z-50 p-5 overflow-y-auto rounded-l-2xl transition-all">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Menu</h2>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="text-[#f7f7f7] hover:text-[#d4af37]"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>

            {["Home", "Shop", "About", "Blog", "Contact"].map((item) => (
              <Link
                key={item}
                to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                className="block py-2 hover:text-[#d4af37]"
                onClick={() => setIsMenuOpen(false)}
              >
                {item}
              </Link>
            ))}

            <div className="mt-4 border-t border-[#d4af37]/50 pt-3">
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-[#f7f7f7] hover:text-[#d4af37] w-full text-left"
                >
                  <PowerIcon className="w-5 h-5" />
                  Logout
                </button>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-2 py-2 hover:text-[#d4af37]"
                  >
                    <ArrowRightOnRectangleIcon className="w-5 h-5" />
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-2 py-2 hover:text-[#d4af37]"
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
