import React, { useState, useRef, useEffect } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const emailRef = useRef(null);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("User");
  const [rememberMe, setRememberMe]   = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setError("");
    const formData = { email, username, password, role, rememberMe };
    console.log("User submitted:", formData);
    // Send to backend / context / Clerk / Firebase etc.
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen w-full bg-gradient-to-br from-[#eaf6fd] via-white to-[#f4faff]">
      {/* Form Section */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center py-10 px-4 sm:px-8">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-xs sm:max-w-sm md:max-w-md flex flex-col items-center justify-center bg-white rounded-2xl shadow-xl p-6 sm:p-8"
        >
          {/* Logo */}
          <img
            src={assets.logo}
            alt="Stayyy Logo"
            className="h-10 sm:h-12 mb-3 sm:mb-4"
          />
          <h2 className="text-3xl sm:text-4xl text-gray-900 font-bold font-playfair mb-2 text-center">
            Sign Up
          </h2>
          <p className="text-sm text-gray-500/90 mb-6 text-center">
            Create your account to get started
          </p>

          {/* Error */}
          {error && (
            <p className="text-red-500 text-sm mt-4 font-medium">{error}</p>
          )}

          {/* Email */}
          <div className="mt-6 w-full border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6">
            <input
              ref={emailRef}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
              className="bg-transparent w-full h-full text-sm outline-none text-gray-700"
              required
            />
          </div>

          {/* Username */}
          <div className="mt-4 w-full border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6">
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              placeholder="Username"
              className="bg-transparent w-full h-full text-sm outline-none text-gray-700"
              required
            />
          </div>

          {/* Password */}
          <div className="mt-4 w-full border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6">
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
              className="bg-transparent w-full h-full text-sm outline-none text-gray-700"
              required
            />
          </div>

          {/* Confirm Password */}
          <div className="mt-4 w-full border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6">
            <input
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              type="password"
              placeholder="Confirm Password"
              className="bg-transparent w-full h-full text-sm outline-none text-gray-700"
              required
            />
          </div>

          {/* Role */}
          <div className="mt-4 w-full">
            <label className="text-sm text-gray-500 mb-1 block">Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full border border-gray-300/60 text-sm rounded-full h-12 px-4 bg-transparent text-gray-700"
            >
              <option value="User">User</option>
              <option value="HotelOwner">Hotel Owner</option>
            </select>
          </div>

          {/* Remember Me */}
          <div className="w-full flex items-center justify-between mt-6 text-gray-500/80 text-xs">
            <div className="flex items-center gap-2">
              <input
                className="h-4 w-4 accent-indigo-500"
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                id="remember"
              />
              <label className="text-xs" htmlFor="remember">
                Remember me
              </label>
            </div>
            <a
              className="text-xs underline hover:text-indigo-500 transition"
              href="#"
            >
              Forgot password?
            </a>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="mt-6 w-full h-11 rounded-full text-white bg-indigo-500 hover:bg-indigo-600 transition font-semibold text-base shadow-lg"
          >
            Create Account
          </button>

          {/* Already have an account */}
          <p className="text-gray-500/90 text-xs mt-4 text-center">
            Already have an account?{" "}
            <button
              type="button"
              className="text-indigo-400 hover:underline ml-1 transition"
              onClick={() => navigate("/signin")}
            >
              Sign in
            </button>
          </p>
        </form>
      </div>

      {/* Image Section */}
      <div className="w-full hidden md:inline-block md:w-1/2 flex-shrink-0 h-56 md:h-auto relative">
        <img
          className="h-full w-full object-cover rounded-l-3xl shadow-2xl transition-all duration-300"
          src={assets.sign_up}
          alt="sign-up"
        />
      </div>
    </div>
  );
};

export default SignUp;
