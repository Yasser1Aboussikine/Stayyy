import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { assets, facilityIcons } from "../assets/assets";
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
  const [searchTerm, setSearchTerm] = useState("");

  // Data state
  const [roomsData, setRoomsData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
    setSearchTerm("");
  };

  // Fetch rooms directly
  useEffect(() => {
    const fetchRooms = async () => {
      setLoading(true);
      setError(null);

      // Build query params
      const params = new URLSearchParams();
      params.append("limit", 10);

      if (searchTerm) params.append("search", searchTerm);

      if (selectedPriceRange) {
        const [min, max] = selectedPriceRange.split(" to ");
        params.append("minPrice", min);
        params.append("maxPrice", max);
      }

      if (selectedRoomTypes.length > 0) {
        params.append("amenities", selectedRoomTypes.join(","));
      }

      if (selectedSortOption) {
        switch (selectedSortOption) {
          case "Price Low to High":
            params.append("sort", "price");
            params.append("order", "asc");
            break;
          case "Price High to Low":
            params.append("sort", "price");
            params.append("order", "desc");
            break;
          case "Newest First":
            params.append("sort", "createdAt");
            params.append("order", "desc");
            break;
          default:
            break;
        }
      }

      try {
        const res = await fetch(`/api/hotels?${params.toString()}`);
        const contentType = res.headers.get("content-type");
        const text = await res.text();

        if (!text) {
          throw new Error("Empty response from server");
        }

        let data;
        if (contentType && contentType.includes("application/json")) {
          data = JSON.parse(text);
        } else {
          throw new Error(text || "Unknown error");
        }
        if (!res.ok) {
          throw new Error(data.message || "Failed to fetch rooms");
        }
        setRoomsData(data);
      } catch (err) {
        setError(err.message || "Failed to fetch rooms");
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, [searchTerm, selectedPriceRange, selectedRoomTypes, selectedSortOption]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#eaf6fd] via-white to-[#f4faff] pt-24 pb-20">
        <div className="w-full max-w-[1600px] mx-auto px-4 md:px-16 lg:px-24 xl:px-32">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#49B9FF]"></div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#eaf6fd] via-white to-[#f4faff] pt-24 pb-20">
        <div className="w-full max-w-[1600px] mx-auto px-4 md:px-16 lg:px-24 xl:px-32">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <p className="text-red-500 text-lg mb-4">Error loading rooms</p>
              <p className="text-gray-600">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 px-6 py-2 bg-[#49B9FF] text-white rounded-lg hover:bg-[#3a9be8] transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const rooms = roomsData?.rooms || [];

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

          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search rooms by name or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#49B9FF] focus:border-transparent"
              />
              <img
                src={assets.searchIcon}
                alt="search"
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
              />
            </div>
          </div>

          {/* Loading indicator for data updates */}
          {loading && (
            <div className="flex justify-center mb-4">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#49B9FF]"></div>
            </div>
          )}

          <div className="space-y-8">
            {rooms.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No rooms found</p>
                <p className="text-gray-400">Try adjusting your filters</p>
              </div>
            ) : (
              rooms.map((room) => (
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
                      src={room.images?.[0] || assets.roomImg1}
                      alt="hotel-img"
                      title="View Room Details"
                      className="w-full md:w-1/2 h-64 md:h-48 rounded-xl shadow-md object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
                    />

                    <div className="md:w-1/2 flex flex-col gap-3">
                      <p className="text-[#49B9FF] font-semibold text-sm uppercase tracking-wide">
                        {room.hotel?.city || "Hotel"}
                      </p>
                      <p
                        onClick={() => {
                          navigate(`/rooms/${room._id}`);
                          scrollTo(0, 0);
                        }}
                        className="text-gray-800 text-2xl md:text-3xl font-playfair font-bold cursor-pointer hover:text-[#49B9FF] transition-colors"
                      >
                        {room.name}
                      </p>
                      <div className="flex items-center gap-2">
                        <StarRating rating={room.rating || 4.5} />
                        <p className="text-gray-600 text-sm">200+ reviews</p>
                      </div>

                      <div className="flex items-center gap-2 text-gray-500 text-sm">
                        <img
                          src={assets.locationIcon}
                          alt="location-icon"
                          className="w-4 h-4"
                        />
                        <span>
                          {room.hotel?.address || "Address not available"}
                        </span>
                      </div>

                      {/* Room Description */}
                      <p className="text-gray-600 text-sm line-clamp-2">
                        {room.description}
                      </p>

                      {/* Room Amenities */}
                      <div className="flex flex-wrap items-center gap-3 mt-4">
                        {room.amenities?.slice(0, 3).map((item, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-2 px-3 py-2 rounded-full bg-[#49B9FF]/10 border border-[#49B9FF]/20"
                          >
                            <img
                              src={facilityIcons[item] || assets.freeWifiIcon}
                              alt={item}
                              className="w-4 h-4"
                            />
                            <p className="text-xs font-medium text-gray-700">
                              {item}
                            </p>
                          </div>
                        ))}
                        {room.amenities?.length > 3 && (
                          <span className="text-xs text-gray-500">
                            +{room.amenities.length - 3} more
                          </span>
                        )}
                      </div>

                      {/* Room Price Per Night */}
                      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                        <p className="text-2xl font-bold text-gray-800">
                          ${room.price}
                          <span className="text-sm font-normal text-gray-500">
                            {" "}
                            /night
                          </span>
                        </p>
                        <button
                          onClick={() => {
                            navigate(`/rooms/${room._id}`);
                            scrollTo(0, 0);
                          }}
                          className="px-6 py-2 bg-[#49B9FF] text-white rounded-lg hover:bg-[#3a9be8] transition-colors"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Filters Sidebar */}
        <div className="lg:w-80">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sticky top-24">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-800">Filters</h3>
              <button
                onClick={() => setOpenFilters(!openFilters)}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
              >
                <img
                  src={openFilters ? assets.closeIcon : assets.menuIcon}
                  alt="toggle filters"
                  className="w-5 h-5"
                />
              </button>
            </div>

            <div className={`${openFilters ? "block" : "hidden"} lg:block`}>
              {/* Room Types */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-800 mb-3">Room Types</h4>
                {roomTypes.map((type) => (
                  <CheckBox
                    key={type}
                    label={type}
                    selected={selectedRoomTypes.includes(type)}
                    onChange={handleRoomTypeChange}
                  />
                ))}
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-800 mb-3">
                  Price Range
                </h4>
                {priceRanges.map((range) => (
                  <RadioButton
                    key={range}
                    label={range}
                    selected={selectedPriceRange === range}
                    onChange={handlePriceRangeChange}
                  />
                ))}
              </div>

              {/* Sort Options */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-800 mb-3">Sort By</h4>
                {sortOptions.map((option) => (
                  <RadioButton
                    key={option}
                    label={option}
                    selected={selectedSortOption === option}
                    onChange={handleSortOptionChange}
                  />
                ))}
              </div>

              {/* Clear All Button */}
              <button
                onClick={handleClearAll}
                className="w-full py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllRooms;
