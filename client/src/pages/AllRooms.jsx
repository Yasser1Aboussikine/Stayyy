import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { assets, facilityIcons, roomsDummyData } from "../assets/assets";
import StarRating from "../components/StarRating";

const CheckBox = ({ label, selected = false, onChange = () => {} }) => {
  return (
    <label className="flex gap-3 items-center cursor-pointer mt-3 text-sm hover:text-[#49B9FF] transition-colors">
      <div className="relative">
        <input
          type="checkbox"
          checked={selected}
          onChange={(e) => onChange(e.target.checked, label)}
          className="sr-only"
        />
        <div
          className={`w-5 h-5 border-2 rounded-md flex items-center justify-center transition-all ${
            selected
              ? "bg-[#49B9FF] border-[#49B9FF]"
              : "border-gray-300 hover:border-[#49B9FF]"
          }`}
        >
          {selected && (
            <svg
              className="w-3 h-3 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </div>
      </div>
      <span className="font-medium select-none">{label}</span>
    </label>
  );
};

const RadioButton = ({ label, selected = false, onChange = () => {} }) => {
  return (
    <label className="flex gap-3 items-center cursor-pointer mt-3 text-sm hover:text-[#49B9FF] transition-colors">
      <div className="relative">
        <input
          type="radio"
          name="sortOption"
          checked={selected}
          onChange={() => onChange(label)}
          className="sr-only"
        />
        <div
          className={`w-5 h-5 border-2 rounded-full flex items-center justify-center transition-all ${
            selected
              ? "border-[#49B9FF]"
              : "border-gray-300 hover:border-[#49B9FF]"
          }`}
        >
          {selected && (
            <div className="w-2.5 h-2.5 bg-[#49B9FF] rounded-full"></div>
          )}
        </div>
      </div>
      <span className="font-medium select-none">{label}</span>
    </label>
  );
};

const AllRooms = () => {
  const navigate = useNavigate();
  const [openFilters, setOpenFilters] = useState(false);

  // Filter state
  const [selectedRoomTypes, setSelectedRoomTypes] = useState([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState("");
  const [selectedSortOption, setSelectedSortOption] = useState("");

  const roomTypes = ["Single Bed", "Double Bed", "Luxury Room", "Family Suite"];

  const priceRanges = [
    "0 to 500",
    "500 to 1000",
    "1000 to 2000",
    "2000 to 3000",
  ];

  const sortOptions = [
    "Price Low to High",
    "Price High to Low",
    "Newest First",
  ];

  // Handlers
  const handleRoomTypeChange = (checked, label) => {
    setSelectedRoomTypes((prev) =>
      checked ? [...prev, label] : prev.filter((item) => item !== label)
    );
  };
  const handlePriceRangeChange = (label) => {
    setSelectedPriceRange(label);
  };
  const handleSortOptionChange = (label) => {
    setSelectedSortOption(label);
  };

  // Handler for clearing all filters
  const handleClearAll = () => {
    setSelectedRoomTypes([]);
    setSelectedPriceRange("");
    setSelectedSortOption("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#eaf6fd] via-white to-[#f4faff] pt-24 pb-20">
      <div className="w-full max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_20rem] gap-8 px-4 md:px-16 lg:px-24 xl:px-32">
        <div className="flex-1">
          <div className="flex flex-col items-start text-left mb-8">
            <h1 className="font-playfair text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Hotel Rooms
            </h1>
            <div className="w-16 h-1 bg-[#49B9FF] rounded-full mb-4"></div>
            <p className="text-lg text-gray-600 max-w-2xl leading-relaxed">
              Take advantage of our limited-time offers and special packages to
              enhance your stay and create unforgettable memories.
            </p>
          </div>

          <div className="space-y-8">
            {roomsDummyData.map((room) => (
              <div
                key={room._id}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex flex-col md:flex-row items-start gap-6">
                  <img
                    onClick={() => {
                      navigate(`/rooms/${room._id}`);
                      scrollTo(0, 0);
                    }}
                    src={room.images[0]}
                    alt="hotel-img"
                    title="View Room Details"
                    className="w-full md:w-1/2 h-64 md:h-48 rounded-xl shadow-md object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
                  />

                  <div className="md:w-1/2 flex flex-col gap-3">
                    <p className="text-[#49B9FF] font-semibold text-sm uppercase tracking-wide">
                      {room.hotel.city}
                    </p>
                    <p
                      onClick={() => {
                        navigate(`/rooms/${room._id}`);
                        scrollTo(0, 0);
                      }}
                      className="text-gray-800 text-2xl md:text-3xl font-playfair font-bold cursor-pointer hover:text-[#49B9FF] transition-colors"
                    >
                      {room.hotel.name}
                    </p>
                    <div className="flex items-center gap-2">
                      <StarRating rating={4.5} />
                      <p className="text-gray-600 text-sm">200+ reviews</p>
                    </div>

                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                      <img
                        src={assets.locationIcon}
                        alt="location-icon"
                        className="w-4 h-4"
                      />
                      <span>{room.hotel.address}</span>
                    </div>

                    {/* Room Amenities */}
                    <div className="flex flex-wrap items-center gap-3 mt-4">
                      {room.amenities.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 px-3 py-2 rounded-full bg-[#49B9FF]/10 border border-[#49B9FF]/20"
                        >
                          <img
                            src={facilityIcons[item]}
                            alt={item}
                            className="w-4 h-4"
                          />
                          <p className="text-xs font-medium text-gray-700">
                            {item}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Room Price Per Night */}
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                      <p className="text-2xl font-bold text-gray-800">
                        ${room.pricePerNight}
                        <span className="text-sm font-normal text-gray-500">
                          {" "}
                          /night
                        </span>
                      </p>
                      <button className="px-6 py-2 bg-[#49B9FF] cursor-pointer text-white font-semibold rounded-full hover:bg-[#2386c8] transition-colors">
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Filters - Desktop */}
        <div className="hidden lg:block">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 sticky top-32 max-h-[calc(100vh-8rem)] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <div className="w-1 h-6 bg-[#49B9FF] rounded-full"></div>
                <p className="text-lg font-bold text-gray-800">Filters</p>
              </div>
              <div>
                <button
                  onClick={handleClearAll}
                  className="bg-[#49B9FF] text-white font-semibold px-4 py-1 rounded-full shadow hover:bg-[#2386c8] transition-all text-sm"
                >
                  Clear All
                </button>
              </div>
            </div>

            <div
              className={`${
                openFilters ? "h-auto" : "h-0 lg:h-auto"
              } overflow-hidden transition-all duration-500`}
            >
              <div className="px-6 py-6">
                <p className="font-bold text-gray-800 mb-4 text-lg">
                  Room Types
                </p>
                {roomTypes.map((room, index) => (
                  <CheckBox
                    key={index}
                    label={room}
                    selected={selectedRoomTypes.includes(room)}
                    onChange={handleRoomTypeChange}
                  />
                ))}
              </div>

              <div className="px-6 py-6 border-t border-gray-100">
                <p className="font-bold text-gray-800 mb-4 text-lg">
                  Price Range
                </p>
                {priceRanges.map((range, index) => (
                  <RadioButton
                    key={index}
                    label={`$${range}`}
                    selected={selectedPriceRange === `$${range}`}
                    onChange={handlePriceRangeChange}
                  />
                ))}
              </div>

              <div className="px-6 py-6 border-t border-gray-100">
                <p className="font-bold text-gray-800 mb-4 text-lg">Sort By</p>
                {sortOptions.map((option, index) => (
                  <RadioButton
                    key={index}
                    label={option}
                    selected={selectedSortOption === option}
                    onChange={handleSortOptionChange}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllRooms;
