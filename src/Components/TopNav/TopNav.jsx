 // src/Components/TopNav/TopNav.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Bars3Icon,
  XMarkIcon,
  MagnifyingGlassIcon,
  UserPlusIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";
import Login from "../../Pages/Login";
import Register from "../../Pages/Register";

const TopNav = () => {
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");

  return (
    <>
      {/* Navbar */}
      <div className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
        <div className="flex justify-between items-center px-4 py-3">
          <div className="text-xl font-bold text-red-900">SHIVYANTRA</div>

          {/* Search */}
          <div className="hidden md:flex items-center bg-gray-100 rounded-full px-3 py-1 w-1/2">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="bg-transparent outline-none w-full px-2"
            />
            <MagnifyingGlassIcon className="w-5 h-5 text-red-900" />
          </div>

          {/* Right buttons */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowLogin(true)}
              className="flex items-center text-sm font-semibold text-red-900 hover:text-red-700"
            >
              <ArrowRightOnRectangleIcon className="w-5 h-5 mr-1" />
              Login
            </button>

            <button
              onClick={() => setShowRegister(true)}
              className="flex items-center text-sm font-semibold text-red-900 hover:text-red-700"
            >
              <UserPlusIcon className="w-5 h-5 mr-1" />
              Register
            </button>
          </div>
        </div>
      </div>

      {/* Spacer */}
      <div className="h-16"></div>

      {/* Popup Modals */}
      {showLogin && <Login onClose={() => setShowLogin(false)} />}
      {showRegister && <Register onClose={() => setShowRegister(false)} />}
    </>
  );
};

export default TopNav;
