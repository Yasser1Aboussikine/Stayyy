import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import {useRef, useEffect} from 'react';
import { roomsAPI } from "../services/api";
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

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = [];
  const maxVisiblePages = 5;

  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Previous
      </button>

      {startPage > 1 && (
        <>
          <button
            onClick={() => onPageChange(1)}
            className="px-3 py-2 rounded-lg border border-gray-300 hover:bg-gray-50"
          >
            1
          </button>
          {startPage > 2 && <span className="px-2">...</span>}
        </>
      )}

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-2 rounded-lg border ${
            currentPage === page
              ? "bg-[#49B9FF] text-white border-[#49B9FF]"
              : "border-gray-300 hover:bg-gray-50"
          }`}
        >
          {page}
        </button>
      ))}

      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && <span className="px-2">...</span>}
          <button
            onClick={() => onPageChange(totalPages)}
            className="px-3 py-2 rounded-lg border border-gray-300 hover:bg-gray-50"
          >
            {totalPages}
          </button>
        </>
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  );
};

const AllRooms = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [openFilters, setOpenFilters] = useState(false);
  const formRef = useRef();
  // Read URL search parameters
  const searchParams = new URLSearchParams(location.search);
  const urlCity = searchParams.get("city");
  const urlCheckInDate = searchParams.get("checkInDate");
  const urlCheckOutDate = searchParams.get("checkOutDate");
  const urlGuests = searchParams.get("guests");

  // Filter state
  const [selectedRoomTypes, setSelectedRoomTypes] = useState([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState("");
  const [selectedSortOption, setSelectedSortOption] = useState("");
  const [searchTerm, setSearchTerm] = useState(urlCity || "");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRooms, setTotalRooms] = useState(0);

  // Data state
  const [roomsData, setRoomsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Search summary state
  const [searchSummary, setSearchSummary] = useState({
    city: urlCity,
    checkInDate: urlCheckInDate,
    checkOutDate: urlCheckOutDate,
    guests: urlGuests,
  });

  const roomTypes = ["Single Bed", "Double Bed", "Suite", "Deluxe", "Family"];
  const priceRanges = [
    "0 to 500",
    "500 to 1000",
    "1000 to 2000",
    "2000 to 3000",
  ];
  const sortOptions = [
    "Price Low to High",
    "Price High to Low",
    "Rating High to Low",
    "Newest First",
  ];

  // Handlers
  const handleRoomTypeChange = (checked, label) => {
    setSelectedRoomTypes((prev) =>
      checked ? [...prev, label] : prev.filter((item) => item !== label)
    );
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handlePriceRangeChange = (label) => {
    setSelectedPriceRange(label);
    setCurrentPage(1);
  };

  const handleSortOptionChange = (label) => {
    setSelectedSortOption(label);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  // Handler for clearing all filters
  const handleClearAll = () => {
    setSelectedRoomTypes([]);
    setSelectedPriceRange("");
    setSelectedSortOption("");
    setSearchTerm("");
    setCurrentPage(1);
    
    // Clear URL parameters and navigate to base hotels page
    navigate("/hotels");
  };

  // Fetch rooms using the API service
  useEffect(() => {
    const fetchRooms = async () => {
      setLoading(true);
      setError(null);

      try {
        // Build query params
        const params = {
          page: currentPage,
          limit: 10,
        };

        if (searchTerm) params.search = searchTerm;

        // Add availability check parameters if they exist
        if (urlCity) params.city = urlCity;
        if (urlCheckInDate) params.checkInDate = urlCheckInDate;
        if (urlCheckOutDate) params.checkOutDate = urlCheckOutDate;
        if (urlGuests) params.guests = urlGuests;

        if (selectedPriceRange) {
          const [min, max] = selectedPriceRange.split(" to ");
          params.minPrice = min;
          params.maxPrice = max;
        }

        if (selectedRoomTypes.length > 0) {
          params.roomType = selectedRoomTypes.join(",");
        }

        if (selectedSortOption) {
          switch (selectedSortOption) {
            case "Price Low to High":
              params.sort = "pricePerNight";
              params.order = "asc";
              break;
            case "Price High to Low":
              params.sort = "pricePerNight";
              params.order = "desc";
              break;
            case "Rating High to Low":
              params.sort = "rating";
              params.order = "desc";
              break;
            case "Newest First":
              params.sort = "createdAt";
              params.order = "desc";
              break;
            default:
              break;
          }
        }

        const data = await roomsAPI.getAllRooms(params);
        setRoomsData(data.rooms || []);
        setTotalPages(data.pagination?.pages || 1);
        setTotalRooms(data.pagination?.total || 0);
      } catch (err) {
        setError(err.message || "Failed to fetch rooms");
        console.error("Error fetching rooms:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, [
    currentPage,
    searchTerm,
    selectedPriceRange,
    selectedRoomTypes,
    selectedSortOption,
    urlCity,
    urlCheckInDate,
    urlCheckOutDate,
    urlGuests,
  ]);

  // Loading state
  if (loading && roomsData.length === 0) {
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
  if (error && roomsData.length === 0) {
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
            {totalRooms > 0 && (
              <p className="text-sm text-gray-500 mt-2">
                Showing {roomsData.length} of {totalRooms} rooms
              </p>
            )}

            {/* Search Summary */}
            {(urlCity || urlCheckInDate || urlCheckOutDate || urlGuests) && (
              <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-2">
                  Search Summary:
                </h3>
                <div className="flex flex-wrap gap-4 text-sm text-blue-700">
                  {urlCity && (
                    <span className="flex items-center gap-1">
                      <img
                        src={assets.locationIcon}
                        alt="location"
                        className="w-4 h-4"
                      />
                      {urlCity}
                    </span>
                  )}
                  {urlCheckInDate && (
                    <span className="flex items-center gap-1">
                      <img
                        src={assets.calenderIcon}
                        alt="check-in"
                        className="w-4 h-4"
                      />
                      Check-in: {new Date(urlCheckInDate).toLocaleDateString()}
                    </span>
                  )}
                  {urlCheckOutDate && (
                    <span className="flex items-center gap-1">
                      <img
                        src={assets.calenderIcon}
                        alt="check-out"
                        className="w-4 h-4"
                      />
                      Check-out:{" "}
                      {new Date(urlCheckOutDate).toLocaleDateString()}
                    </span>
                  )}
                  {urlGuests && (
                    <span className="flex items-center gap-1">
                      <img
                        src={assets.guestsIcon}
                        alt="guests"
                        className="w-4 h-4"
                      />
                      {urlGuests}{" "}
                      {parseInt(urlGuests) === 1 ? "Guest" : "Guests"}
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search rooms by name, type, or location..."
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
            {roomsData.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No rooms found</p>
                <p className="text-gray-400">Try adjusting your filters</p>
              </div>
            ) : (
              roomsData.map((room) => (
                <div
                  key={room._id}
                  className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="flex flex-col md:flex-row items-start gap-6">
                    <img
                      onClick={() => {
                        navigate(`/rooms/${room._id}`);
                        window.scrollTo(0, 0);
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
                          window.scrollTo(0, 0);
                        }}
                        className="text-gray-800 text-2xl md:text-3xl font-playfair font-bold cursor-pointer hover:text-[#49B9FF] transition-colors"
                      >
                        {room.hotel?.name || room.roomType}
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

                      {/* Room Type */}
                      <p className="text-gray-600 text-sm">
                        <span className="font-semibold">Room Type:</span>{" "}
                        {room.roomType}
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
                          ${room.pricePerNight}
                          <span className="text-sm font-normal text-gray-500">
                            {" "}
                            /night
                          </span>
                        </p>
                        <button
                          onClick={() => {
                            navigate(`/rooms/${room._id}`);
                            window.scrollTo(0, 0);
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

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
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
