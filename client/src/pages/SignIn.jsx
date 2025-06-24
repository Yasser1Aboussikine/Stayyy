import React, { useState, useRef, useEffect } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const SignIn = () => {
  const formRef = useRef(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    formRef.current?.focus();
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
    setLoading(true);

    try {
      const result = await login(formData.email, formData.password);
      
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
      {/* Image Section */}
      <div className="w-full md:w-1/2 flex-shrink-0 h-56 md:h-auto relative hidden md:block">
        <img
          className="h-full w-full object-cover rounded-l-3xl shadow-2xl cursor-pointer transition-all duration-300"
          src={assets.sign_in}
          alt="sign-in img"
        />
      </div>

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
            className="h-10 sm:h-12 mb-3 sm:mb-4 cursor-pointer"
            onClick={() => {
              navigate("/");
            }}
          />
          <h2 className="text-3xl sm:text-4xl text-gray-900 font-bold font-playfair mb-2 text-center">
            Sign In
          </h2>
          <p className="text-sm text-gray-500/90 mb-6 text-center">
            Welcome back! Please sign in to continue
          </p>

          {/* Error Message */}
          {error && (
            <div className="w-full mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          <button
            type="button"
            className="w-full mb-6 bg-gray-500/10 flex items-center justify-center h-12 rounded-full hover:bg-gray-200 cursor-pointer transition-all"
          >
            <img
              src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/googleLogo.svg"
              alt="googleLogo"
              className="h-5 w-5 mr-2"
            />
            <span className="text-gray-700 font-medium">
              Sign in with Google
            </span>
          </button>

          <div className="flex items-center gap-4 w-full my-4">
            <div className="w-full h-px bg-gray-300/90"></div>
            <p className="w-full text-nowrap text-xs text-gray-500/90 text-center">
              or sign in with email
            </p>
            <div className="w-full h-px bg-gray-300/90"></div>
          </div>

          <div className="flex items-center w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2 mb-4">
            <svg
              width="16"
              height="11"
              viewBox="0 0 16 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0 .55.571 0H15.43l.57.55v9.9l-.571.55H.57L0 10.45zm1.143 1.138V9.9h13.714V1.69l-6.503 4.8h-.697zM13.749 1.1H2.25L8 5.356z"
                fill="#6B7280"
              />
            </svg>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="bg-transparent text-gray-700 placeholder-gray-500/80 outline-none text-sm w-full h-full"
              ref={formRef}
              required
            />
          </div>

          <div className="flex items-center w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2 mb-4">
            <svg
              width="13"
              height="17"
              viewBox="0 0 13 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13 8.5c0-.938-.729-1.7-1.625-1.7h-.812V4.25C10.563 1.907 8.74 0 6.5 0S2.438 1.907 2.438 4.25V6.8h-.813C.729 6.8 0 7.562 0 8.5v6.8c0 .938.729 1.7 1.625 1.7h9.75c.896 0 1.625-.762 1.625-1.7zM4.063 4.25c0-1.406 1.093-2.55 2.437-2.55s2.438 1.144 2.438 2.55V6.8H4.061z"
                fill="#6B7280"
              />
            </svg>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="bg-transparent text-gray-700 placeholder-gray-500/80 outline-none text-sm w-full h-full"
              required
            />
          </div>

          <div className="w-full flex items-center justify-between mt-2 text-gray-500/80 text-xs">
            <div className="flex items-center gap-2">
              <input
                className="h-4 w-4 accent-indigo-500"
                type="checkbox"
                id="checkbox"
              />
              <label className="text-xs" htmlFor="checkbox">
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

          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full h-11 rounded-full text-white bg-indigo-500 hover:bg-indigo-600 disabled:bg-indigo-400 transition font-semibold text-base shadow-lg"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
          <p className="text-gray-500/90 text-xs mt-4 text-center">
            Don't have an account?{" "}
            <button
              type="button"
              className="text-indigo-400 hover:underline ml-1 transition"
              onClick={() => navigate("/signup")}
            >
              Sign up
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};
export default SignIn;
