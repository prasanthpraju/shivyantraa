 import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

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

    const username = (
      localStorage.getItem("username") ||
      localStorage.getItem("Name") ||
      localStorage.getItem("name") ||
      "User"
    )
      .toString()
      .trim();

    setUserData({
      Name: username || "User",
      Email: (localStorage.getItem("Email") || "N/A").toString().trim(),
      MobileNumber: (localStorage.getItem("MobileNumber") || "N/A").toString().trim(),
    });
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-amber-50 px-4 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/5 to-black/20 pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-lg p-8 md:p-10 rounded-3xl shadow-2xl bg-white/95 border border-amber-200">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-20 h-20 rounded-full bg-amber-200 flex items-center justify-center text-2xl font-bold text-amber-800">
            {(userData.Name || "U").charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-red-900">{userData.Name || "User"}</h2>
            <p className="text-sm text-amber-800/90">
              Member since <strong>2025</strong>
            </p>
          </div>
          <div className="ml-auto">
            <button
              onClick={() => {
                localStorage.removeItem("refresh_token");
                localStorage.removeItem("isLoginned");
                Swal.fire({
                  icon: "success",
                  title: "Logged out",
                  showConfirmButton: false,
                  timer: 1200,
                }).then(() => navigate("/"));
              }}
              className="text-sm bg-red-900 text-yellow-100 px-3 py-1 rounded-md shadow hover:brightness-95"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <div className="bg-white rounded-xl p-3 border">
            <div className="text-xs text-gray-500 mb-1">Full Name</div>
            <div className="text-sm text-[#310502] font-medium">{userData.Name}</div>
          </div>

          <div className="bg-white rounded-xl p-3 border">
            <div className="text-xs text-gray-500 mb-1">Email</div>
            <div className="text-sm text-[#310502] font-medium">{userData.Email}</div>
          </div>

          <div className="bg-white rounded-xl p-3 border">
            <div className="text-xs text-gray-500 mb-1">Mobile Number</div>
            <div className="text-sm text-[#310502] font-medium">{userData.MobileNumber}</div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <button
            onClick={() => navigate("/profile/edit")}
            className="w-full bg-amber-700 text-amber-50 py-2 rounded-lg font-semibold hover:brightness-95 transition"
          >
            Edit Profile
          </button>

          <button
            onClick={() => navigate("/")}
            className="w-full border border-amber-700 text-amber-700 py-2 rounded-lg font-semibold hover:bg-amber-50 transition"
          >
            Back to Home
          </button>
        </div>

        <p className="text-center mt-5 text-xs text-amber-700/80">
          You can update details from the Edit Profile page. Changes reflect after saving.
        </p>
      </div>
    </div>
  );
};

export default Profile;
