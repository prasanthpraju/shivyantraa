 import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ Email: "", Password: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post(
        "https://shivyantra.onrender.com/api/login",
        formData,
        { headers: { "Content-Type": "application/json" } }
      );

      // ✅ Adjust based on your backend response
      const { refresh_token } = res.data?.user;

      // ✅ Store both tokens locally
      localStorage.setItem("refresh_token", refresh_token);
      localStorage.setItem("Email", formData.Email);
      localStorage.setItem("isLoginned","true")

      // Trigger global auth event
      window.dispatchEvent(new Event("authChange"));
      setMessage("✅ Login Successful!");
      setTimeout(() => navigate("/"), 1200);
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        "❌ Invalid credentials. Please try again.";
      setMessage(msg);
    } finally {
      setLoading(false);
    }
  }; // ✅ this closing brace was missing!

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-red-100 to-red-50 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md border border-red-100">
        <h2 className="text-3xl font-bold text-red-900 text-center mb-6">
          Login
        </h2>

        {message && (
          <p
            className={`text-center mb-4 ${
              message.startsWith("✅") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-gray-700 mb-1 font-medium">Email</label>
            <input
              type="email"
              name="Email"
              placeholder="Enter your email"
              value={formData.Email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-900 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1 font-medium">
              Password
            </label>
            <input
              type="password"
              name="Password"
              placeholder="Enter your password"
              value={formData.Password}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-900 outline-none"
              required
            />
          </div>

          {/* 🔹 Forgot Password Link */}
          <div className="text-right">
            <button
              type="button"
              onClick={() => navigate("/forgotpassword")}
              className="text-sm text-red-900 hover:underline font-semibold cursor-pointer"
            >
              Forgot Password?
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-900 cursor-pointer text-yellow-100 font-semibold py-2 rounded-lg hover:bg-red-800 transition-all"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center mt-5 text-gray-700 text-sm">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-red-900 font-semibold cursor-pointer hover:underline"
          >
            Register here
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
