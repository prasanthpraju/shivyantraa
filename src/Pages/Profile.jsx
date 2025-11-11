<<<<<<< HEAD
 import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    Email: "",
    MobileNumber: "",
  });
  const [loading, setLoading] = useState(false);

  // Load data from localStorage
  useEffect(() => {
    const username = localStorage.getItem("username") || "User";
    const Email = localStorage.getItem("Email") || "";
    const MobileNumber = localStorage.getItem("MobileNumber") || "";
    setUser({ username, Email, MobileNumber });
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("refresh_token");
      await axios.put(
        "https://shivyantra.onrender.com/api/update-profile",
        user,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      localStorage.setItem("username", user.username);
      localStorage.setItem("Email", user.Email);
      localStorage.setItem("MobileNumber", user.MobileNumber);

      Swal.fire({
        icon: "success",
        title: "Profile Updated 🎉",
        text: "Your profile has been updated successfully!",
        confirmButtonColor: "#a10202",
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: "Unable to update profile. Please try again later.",
        confirmButtonColor: "#a10202",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    localStorage.clear();
    sessionStorage.clear();
    window.dispatchEvent(new Event("authChange"));
    Swal.fire({
      icon: "success",
      title: "Logged Out",
      text: "You’ve been logged out successfully.",
      showConfirmButton: false,
      timer: 1500,
    });
    navigate("/", { replace: true });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#310502] via-[#420303] to-[#3d0101] px-4 py-10">
      <div className="bg-white/95 shadow-2xl rounded-3xl p-8 w-full max-w-lg border border-[#d4af37]/40">
        {/* Profile Header */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-24 h-24 rounded-full bg-[#d4af37] flex items-center justify-center text-[#310502] font-bold text-3xl shadow-lg">
            {user.username.charAt(0).toUpperCase()}
          </div>
          <h2 className="mt-4 text-2xl font-extrabold text-[#310502]">
            {user.username}
          </h2>
          <p className="text-sm text-gray-600">{user.Email}</p>
        </div>

        {/* Form */}
        <form onSubmit={handleUpdate} className="space-y-5">
          <div>
            <label className="block text-[#310502] font-semibold mb-1">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={user.username}
              onChange={handleChange}
              className="w-full border border-[#d4af37]/50 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#d4af37] outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-[#310502] font-semibold mb-1">
              Email
            </label>
            <input
              type="email"
              name="Email"
              value={user.Email}
              onChange={handleChange}
              className="w-full border border-[#d4af37]/50 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#d4af37] outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-[#310502] font-semibold mb-1">
              Mobile Number
            </label>
            <input
              type="text"
              name="MobileNumber"
              value={user.MobileNumber}
              onChange={handleChange}
              className="w-full border border-[#d4af37]/50 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#d4af37] outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#d4af37] text-[#310502] font-semibold py-2 rounded-xl hover:bg-[#f0cf77] transition-all shadow-inner disabled:opacity-60"
          >
            {loading ? "Updating..." : "Update Profile"}
          </button>
        </form>

        <button
          onClick={handleLogout}
          className="w-full mt-4 border border-[#d4af37] text-[#310502] py-2 rounded-xl hover:bg-[#d4af37]/20 transition-all"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
=======
 
>>>>>>> eae1dac0198b1ef088ee2b7043bfd9d3a39d88f0
