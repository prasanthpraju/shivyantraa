 import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Loginbg from "../../../src/assets/ii.png";

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

      const user = res?.data?.user || {};
      const token = res?.data?.refresh_token || user.refresh_token || "";

<<<<<<< HEAD
      // 🔥 CRUCIAL FIX: Store the token as 'jwt' for API consistency
      localStorage.setItem("jwt", token); 
      // The old key is no longer strictly necessary but kept for backward compatibility if other parts of the app rely on it.
      localStorage.setItem("refresh_token", token); 
      
=======
      localStorage.setItem("refresh_token", token);
>>>>>>> eae1dac0198b1ef088ee2b7043bfd9d3a39d88f0
      localStorage.setItem("Email", formData.Email || user.Email || "");
      localStorage.setItem("isLoginned", "true");
      localStorage.setItem("username", user.username || user.name || "User");
      localStorage.setItem("MobileNumber", user.MobileNumber || "");

      window.dispatchEvent(new Event("authChange"));

      await Swal.fire({
        icon: "success",
        title: "Login Successful 🎉",
        text: `Welcome back, ${user.username || user.name || "User"}!`,
        confirmButtonColor: "#a10202",
        confirmButtonText: "Continue",
        background: "#fff",
      });

      navigate("/");
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        "❌ Invalid credentials. Please try again.";
      setMessage(msg);

      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: msg,
        confirmButtonColor: "#a10202",
        confirmButtonText: "Try Again",
        background: "#fff",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 relative"
      style={{
<<<<<<< HEAD
=======
        // classic / vintage style: subtle parchment gradient blended with provided image
>>>>>>> eae1dac0198b1ef088ee2b7043bfd9d3a39d88f0
        backgroundImage: `linear-gradient(180deg, rgba(250,245,235,0.95), rgba(241,233,211,0.95)), url(${Loginbg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* warm vignette overlay for classic feel */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-black/10 to-black/25 mix-blend-multiply"></div>

      {/* centered card */}
      <div className="relative z-10 w-full max-w-lg p-8 md:p-10 rounded-3xl shadow-2xl bg-amber-50/95 border border-amber-200">
        {/* header */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-shrink-0 w-14 h-14 rounded-full bg-gradient-to-tr from-red-900 to-amber-600 flex items-center justify-center shadow-md">
            {/* subtle monogram */}
            <span className="text-yellow-100 font-bold text-lg">SV</span>
          </div>

          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-red-900">Welcome back</h2>
            <p className="text-sm text-amber-800/80">Login to continue to Shivyantra</p>
          </div>
        </div>

        {message && (
          <p
            className={`text-center mb-4 px-4 py-2 rounded-md text-sm font-medium ${
              message.startsWith("✅") ? "text-green-700 bg-green-50" : "text-red-800 bg-red-50"
            }`}
          >
            {message}
          </p>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-amber-800 mb-2 font-medium">Email</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                {/* mail icon */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-600/80" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2.94 6.94a2 2 0 01.36-.3L10 2l6.7 4.64c.12.08.24.17.35.28A2 2 0 0118 8v6a2 2 0 01-2 2H4a2 2 0 01-2-2V8c0-.35.07-.68.19-.98z" />
                </svg>
              </span>
              <input
                type="email"
                name="Email"
                placeholder="you@example.com"
                value={formData.Email}
                onChange={handleChange}
                className="w-full border border-amber-200 rounded-xl pl-11 pr-3 py-2 focus:ring-2 focus:ring-amber-300 outline-none bg-white/95"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-amber-800 mb-2 font-medium">Password</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                {/* lock icon */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-600/80" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5 8V6a5 5 0 1110 0v2h1a1 1 0 011 1v7a1 1 0 01-1 1H4a1 1 0 01-1-1v-7a1 1 0 011-1h1zm2-2a3 3 0 116 0v2H7V6z" clipRule="evenodd" />
                </svg>
              </span>
              <input
                type="password"
                name="Password"
                placeholder="Enter your password"
                value={formData.Password}
                onChange={handleChange}
                className="w-full border border-amber-200 rounded-xl pl-11 pr-3 py-2 focus:ring-2 focus:ring-amber-300 outline-none bg-white/95"
                required
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => navigate("/forgot-password")}
              className="text-sm text-amber-900 hover:underline font-medium"
            >
              Forgot Password?
            </button>

            <div className="text-sm text-amber-700"> 
              <span className="hidden md:inline">Need an account?</span>
              <span
                onClick={() => navigate("/register")}
                className="ml-2 text-amber-900 font-semibold cursor-pointer hover:underline"
              >
                Register
              </span>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-amber-700 text-amber-50 font-semibold py-2 rounded-xl hover:brightness-95 transition-all shadow-inner disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* subtle footer */}
        <p className="text-center mt-6 text-xs text-amber-700/80">
          By continuing, you agree to our <span className="underline">Terms</span> and <span className="underline">Privacy Policy</span>.
        </p>
      </div>
    </div>
  );
};

<<<<<<< HEAD
export default Login;
=======
export default Login;
>>>>>>> eae1dac0198b1ef088ee2b7043bfd9d3a39d88f0
