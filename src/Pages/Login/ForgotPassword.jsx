 import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState(1); // 1 = send OTP, 2 = reset password
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(0);

  // Countdown for resend OTP
  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  // Step 1 - Send OTP
  const handleSendOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const res = await axios.post(
        "https://shivyantra.onrender.com/api/forgot-password",
        { Email: email },
        { headers: { "Content-Type": "application/json" } }
      );

      setMessage("✅ OTP sent to your registered email.");
      setStep(2);
      setTimer(60); // 60s timer for resend
    } catch (err) {
      setMessage(err.response?.data?.message || "❌ Failed to send OTP.");
    } finally {
      setLoading(false);
    }
  };

  // Step 2 - Reset Password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await axios.post(
        "https://shivyantra.onrender.com/api/reset-password",
        { Email: email, otp, newPassword },
        { headers: { "Content-Type": "application/json" } }
      );

      setMessage("✅ Password reset successful! Redirecting...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setMessage(err.response?.data?.message || "❌ Invalid or expired OTP.");
    } finally {
      setLoading(false);
    }
  };

  // Resend OTP
  const handleResendOtp = async () => {
    if (timer > 0) return;
    setLoading(true);
    setMessage("");
    try {
      await axios.post(
        "https://shivyantra.onrender.com/api/forgot-password",
        { Email: email },
        { headers: { "Content-Type": "application/json" } }
      );
      setMessage("🔁 OTP resent successfully!");
      setTimer(60);
    } catch (err) {
      setMessage("❌ Failed to resend OTP.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-red-100 to-red-50 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md border border-red-100">
        <h2 className="text-3xl font-bold text-red-900 text-center mb-6">
          Forgot Password
        </h2>

        {message && (
          <p
            className={`text-center mb-4 font-medium ${
              message.startsWith("✅") || message.startsWith("🔁")
                ? "text-green-700"
                : "text-red-700"
            }`}
          >
            {message}
          </p>
        )}

        {step === 1 ? (
          <form onSubmit={handleSendOTP} className="space-y-5">
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Email Address
              </label>
              <input
                type="email"
                placeholder="Enter your registered email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-900 outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-900 cursor-pointer text-yellow-100 font-semibold py-2 rounded-lg hover:bg-red-800 transition-all"
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleResetPassword} className="space-y-5">
            <div>
              <label className="block text-gray-700 font-medium mb-1">OTP</label>
              <input
                type="text"
                placeholder="Enter the OTP sent to your email"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-900 outline-none"
              />
              <div className="text-sm text-gray-600 mt-2">
                {timer > 0 ? (
                  <span>⏳ Resend OTP in {timer}s</span>
                ) : (
                  <span
                    onClick={handleResendOtp}
                    className="text-red-900 font-semibold cursor-pointer hover:underline"
                  >
                    🔁 Resend OTP
                  </span>
                )}
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">
                New Password
              </label>
              <input
                type="password"
                placeholder="Enter your new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-900 outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-900 cursor-pointer text-yellow-100 font-semibold py-2 rounded-lg hover:bg-red-800 transition-all"
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        )}

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

export default ForgotPassword;
