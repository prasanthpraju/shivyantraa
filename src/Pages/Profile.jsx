import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
// import ProfileBg from "../../assets/ii.png"; // use the same bg image if you want

const Profile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    Name: "",
    Email: "",
    MobileNumber: "",
  });

  useEffect(() => {
    const isLoggedIn = !!localStorage.getItem("refresh_token");
    if (!isLoggedIn) {
      Swal.fire({
        icon: "info",
        title: "Not Logged In",
        text: "Please log in to access your profile.",
        showConfirmButton: true,
        confirmButtonText: "Login",
        confirmButtonColor: "#a10202",
      }).then(() => navigate("/login"));
      return;
    }

    // Load user info from localStorage
    setUserData({
      Name: localStorage.getItem("username") || "User",
      Email: localStorage.getItem("Email") || "N/A",
      MobileNumber: localStorage.getItem("MobileNumber") || "N/A",
    });
  }, [navigate]);

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center px-4 relative"
    //   style={{ backgroundImage: `url(${ProfileBg})` }}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      <div className="relative z-10 bg-white/90 rounded-2xl shadow-2xl p-8 sm:p-10 max-w-md w-full border border-[#d4af37]/40">
        <h2 className="text-3xl font-bold text-center text-[#310502] mb-6">
          My Profile
        </h2>

        <div className="space-y-4 text-[#310502]">
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Full Name
            </label>
            <p className="bg-gray-100 border border-gray-300 rounded-lg px-3 py-2">
              {userData.Name}
            </p>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Email
            </label>
            <p className="bg-gray-100 border border-gray-300 rounded-lg px-3 py-2">
              {userData.Email}
            </p>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Mobile Number
            </label>
            <p className="bg-gray-100 border border-gray-300 rounded-lg px-3 py-2">
              {userData.MobileNumber}
            </p>
          </div>
        </div>

        <button
          onClick={() => navigate("/")}
          className="w-full mt-6 bg-[#310502] text-[#f7f7f7] py-2 rounded-lg hover:bg-[#4b0b0b] transition-all"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default Profile;
