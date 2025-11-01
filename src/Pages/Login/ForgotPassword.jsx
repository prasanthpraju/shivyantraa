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
    
    // Email validation
    if (!email || !email.includes('@')) {
      setMessage("❌ Please enter a valid email address.");
      setLoading(false);
      return;
    }

    try {
      console.log("Sending OTP request for email:", email);
      
      const res = await axios.post(
        "https://shivyantra.onrender.com/api/forgot-password",
        { 
          Email: email.trim().toLowerCase() 
        },
        { 
          headers: { 
            "Content-Type": "application/json",
            "Accept": "application/json"
          } 
        }
      );

      console.log("OTP response:", res.data);
      setMessage("✅ OTP sent to your registered email.");
      setStep(2);
      setTimer(60); // 60s timer for resend
    } catch (err) {
      console.error("OTP Error details:", {
        status: err.response?.status,
        data: err.response?.data,
        message: err.message
      });
      
      // More specific error messages
      if (err.response?.status === 400) {
        const errorMsg = err.response?.data?.message || err.response?.data?.error?.message;
        if (errorMsg) {
          setMessage(`❌ ${errorMsg}`);
        } else if (err.response?.data?.error?.name === "ValidationError") {
          setMessage("❌ Invalid email format. Please check your email address.");
        } else {
          setMessage("❌ Email not found or invalid request.");
        }
      } else if (err.response?.status === 404) {
        setMessage("❌ Email not found in our system.");
      } else if (err.response?.status === 429) {
        setMessage("❌ Too many attempts. Please try again later.");
      } else if (err.code === "NETWORK_ERROR" || err.message === "Network Error") {
        setMessage("❌ Network error. Please check your connection.");
      } else {
        setMessage("❌ Failed to send OTP. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Step 2 - Reset Password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    // Validation
    if (!otp || otp.length < 4) {
      setMessage("❌ Please enter a valid OTP.");
      setLoading(false);
      return;
    }

    if (!newPassword || newPassword.length < 6) {
      setMessage("❌ Password must be at least 6 characters long.");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post(
        "https://shivyantra.onrender.com/api/reset-password",
        { 
          Email: email.trim().toLowerCase(), 
          otp: otp.trim(), 
          newPassword: newPassword 
        },
        { 
          headers: { 
            "Content-Type": "application/json",
            "Accept": "application/json"
          } 
        }
      );

      console.log("Reset password response:", res.data);
      setMessage("✅ Password reset successful! Redirecting to login...");
      
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      console.error("Reset Password Error:", err.response?.data || err.message);
      
      if (err.response?.status === 400) {
        const errorMsg = err.response?.data?.message || err.response?.data?.error?.message;
        if (errorMsg) {
          setMessage(`❌ ${errorMsg}`);
        } else {
          setMessage("❌ Invalid or expired OTP.");
        }
      } else if (err.response?.status === 404) {
        setMessage("❌ Session expired. Please request a new OTP.");
      } else {
        setMessage("❌ Failed to reset password. Please try again.");
      }
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
        { 
          Email: email.trim().toLowerCase() 
        },
        { 
          headers: { 
            "Content-Type": "application/json",
            "Accept": "application/json"
          } 
        }
      );
      setMessage("🔁 OTP resent successfully!");
      setTimer(60);
    } catch (err) {
      console.error("Resend OTP Error:", err.response?.data || err.message);
      setMessage("❌ Failed to resend OTP. Please try again.");
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
              <p className="text-xs text-gray-500 mt-1">
                Make sure this is the email you used to register your account.
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-900 text-yellow-100 font-semibold py-2 rounded-lg hover:bg-red-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
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
                placeholder="Enter the 6-digit OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))} // Only numbers
                maxLength={6}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-900 outline-none"
              />
              <div className="text-sm text-gray-600 mt-2">
                {timer > 0 ? (
                  <span>⏳ Resend OTP in {timer}s</span>
                ) : (
                  <button
                    type="button"
                    onClick={handleResendOtp}
                    disabled={loading}
                    className="text-red-900 font-semibold hover:underline disabled:opacity-50"
                  >
                    🔁 Resend OTP
                  </button>
                )}
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">
                New Password
              </label>
              <input
                type="password"
                placeholder="Enter your new password (min. 6 characters)"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                minLength={6}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-900 outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-900 text-yellow-100 font-semibold py-2 rounded-lg hover:bg-red-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Resetting Password..." : "Reset Password"}
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