 import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    Email: "",
    Password: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle login submit
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post(
        "https://shivyantra.onrender.com/api/login", // 🔥 replace with your backend route
        formData,
        { headers: { "Content-Type": "application/json" } }
      );

      setLoading(false);
      setMessage("✅ Login Successful!");
      localStorage.setItem("token", res.data.token); // Save JWT or session token if backend sends one

      // Redirect to homepage or dashboard
      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      setLoading(false);
      setMessage(
        err.response?.data?.message ||
          "❌ Invalid email or password. Please try again."
      );
    }
  };

  return (
    <div className="min-h-screen bg-red-50 flex items-center justify-center px-4 py-10">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8 border border-red-100">
        <h2 className="text-3xl font-bold text-center text-red-900 mb-6 uppercase">
          Login
        </h2>

        {message && (
          <div
            className={`text-center mb-4 font-medium ${
              message.startsWith("✅")
                ? "text-green-700"
                : "text-red-700"
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
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
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="text-center text-sm mt-3 text-gray-700">
            Don’t have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/register")}
              className="text-red-900 font-semibold hover:underline"
            >
              Register here
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
