import React, { useState,useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    Name: "",
    Email: "",
    MobileNumber: "", 
    Password: "",
  });
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1); // Step 1 = Register, Step 2 = Verify OTP
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [timer, setTimer] = useState(0);

  useEffect(() => {
  let interval;
  if (timer > 0) {
    interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
  }
  return () => clearInterval(interval);
}, [timer]);


  // Handle Input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Step 1: Register User
  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setTimer(30);
    try {
      await axios.post(
        "https://shivyantra.onrender.com/api/register",
        formData
      );
      setLoading(false);
      setStep(2);
      setMessage("✅ OTP sent successfully! Please check your email.");

      Swal.fire({
        icon: "success",
        title: "Account Created!",
        text: "Your account has been created successfully. Please verify your OTP.",
        showConfirmButton: false,
        timer: 2000,
      });
    } catch (err) {
      setLoading(false);
      const errorMsg =
        err.response?.data?.message || "❌ Registration failed. Try again.";
      setMessage(errorMsg);
    }
  };

  // Step 2: Verify OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await axios.post(
        "https://shivyantra.onrender.com/api/register/otp-verify",
        {
          Email: formData.Email,
          Otp: otp,
        }
      );

      setLoading(false);
      setMessage("✅ OTP Verified!");
      Swal.fire({
        icon: "success",
        title: "Verification Successful!",
        text: "Your account has been successfully verified.",
        showConfirmButton: false,
        timer: 2000,
      });
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setLoading(false);
      const errorMsg =
        err.response?.data?.message || "❌ Invalid or expired OTP.";
      setMessage(errorMsg);
    }
  };

  // Resend OTP
  const handleResendOtp = async () => {
    setLoading(true);
    setMessage("");

    try {
      await axios.post(
        "https://shivyantra.onrender.com/api/register/resend-otp",
        {
          Email: formData.Email,
        }
      );
      setLoading(false);
      setMessage("🔁 OTP resent successfully!");
    } catch (err) {
      setLoading(false);
      const errorMsg =
        err.response?.data?.message || "❌ Failed to resend OTP.";
      setMessage(errorMsg);
    }
  };

  return (
    <div className="min-h-screen bg-red-50 flex items-center justify-center px-4 py-10">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8 border border-red-100">
        <h2 className="text-3xl font-bold text-center text-red-900 mb-6 uppercase">
          {step === 1 ? "Create Account" : "Verify OTP"}
        </h2>

        {message && (
          <div
            className={`text-center mb-4 font-medium ${
              message.startsWith("✅") || message.startsWith("🔁")
                ? "text-green-700"
                : "text-red-700"
            }`}
          >
            {message}
          </div>
        )}

        {/* Step 1 - Register Form */}
        {step === 1 && (
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="Name"
                required
                value={formData.Name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-900 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Email Address
              </label>
              <input
                type="email"
                name="Email"
                required
                value={formData.Email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-900 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Mobile Number
              </label>
              <input
                type="text"
                name="MobileNumber"
                required
                value={formData.MobileNumber}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-900 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Password
              </label>
              <input
                type="password"
                name="Password"
                required
                value={formData.Password}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-900 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-900 text-yellow-100 font-semibold uppercase py-2 rounded-lg hover:bg-red-800 transition-all duration-300 cursor-pointer"
            >
              {loading ? "Submitting..." : "Register"}
            </button>

            {/* 🔹 Already have account link */}
            <p className="text-center text-sm mt-3 text-gray-700">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="text-red-900 font-semibold hover:underline cursor-pointer "
              >
                Login here
              </button>
            </p>
          </form>
        )}

        {/* Step 2 - OTP Verification */}
        {step === 2 && (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Enter OTP
              </label>
              <input
                type="text"
                required
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-900 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-900 text-yellow-100 font-semibold uppercase py-2 rounded-lg hover:bg-red-800 transition-all duration-300 cursor-pointer"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>

            <p className="text-center text-sm mt-3">
              Didn’t get the OTP?{" "}
              <button
                type="button"
                onClick={handleResendOtp}
                className="text-red-900 font-semibold hover:underline"
              >
                Resend OTP
              </button>
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default Register;
