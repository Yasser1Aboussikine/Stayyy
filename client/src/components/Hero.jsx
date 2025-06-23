import React, { useState, useEffect } from "react";
import { assets, cities } from "../assets/assets";

const TypingEffect = ({ text, speed = 350 }) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  //writing effect
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

      {/* Content overlay */}
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

        <form className="bg-white/90 text-gray-700 rounded-2xl shadow-xl px-4 py-3 mt-10 flex flex-col md:flex-row max-md:items-start gap-4 max-md:mx-auto border border-[#49B9FF]/10 backdrop-blur-md mx-auto w-full max-w-4xl">
          <div className="flex flex-col min-w-[180px]">
            <div className="flex items-center gap-2 mb-1">
              <img
                src={assets.calenderIcon}
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
              type="text"
              className="rounded-2xl border border-gray-200 px-4 py-2 text-sm outline-none focus:border-[#49B9FF] focus:ring-2 focus:ring-[#49B9FF]/30 transition-all placeholder-gray-400 bg-white"
              placeholder="Type here"
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
              type="date"
              className="rounded-2xl border border-gray-200 px-4 py-2 text-sm outline-none focus:border-[#49B9FF] focus:ring-2 focus:ring-[#49B9FF]/30 transition-all placeholder-gray-400 bg-white"
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
              type="date"
              className="rounded-2xl border border-gray-200 px-4 py-2 text-sm outline-none focus:border-[#49B9FF] focus:ring-2 focus:ring-[#49B9FF]/30 transition-all placeholder-gray-400 bg-white"
            />
          </div>

          <div className="flex flex-col min-w-[100px]">
            <label htmlFor="guests" className="font-semibold text-base mb-1">
              Guests
            </label>
            <input
              min={1}
              max={4}
              id="guests"
              type="number"
              className="rounded-2xl border border-gray-200 px-4 py-2 text-sm outline-none max-w-16 focus:border-[#49B9FF] focus:ring-2 focus:ring-[#49B9FF]/30 transition-all placeholder-gray-400 bg-white"
              placeholder="0"
            />
          </div>

          <button className="flex items-center justify-center gap-2 rounded-2xl bg-[#49B9FF] py-3 px-7 text-white font-bold text-lg my-auto cursor-pointer max-md:w-full max-md:py-2 shadow-lg hover:bg-[#2386c8] transition-all">
            <img src={assets.searchIcon} alt="searchIcon" className="h-6 w-6" />
            <span>Search</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Hero;
