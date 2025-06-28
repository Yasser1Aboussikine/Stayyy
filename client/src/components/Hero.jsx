import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { assets, cities } from "../assets/assets";


const TypingEffect = ({ text, speed = 350 }) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, speed);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed]);

  return (
    <h1 className="font-playfair text-2xl md:text-5x md:text-[56px] md:leading-[56px] font-bold md:font-extrabold max-w-xl mt-4">
      {displayText}
      <span className="animate-pulse">|</span>
    </h1>
  );
};

const Hero = () => {
  const navigate = useNavigate();
  const [searchForm, setSearchForm] = useState({
    destination: "",
    checkIn: "",
    checkOut: "",
    guests: 1,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (!searchForm.destination.trim()) {
      setError("Please select a destination");
      return false;
    }
    if (!searchForm.checkIn) {
      setError("Please select check-in date");
      return false;
    }
    if (!searchForm.checkOut) {
      setError("Please select check-out date");
      return false;
    }
    if (searchForm.guests < 1) {
      setError("Please select at least 1 guest");
      return false;
    }

    const checkIn = new Date(searchForm.checkIn);
    const checkOut = new Date(searchForm.checkOut);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (checkIn < today) {
      setError("Check-in date cannot be in the past");
      return false;
    }
    if (checkOut <= checkIn) {
      setError("Check-out date must be after check-in date");
      return false;
    }

    setError("");
    return true;
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError("");

    try {
      const searchParams = {
        city: searchForm.destination,
        checkInDate: searchForm.checkIn,
        checkOutDate: searchForm.checkOut,
        guests: searchForm.guests,
        page: 1,
        limit: 20,
      };
      const queryString = new URLSearchParams(searchParams).toString();
      navigate(`/hotels?${queryString}`);
    } catch (err) {
      setError("Search failed. Please try again.");
      console.error("Search error:", err);
    } finally {
      setLoading(false);
    }
  };
  const today = new Date().toISOString().split("T")[0];
  const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0];

  return (
    <div className="relative h-screen">
      {/* Background image with filter */}
      <div
        className="absolute inset-0 bg-[url('/src/assets/homeImg.jpg')] 
         bg-no-repeat bg-cover bg-center"
        style={{
          filter: "brightness(0.5) contrast(1.1)",
        }}
      />


      <div
        className="relative z-10 flex flex-col items-start justify-center px-6
       md:px-16 lg:px-24 xl:px-32 text-white h-full"
      >
        <p className="bg-[#49B9FF]/50 px-3.5 py-1 rounded-full mt-20">
          The Ultimate Hotel Experience
        </p>
        {/* added some typing effects for better UI*/}
        <TypingEffect
          text="Discover Your Perfect Gateway Destination"
          speed={80}
        />
        <p className="max-w-130 mt-2 text-sm md:text-base">
          Unparalled luxury and comfort await at the world's most exclusive
          hotels and resorts. Start your journey today.
        </p>

        <form
          onSubmit={handleSearch}
          className="bg-white/90 text-gray-700 rounded-2xl shadow-xl px-4 py-3 mt-10 flex flex-col md:flex-row max-md:items-start gap-4 max-md:mx-auto border border-[#49B9FF]/10 backdrop-blur-md mx-auto w-full max-w-4xl"
        >
          {/* Error Message */}
          {error && (
            <div className="absolute -top-12 left-0 right-0 bg-red-500 text-white px-4 py-2 rounded-lg text-sm text-center">
              {error}
            </div>
          )}

          <div className="flex flex-col min-w-[180px]">
            <div className="flex items-center gap-2 mb-1">
              <img
                src={assets.locationIcon}
                alt=""
                className="h-5 w-5 text-[#49B9FF]"
              />
              <label
                htmlFor="destinationInput"
                className="font-semibold text-base"
              >
                Destination
              </label>
            </div>
            <input
              list="destinations"
              id="destinationInput"
              name="destination"
              type="text"
              value={searchForm.destination}
              onChange={handleInputChange}
              className="rounded-2xl border border-gray-200 px-4 py-2 text-sm outline-none focus:border-[#49B9FF] focus:ring-2 focus:ring-[#49B9FF]/30 transition-all placeholder-gray-400 bg-white"
              placeholder="Where are you going?"
              required
            />
            <datalist id="destinations">
              {cities.map((city, index) => (
                <option value={city} key={index} />
              ))}
            </datalist>
          </div>

          <div className="flex flex-col min-w-[160px]">
            <div className="flex items-center gap-2 mb-1">
              <img
                src={assets.calenderIcon}
                alt=""
                className="h-5 w-5 text-[#49B9FF]"
              />
              <label htmlFor="checkIn" className="font-semibold text-base">
                Check in
              </label>
            </div>
            <input
              id="checkIn"
              name="checkIn"
              type="date"
              value={searchForm.checkIn}
              onChange={handleInputChange}
              min={today}
              className="rounded-2xl border border-gray-200 px-4 py-2 text-sm outline-none focus:border-[#49B9FF] focus:ring-2 focus:ring-[#49B9FF]/30 transition-all placeholder-gray-400 bg-white"
              required
            />
          </div>

          <div className="flex flex-col min-w-[160px]">
            <div className="flex items-center gap-2 mb-1">
              <img
                src={assets.calenderIcon}
                alt=""
                className="h-5 w-5 text-[#49B9FF]"
              />
              <label htmlFor="checkOut" className="font-semibold text-base">
                Check out
              </label>
            </div>
            <input
              id="checkOut"
              name="checkOut"
              type="date"
              value={searchForm.checkOut}
              onChange={handleInputChange}
              min={searchForm.checkIn || tomorrow}
              className="rounded-2xl border border-gray-200 px-4 py-2 text-sm outline-none focus:border-[#49B9FF] focus:ring-2 focus:ring-[#49B9FF]/30 transition-all placeholder-gray-400 bg-white"
              required
            />
          </div>

          <div className="flex flex-col min-w-[100px]">
            <div className="flex items-center gap-2 mb-1">
              <img
                src={assets.guestsIcon}
                alt=""
                className="h-5 w-5 text-[#49B9FF]"
              />
              <label htmlFor="guests" className="font-semibold text-base">
                Guests
              </label>
            </div>
            <input
              min={1}
              max={10}
              id="guests"
              name="guests"
              type="number"
              value={searchForm.guests}
              onChange={handleInputChange}
              className="rounded-2xl border border-gray-200 px-4 py-2 text-sm outline-none max-w-16 focus:border-[#49B9FF] focus:ring-2 focus:ring-[#49B9FF]/30 transition-all placeholder-gray-400 bg-white"
              placeholder="1"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center gap-2 rounded-2xl bg-[#49B9FF] py-3 px-7 text-white font-bold text-lg my-auto cursor-pointer max-md:w-full max-md:py-2 shadow-lg hover:bg-[#2386c8] transition-all disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Searching...</span>
              </>
            ) : (
              <>
                <img
                  src={assets.searchIcon}
                  alt="searchIcon"
                  className="h-6 w-6"
                />
                <span>Search</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Hero;
