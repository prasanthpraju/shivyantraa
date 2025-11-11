 import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Forgotbg from "../../../src/assets/ii.png"; // same background as others

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendLink = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (!email || !email.includes("@")) {
      setMessage("❌ Please enter a valid email address.");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post(
        "https://shivyantra.onrender.com/api/forgot-password",
        { Email: email.trim().toLowerCase() },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      console.log("Forgot password response:", res.data);
      setMessage("✅ Password reset link has been sent to your email.");
    } catch (err) {
      console.error("Forgot password error:", err.response?.data || err.message);
      const errMsg =
        err.response?.data?.message ||
        err.response?.data?.error?.message ||
        "❌ Failed to send reset link. Please try again.";
      setMessage(`❌ ${errMsg}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{
        backgroundImage: `linear-gradient(180deg, rgba(250,245,235,0.95), rgba(241,233,211,0.95)), url(${Forgotbg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-black/10 to-black/25"></div>

      <div className="relative z-10 w-full max-w-md p-8 md:p-10 rounded-3xl shadow-2xl bg-amber-50/95 border border-amber-200">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-red-900">Forgot Password</h2>
            <p className="text-sm text-amber-800/90">Enter your registered email to receive a reset link</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-red-900 to-amber-600 flex items-center justify-center shadow-md">
            <span className="text-yellow-100 font-bold">SV</span>
          </div>
        </div>

        {message && (
          <p className={`text-center mb-4 px-4 py-2 rounded-md text-sm font-medium ${message.startsWith("✅") ? "text-green-700 bg-green-50" : "text-red-800 bg-red-50"}`}>
            {message}
          </p>
        )}

        <form onSubmit={handleSendLink} className="space-y-5">
          <div>
            <label className="block text-amber-800 font-medium mb-2">Email Address</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-600/80" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2.94 6.94a2 2 0 01.36-.3L10 2l6.7 4.64c.12.08.24.17.35.28A2 2 0 0118 8v6a2 2 0 01-2 2H4a2 2 0 01-2-2V8c0-.35.07-.68.19-.98z" />
                </svg>
              </span>
              <input
                type="email"
                placeholder="Enter your registered email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border border-amber-200 rounded-xl pl-11 pr-3 py-2 focus:ring-2 focus:ring-amber-300 outline-none bg-white/95"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-amber-700 text-amber-50 font-semibold py-2 rounded-xl hover:brightness-95 transition-all disabled:opacity-60"
          >
            {loading ? "Sending Link..." : "Send Reset Link"}
          </button>
        </form>

        <p className="text-center mt-5 text-amber-700 text-sm">Back to{' '}
          <span onClick={() => navigate('/login')} className="text-amber-900 font-semibold cursor-pointer hover:underline">Login</span>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
