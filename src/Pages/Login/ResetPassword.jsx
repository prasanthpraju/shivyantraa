import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-red-100 to-red-50 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md border border-red-100">
        <h2 className="text-3xl font-bold text-red-900 text-center mb-6">
          Reset Password
        </h2>

        {message && (
          <p
            className={`text-center mb-4 font-medium ${
              message.startsWith("✅") ? "text-green-700" : "text-red-700"
            }`}
          >
            {message}
          </p>
        )}

        <p className="text-gray-600 text-sm mb-3 text-center">
          Resetting password for <strong>{email}</strong>
        </p>

        <form onSubmit={handleResetPassword} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              New Password
            </label>
            <input
              type="password"
              placeholder="Enter new password (min. 6 characters)"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-900 outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-900 text-yellow-100 font-semibold py-2 rounded-lg hover:bg-red-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>

        <p className="text-center mt-5 text-gray-700 text-sm">
          Back to{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-red-900 font-semibold cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;
