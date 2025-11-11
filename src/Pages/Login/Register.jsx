 import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Registerbg from "../../../src/assets/ii.png"; // same background as login

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

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // Step 1: Register User
  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setTimer(30);

    try {
      await axios.post("https://shivyantra.onrender.com/api/register", formData);

      setLoading(false);
      setStep(2);
      setMessage("✅ OTP sent successfully! Please check your email.");

      await Swal.fire({
        icon: "success",
        title: "Registration Successful 🎉",
        text: "Please verify the OTP sent to your email.",
        confirmButtonColor: "#a10202",
        confirmButtonText: "Verify Now",
        background: "#fff",
      });
    } catch (err) {
      setLoading(false);
      const errorMsg = err.response?.data?.message || "❌ Registration failed. Try again.";
      setMessage(errorMsg);

      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: errorMsg,
        confirmButtonColor: "#a10202",
      });
    }
  };

  // Step 2: Verify OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await axios.post("https://shivyantra.onrender.com/api/register/otp-verify", {
        Email: formData.Email,
        Otp: otp,
      });

      setLoading(false);
      setMessage("✅ OTP Verified!");
      Swal.fire({
        icon: "success",
        title: "Verification Successful!",
        text: "Your account has been successfully verified.",
        showConfirmButton: false,
        timer: 2000,
      });
      localStorage.setItem("username", formData.Name);
      localStorage.setItem("Email", formData.Email);
      localStorage.setItem("MobileNumber", formData.MobileNumber);

      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setLoading(false);
      const errorMsg = err.response?.data?.message || "❌ Invalid or expired OTP.";
      setMessage(errorMsg);
    }
  };

  // Resend OTP
  const handleResendOtp = async () => {
    setLoading(true);
    setMessage("");

    try {
      await axios.post("https://shivyantra.onrender.com/api/register/resend-otp", {
        Email: formData.Email,
      });
      setLoading(false);
      setMessage("🔁 OTP resent successfully!");
      setTimer(30);
    } catch (err) {
      setLoading(false);
      const errorMsg = err.response?.data?.message || "❌ Failed to resend OTP.";
      setMessage(errorMsg);
    }
  };

  return (
    <div
      className="relative flex items-center justify-center min-h-screen w-full bg-center bg-cover bg-no-repeat px-4 py-10"
      style={{
        backgroundImage: `linear-gradient(180deg, rgba(250,245,235,0.92), rgba(241,233,211,0.92)), url(${Registerbg})`,
      }}
    >
      {/* ✨ Warm Vignette Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-black/20 to-transparent backdrop-blur-[1px]" />

      {/* 🔸 Register Card (classic/vintage look) */}
      <div className="relative z-10 bg-amber-50/95 shadow-2xl rounded-3xl p-8 w-full max-w-lg border border-amber-200/60 backdrop-blur-md sm:p-10 md:p-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-red-900">
              {step === 1 ? "Create Your Account" : "Verify OTP"}
            </h2>
            <p className="text-sm text-amber-800/90">
              {step === 1
                ? "Join Shivyantra — quick signup."
                : `We sent an OTP to ${formData.Email}`}
            </p>
          </div>

          <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-red-900 to-amber-600 flex items-center justify-center shadow-md">
            <span className="text-yellow-100 font-bold">SV</span>
          </div>
        </div>

        {message && (
          <div
            className={`text-center mb-4 px-4 py-2 rounded-md text-sm font-medium ${
              message.startsWith("✅") || message.startsWith("🔁")
                ? "text-green-700 bg-green-50"
                : "text-red-800 bg-red-50"
            }`}
          >
            {message}
          </div>
        )}

        {/* Step 1 - Register Form */}
        {step === 1 && (
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-amber-800 font-medium mb-2">Full Name</label>
              <input
                type="text"
                name="Name"
                required
                value={formData.Name}
                onChange={handleChange}
                className="w-full border border-amber-200 rounded-xl px-4 py-2 focus:ring-2 focus:ring-amber-300 outline-none bg-white/95"
              />
            </div>

            <div>
              <label className="block text-amber-800 font-medium mb-2">Email Address</label>
              <input
                type="email"
                name="Email"
                required
                value={formData.Email}
                onChange={handleChange}
                className="w-full border border-amber-200 rounded-xl px-4 py-2 focus:ring-2 focus:ring-amber-300 outline-none bg-white/95"
              />
            </div>

            <div>
              <label className="block text-amber-800 font-medium mb-2">Mobile Number</label>
              <input
                type="text"
                name="MobileNumber"
                required
                value={formData.MobileNumber}
                onChange={handleChange}
                className="w-full border border-amber-200 rounded-xl px-4 py-2 focus:ring-2 focus:ring-amber-300 outline-none bg-white/95"
              />
            </div>

            <div>
              <label className="block text-amber-800 font-medium mb-2">Password</label>
              <input
                type="password"
                name="Password"
                required
                value={formData.Password}
                onChange={handleChange}
                className="w-full border border-amber-200 rounded-xl px-4 py-2 focus:ring-2 focus:ring-amber-300 outline-none bg-white/95"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-amber-700 text-amber-50 font-semibold py-2 rounded-xl hover:brightness-95 transition-all shadow-inner disabled:opacity-60 uppercase"
            >
              {loading ? "Submitting..." : "Register"}
            </button>

            <p className="text-center text-sm mt-3 text-amber-700">
              Already have an account?{' '}
              <button type="button" onClick={() => navigate('/login')} className="text-amber-900 font-semibold hover:underline">
                Login here
              </button>
            </p>
          </form>
        )}

        {/* Step 2 - OTP Verification */}
        {step === 2 && (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div>
              <label className="block text-amber-800 font-medium mb-2">Enter OTP</label>
              <input
                type="text"
                required
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full border border-amber-200 rounded-xl px-4 py-2 focus:ring-2 focus:ring-amber-300 outline-none bg-white/95"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-amber-700 text-amber-50 font-semibold py-2 rounded-xl hover:brightness-95 transition-all shadow-inner disabled:opacity-60 uppercase"
            >
              {loading ? 'Verifying...' : 'Verify OTP'}
            </button>

            <p className="text-center text-sm mt-3 text-amber-700">
              Didn’t get the OTP?{' '}
              <button
                type="button"
                onClick={handleResendOtp}
                disabled={loading || timer > 0}
                className={`font-semibold ${timer > 0 ? 'text-gray-400 cursor-not-allowed' : 'text-amber-900 hover:underline'}`}
              >
                {timer > 0 ? `Resend in ${timer}s` : 'Resend OTP'}
              </button>
            </p>
          </form>
        )}

        <p className="text-center mt-6 text-xs text-amber-700/80">By registering you agree to our <span className="underline">Terms</span> and <span className="underline">Privacy Policy</span>.</p>
      </div>
    </div>
  );
};

export default Register;
