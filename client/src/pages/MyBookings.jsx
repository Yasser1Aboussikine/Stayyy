import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Title from "../components/Title";
import { assets, facilityIcons } from "../assets/assets";
import { useAuth } from "../context/AuthContext";
import { bookingsAPI } from "../services/api";
import StarRating from "../components/StarRating";

const MyBookings = () => {
  const navigate = useNavigate();
  const [selectedStatus, setSelectedStatus] = useState("all");
  const { user } = useAuth();
  const [bookingsData, setBookingsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cancellingBooking, setCancellingBooking] = useState(null);
  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await bookingsAPI.getUserBookings();
        setBookingsData(data.bookings || []);
      } catch (err) {
        setError(err.message || "Failed to fetch bookings");
        console.error("Error fetching bookings:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);
  const filteredBookings =
    selectedStatus === "all"
      ? bookingsData
      : bookingsData.filter((booking) => booking.status === selectedStatus);
  const handleCancelBooking = async (bookingId) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) {
      return;
    }

    setCancellingBooking(bookingId);
    try {
      await bookingsAPI.cancelBooking(bookingId);
      setBookingsData((prevBookings) =>
        prevBookings.map((booking) =>
          booking._id === bookingId
            ? { ...booking, status: "cancelled" }
            : booking
        )
      );
    } catch (err) {
      alert("Failed to cancel booking: " + err.message);
    } finally {
      setCancellingBooking(null);
    }
  };
  if (loading && bookingsData.length === 0) {
    return (
      <div className="py-28 md:pb-35 md:pt-32 px-4 md:px-16 lg:px-24 xl:px-32">
        <Title
          align="center"
          title="My Bookings"
          subTitle="Easily manage your past, current and upcoming hotel reservations
         in one place. Plan your tips seamlessly with just a few clicks"
        />
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#49B9FF]"></div>
        </div>
      </div>
    );
  }
  if (error && bookingsData.length === 0) {
    return (
      <div className="py-28 md:pb-35 md:pt-32 px-4 md:px-16 lg:px-24 xl:px-32">
        <Title
          align="center"
          title={user ? `My Bookings : ${user.userName}` : "My Bookings"}
          subTitle="Easily manage your past, current and upcoming hotel reservations
         in one place. Plan your tips seamlessly with just a few clicks"
        />
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <p className="text-red-500 text-lg mb-4">Error loading bookings</p>
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
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
      case "completed":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "confirmed":
        return "Confirmed";
      case "pending":
        return "Pending";
      case "cancelled":
        return "Cancelled";
      case "completed":
        return "Completed";
      default:
        return status;
    }
  };

  return (
    <div className="py-28 md:pb-35 md:pt-32 px-4 md:px-16 lg:px-24 xl:px-32">
      <Title
        align="center"
        title="My Bookings"
        subTitle="Easily manage your past, current and upcoming hotel reservations
       in one place. Plan your tips seamlessly with just a few clicks"
      />

      {/* Status Filter */}
      <div className="max-w-6xl mx-auto mt-8 mb-6">
        <div className="flex flex-wrap gap-2 justify-center">
          {["all", "pending", "confirmed", "completed", "cancelled"].map(
            (status) => (
              <button
                key={status}
                onClick={() => setSelectedStatus(status)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedStatus === status
                    ? "bg-[#49B9FF] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {status === "all" ? "All" : getStatusText(status)}
              </button>
            )
          )}
        </div>
      </div>

      <div className="max-w-6xl mt-8 w-full text-gray-800">
        {filteredBookings.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg mb-2">
              {selectedStatus === "all"
                ? "No bookings found"
                : `No ${selectedStatus} bookings found`}
            </p>
            <p className="text-gray-400">
              {selectedStatus === "all"
                ? "Start by booking your first room!"
                : "Try selecting a different status or book a new room"}
            </p>
            {selectedStatus === "all" && (
              <button
                onClick={() => navigate("/hotels")}
                className="mt-4 px-6 py-2 bg-[#49B9FF] text-white rounded-lg hover:bg-[#3a9be8] transition-colors"
              >
                Browse Rooms
              </button>
            )}
          </div>
        ) : (
          <>
            <div
              className="hidden md:grid md:grid-cols-[3fr_2fr_1fr] w-full border-b 
              border-gray-300 font-semibold text-lg py-3 tracking-wide text-gray-700"
            >
              <div className="w-1/3">Hotel</div>
              <div className="w-1/3">Date & Timings</div>
              <div className="w-1/3">Status & Payment</div>
            </div>

            {filteredBookings.map((booking) => (
              <div
                key={booking._id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 grid grid-cols-1 md:grid-cols-[3fr_2fr_1fr] w-full border border-gray-100 py-8 px-4 md:px-8 my-6 cursor-pointer group hover:border-[#49B9FF]/30 relative"
                onClick={() => navigate(`/rooms/${booking.room._id}`)}
              >
                {/* Click indicator */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex items-center gap-1 text-[#49B9FF] text-xs font-medium">
                    <span>View Details</span>
                    <img
                      src={assets.arrowIcon}
                      alt="arrow"
                      className="w-3 h-3"
                    />
                  </div>
                </div>

                {/* Hotel Details */}
                <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
                  <div className="relative">
                    <img
                      src={booking.room?.images?.[0] || assets.roomImg1}
                      alt="hotel-img"
                      className="w-32 h-24 md:w-44 md:h-32 rounded-xl shadow object-cover border-2 border-gray-100 group-hover:scale-105 transition-transform duration-300"
                    />
                    {/* Rating overlay */}
                    {booking.room?.rating && (
                      <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1">
                        <div className="flex items-center gap-1">
                          <StarRating
                            rating={booking.room.rating}
                            size="small"
                          />
                          <span className="text-xs font-medium text-gray-700">
                            {booking.room.rating}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-2 md:ml-4 w-full">
                    <p className="font-playfair text-xl md:text-2xl font-bold text-gray-800">
                      {booking.room?.hotel?.name ||
                        booking.room?.roomType ||
                        "Room"}
                      <span className="font-inter text-sm font-normal text-gray-500 ml-2">
                        ({booking.room?.roomType || "Standard"})
                      </span>
                    </p>

                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <img
                        src={assets.locationIcon}
                        alt="location-icon"
                        className="w-4 h-4"
                      />
                      <span>
                        {booking.room?.hotel?.city &&
                          `${booking.room.hotel.city}, `}
                        {booking.room?.hotel?.address ||
                          "Address not available"}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <img
                        src={assets.guestsIcon}
                        alt="guests-icon"
                        className="w-4 h-4"
                      />
                      <span>Guests: {booking.guests}</span>
                    </div>

                    {/* Room Amenities */}
                    {booking.room?.amenities &&
                      booking.room.amenities.length > 0 && (
                        <div className="flex flex-wrap items-center gap-2 mt-2">
                          {booking.room.amenities
                            .slice(0, 3)
                            .map((amenity, index) => (
                              <div
                                key={index}
                                className="flex items-center gap-1 px-2 py-1 rounded-full bg-[#49B9FF]/10 border border-[#49B9FF]/20"
                              >
                                <img
                                  src={
                                    facilityIcons[amenity] ||
                                    assets.freeWifiIcon
                                  }
                                  alt={amenity}
                                  className="w-3 h-3"
                                />
                                <p className="text-xs font-medium text-gray-700">
                                  {amenity}
                                </p>
                              </div>
                            ))}
                          {booking.room.amenities.length > 3 && (
                            <span className="text-xs text-gray-500">
                              +{booking.room.amenities.length - 3} more
                            </span>
                          )}
                        </div>
                      )}

                    <p className="text-base font-semibold text-indigo-600 mt-1">
                      Total: ${booking.totalPrice}
                    </p>

                    {booking.specialRequests && (
                      <p className="text-sm text-gray-600 mt-1">
                        <span className="font-medium">Special Requests:</span>{" "}
                        {booking.specialRequests}
                      </p>
                    )}
                  </div>
                </div>

                {/* Date & Timings */}
                <div className="flex flex-row md:flex-col items-center md:items-start gap-8 md:gap-4 mt-6 md:mt-0">
                  <div>
                    <p className="font-semibold text-gray-700">Check-In:</p>
                    <p className="text-gray-500 text-sm">
                      {new Date(booking.checkInDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-700">Check-Out:</p>
                    <p className="text-gray-500 text-sm">
                      {new Date(booking.checkOutDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-700">
                      Payment Method:
                    </p>
                    <p className="text-gray-500 text-sm">
                      {booking.paymentMethod}
                    </p>
                  </div>
                </div>

                {/* Status and Payment */}
                <div className="flex flex-col items-center justify-center gap-3 pt-3">
                  <div className="flex flex-col items-center gap-2">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold shadow-sm ${getStatusColor(
                        booking.status
                      )}`}
                    >
                      {getStatusText(booking.status)}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold shadow-sm 
                        ${
                          booking.isPaid
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                    >
                      {booking.isPaid ? "Paid" : "Unpaid"}
                    </span>
                  </div>

                  {/* Action buttons */}
                  <div className="flex flex-col gap-2 mt-2">
                    {booking.status === "pending" && !booking.isPaid && (
                      <button
                        className="px-4 py-2 text-xs font-semibold bg-gradient-to-r from-indigo-500 to-blue-400 text-white rounded-full shadow hover:from-blue-600 hover:to-indigo-600 transition-all cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      >
                        Pay Now
                      </button>
                    )}
                    {booking.status === "pending" && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCancelBooking(booking._id);
                        }}
                        disabled={cancellingBooking === booking._id}
                        className="px-4 py-2 text-xs font-semibold bg-red-500 text-white rounded-full shadow hover:bg-red-600 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {cancellingBooking === booking._id
                          ? "Cancelling..."
                          : "Cancel"}
                      </button>
                    )}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/rooms/${booking.room._id}`);
                      }}
                      className="px-4 py-2 text-xs font-semibold bg-[#49B9FF] text-white rounded-full shadow hover:bg-[#3a9be8] transition-all cursor-pointer"
                    >
                      View Room Details
                    </button>
                    {booking.status === "cancelled" && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate("/hotels");
                        }}
                        className="px-4 py-2 text-xs font-semibold bg-green-500 text-white rounded-full shadow hover:bg-green-600 transition-all cursor-pointer"
                      >
                        Book Again
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default MyBookings;
