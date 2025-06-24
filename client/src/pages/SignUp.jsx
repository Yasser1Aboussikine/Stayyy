import React, { useState, useRef, useEffect } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const SignUp = () => {
  const emailRef = useRef(null);
  const navigate = useNavigate();
  const { signup } = useAuth();

  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "client",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Password validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    setLoading(true);

    try {
      // Remove confirmPassword before sending to API
      const { confirmPassword, ...signupData } = formData;

      const result = await signup(signupData);

      if (result.success) {
        navigate("/");
      } else {
        setError(result.error);
      }
    } catch (error) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
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
            <div className="w-full mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          {/* Username */}
          <div className="mt-6 w-full border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6">
            <input
              type="text"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              placeholder="Username"
              className="bg-transparent w-full h-full text-sm outline-none text-gray-700"
              required
            />
          </div>

          {/* Email */}
          <div className="mt-4 w-full border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6">
            <input
              ref={emailRef}
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="bg-transparent w-full h-full text-sm outline-none text-gray-700"
              required
            />
          </div>

          {/* Password */}
          <div className="mt-4 w-full border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="bg-transparent w-full h-full text-sm outline-none text-gray-700"
              required
            />
          </div>

          {/* Confirm Password */}
          <div className="mt-4 w-full border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6">
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              className="bg-transparent w-full h-full text-sm outline-none text-gray-700"
              required
            />
          </div>

          {/* Role */}
          <div className="mt-4 w-full">
            <label className="text-sm text-gray-500 mb-1 block">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full border border-gray-300/60 text-sm rounded-full h-12 px-4 bg-transparent text-gray-700"
            >
              <option value="client">User</option>
              <option value="hotelOwner">Hotel Owner</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full h-11 rounded-full text-white bg-indigo-500 hover:bg-indigo-600 disabled:bg-indigo-400 transition font-semibold text-base shadow-lg"
          >
            {loading ? "Creating Account..." : "Create Account"}
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
