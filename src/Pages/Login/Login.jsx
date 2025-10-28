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
      localStorage.setItem("token", res.data.token);
      setMessage("✅ Login Successful!");
      setTimeout(() => navigate("/"), 1000);
    } catch (err) {
      setMessage("❌ Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-red-50 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-red-900 text-center mb-4">
          Login
        </h2>

        {message && (
          <p
            className={`text-center mb-3 ${
              message.startsWith("✅") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <input
            type="email"
            name="Email"
            placeholder="Email"
            value={formData.Email}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-900 outline-none"
            required
          />
          <input
            type="password"
            name="Password"
            placeholder="Password"
            value={formData.Password}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-900 outline-none"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-900 text-yellow-100 font-semibold py-2 rounded-lg hover:bg-red-800 transition-all"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center mt-4 text-sm text-gray-700">
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
