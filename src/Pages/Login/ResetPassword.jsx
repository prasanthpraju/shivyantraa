 import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import Resetbg from "../../../src/assets/ii.png"; // same background as login/register

const ResetPassword = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const email = params.get("email");
  const code = params.get("code");

  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (!newPassword || newPassword.length < 6) {
      setMessage("❌ Password must be at least 6 characters long.");
      setLoading(false);
      return;
    }

    console.log("Email:", email);
    console.log("Code:", code);

    try {
      const res = await axios.post(
        "https://shivyantra.onrender.com/api/reset-password",
        {
          Email: email,
          code,
          newPassword: newPassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      console.log("Reset password response:", res.data);
      setMessage("✅ Password reset successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      console.error("Reset password error:", err.response?.data || err.message);
      const errMsg =
        err.response?.data?.message ||
        err.response?.data?.error?.message ||
        "❌ Failed to reset password. Please try again.";
      setMessage(`❌ ${errMsg}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{
        backgroundImage: `linear-gradient(180deg, rgba(250,245,235,0.95), rgba(241,233,211,0.95)), url(${Resetbg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* warm vignette overlay */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-black/10 to-black/30"></div>

      <div className="relative z-10 w-full max-w-md p-8 md:p-10 rounded-3xl shadow-2xl bg-amber-50/95 border border-amber-200">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-red-900">Reset Password</h2>
            <p className="text-sm text-amber-800/90">Securely update your password</p>
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

        <p className="text-gray-600 text-sm mb-3 text-center">Resetting password for <strong>{email}</strong></p>

        <form onSubmit={handleResetPassword} className="space-y-5">
          <div>
            <label className="block text-amber-800 font-medium mb-2">New Password</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-600/80" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5 8V6a5 5 0 1110 0v2h1a1 1 0 011 1v7a1 1 0 01-1 1H4a1 1 0 01-1-1v-7a1 1 0 011-1h1zm2-2a3 3 0 116 0v2H7V6z" clipRule="evenodd" />
                </svg>
              </span>
              <input
                type="password"
                placeholder="Enter new password (min. 6 characters)"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
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
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>

        <p className="text-center mt-5 text-amber-700 text-sm">Back to{' '}
          <span onClick={() => navigate('/login')} className="text-amber-900 font-semibold cursor-pointer hover:underline">Login</span>
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;
