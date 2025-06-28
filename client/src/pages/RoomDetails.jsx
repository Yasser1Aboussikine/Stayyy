import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { assets, facilityIcons, roomCommonData } from "../assets/assets";
import StarRating from "../components/StarRating";
import RoomNotFound from "../ErrorHandling/RoomNotFound";
import { roomsAPI, bookingsAPI } from "../services/api";
import { useAuth } from "../context/AuthContext";

const RoomDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [room, setRoom] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingForm, setBookingForm] = useState({
    checkInDate: "",
    checkOutDate: "",
    guests: 1,
    paymentMethod: "Stripe",
    specialRequests: "",
  });
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingError, setBookingError] = useState("");

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await roomsAPI.getRoomById(id);
        setRoom(data.room);
        setMainImage(data.room.images[0]);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching room:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchRoom();
    }
  }, [id]);

  const handleBookingFormChange = (e) => {
    const { name, value } = e.target;
    setBookingForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      alert("Please sign in to book a room");
      navigate("/signin");
      return;
    }

    setBookingLoading(true);
    setBookingError("");

    try {
      const bookingData = {
        roomId: room._id,
        ...bookingForm,
      };

      const result = await bookingsAPI.createBooking(bookingData);

      alert("Booking created successfully!");
      setShowBookingForm(false);
      navigate("/bookings");
    } catch (err) {
      setBookingError(err.message);
      console.error("Error creating booking:", err);
    } finally {
      setBookingLoading(false);
    }
  };
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
  if (error) {
    return <RoomNotFound />;
  }
  if (!room) {
    return <RoomNotFound />;
  }
  const images = room.images?.slice(0, 3) || [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#eaf6fd] via-white to-[#f4faff] pt-24 pb-20">
      <div className="w-full max-w-[1600px] mx-auto px-4 md:px-16 lg:px-24 xl:px-32">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-4">
            <div className="flex-1">
              <h1 className="text-3xl md:text-5xl font-playfair font-bold text-gray-800 mb-2">
                {room.hotel?.name || "Hotel"}
              </h1>
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-lg font-inter text-[#49B9FF] font-semibold">
                  {room.roomType}
                </span>
                <span className="text-sm font-inter py-1.5 px-4 text-white bg-gradient-to-r from-orange-500 to-orange-600 rounded-full font-semibold shadow-lg">
                  20% OFF
                </span>
              </div>
            </div>
          </div>

          {/* Ratings and Location */}
          <div className="flex items-center gap-6 flex-wrap">
            <div className="flex items-center gap-2">
              <StarRating rating={room.rating || 4.5} />
              <p className="text-gray-600 font-medium">200+ reviews</p>
            </div>
            <div className="flex items-center gap-2 text-gray-500">
              <img
                src={assets.locationIcon}
                alt="location-icon"
                className="w-5 h-5"
              />
              <span className="font-medium">
                {room.hotel?.address || "Address not available"}
              </span>
            </div>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="flex flex-col lg:flex-row gap-8 mb-12">
          {/* Main Image */}
          <div className="w-full lg:w-2/3 flex items-center justify-center">
            <img
              src={mainImage || assets.roomImg1}
              alt="Room"
              className="w-full h-80 lg:h-[500px] rounded-2xl shadow-2xl object-cover border-4 border-white transition-all duration-300"
              style={{ maxHeight: 500, background: "#f4faff" }}
            />
          </div>
          {/* Thumbnails */}
          <div className="flex lg:flex-col gap-4 w-full lg:w-1/3 justify-center items-center">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setMainImage(image)}
                className={`focus:outline-none group`}
                style={{ width: "8rem" }}
              >
                <img
                  src={image}
                  alt={`Room thumbnail ${index + 1}`}
                  className={`
                    w-32 h-24 rounded-xl object-cover border-2 shadow-md
                    transition-all duration-200
                    ${
                      mainImage === image
                        ? "border-[#49B9FF] ring-4 ring-[#49B9FF]/30 scale-105"
                        : "border-transparent group-hover:scale-105 group-hover:shadow-lg hover:border-[#49B9FF] opacity-80"
                    }
                  `}
                  style={{
                    boxShadow:
                      mainImage === image
                        ? "0 4px 24px 0 #49B9FF22"
                        : undefined,
                    background: "#eaf6fd",
                  }}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column - Room Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Room Highlights */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
              <h2 className="text-3xl md:text-4xl font-playfair font-bold text-gray-800 mb-6">
                Experience Luxury Like Never Before
              </h2>
              <div className="flex flex-wrap items-center gap-4">
                {room.amenities?.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-[#49B9FF]/10 to-[#49B9FF]/5 border border-[#49B9FF]/20 hover:shadow-md transition-all duration-300"
                  >
                    <img
                      src={facilityIcons[item] || assets.freeWifiIcon}
                      alt={item}
                      className="w-5 h-5"
                    />
                    <p className="text-sm font-semibold text-gray-700">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Room Specifications */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
              <h3 className="text-2xl font-playfair font-bold text-gray-800 mb-6">
                Room Specifications
              </h3>
              <div className="space-y-6">
                {roomCommonData.map((spec, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-[#49B9FF]/10 rounded-xl flex items-center justify-center">
                      <img
                        src={spec.icon}
                        alt={`${spec.title}-icon`}
                        className="w-6 h-6"
                      />
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-gray-800 mb-1">
                        {spec.title}
                      </p>
                      <p className="text-gray-600 leading-relaxed">
                        {spec.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
              <h3 className="text-2xl font-playfair font-bold text-gray-800 mb-6">
                About This Room
              </h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                Experience the perfect blend of comfort and luxury in this{" "}
                {room.roomType.toLowerCase()} room. Located in{" "}
                {room.hotel?.city || "our hotel"}, this room offers stunning
                views and modern amenities. The room features premium bedding,
                high-speed internet, and all the comforts you need for a
                memorable stay. Perfect for both business and leisure travelers.
              </p>
            </div>

            {/* Host Information */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
              <div className="flex items-start gap-6">
                <img
                  src={assets.userIcon}
                  alt="Host"
                  className="h-20 w-20 rounded-full shadow-lg border-4 border-white"
                />
                <div className="flex-1">
                  <h3 className="text-2xl font-playfair font-bold text-gray-800 mb-2">
                    Hosted by {room.hotel?.name || "Hotel Staff"}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Professional hospitality team dedicated to making your stay
                    exceptional.
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <StarRating rating={4.8} size="small" />
                      <span className="text-sm text-gray-600">4.8 rating</span>
                    </div>
                    <span className="text-sm text-gray-500">•</span>
                    <span className="text-sm text-gray-600">
                      Always available
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Booking Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
                <div className="text-center mb-6">
                  <p className="text-3xl font-bold text-gray-800">
                    ${room.pricePerNight}
                  </p>
                  <p className="text-gray-600">per night</p>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Room Type</span>
                    <span className="font-semibold">{room.roomType}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Location</span>
                    <span className="font-semibold">
                      {room.hotel?.city || "N/A"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Rating</span>
                    <div className="flex items-center gap-1">
                      <StarRating rating={room.rating || 4.5} size="small" />
                      <span className="font-semibold">
                        {room.rating || 4.5}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    if (!isAuthenticated) {
                      localStorage.setItem(
                        "redirectAfterLogin",
                        window.location.pathname
                      );
                      alert(
                        "Please sign in to book a room. You'll be redirected back here after login."
                      );
                      navigate("/signin");
                      return;
                    }
                    setShowBookingForm(true);
                  }}
                  className="w-full bg-[#49B9FF] text-white py-3 rounded-xl font-semibold hover:bg-[#3a9be8] transition-colors shadow-lg"
                >
                  {isAuthenticated ? "Book Now" : "Sign In to Book"}
                </button>

                <p className="text-xs text-gray-500 text-center mt-4">
                  Free cancellation up to 24 hours before check-in
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Form Modal */}
      {showBookingForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                Book This Room
              </h2>
              <button
                onClick={() => setShowBookingForm(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleBookingSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Check-in Date
                </label>
                <input
                  type="date"
                  name="checkInDate"
                  value={bookingForm.checkInDate}
                  onChange={handleBookingFormChange}
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#49B9FF] focus:border-[#49B9FF] transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Check-out Date
                </label>
                <input
                  type="date"
                  name="checkOutDate"
                  value={bookingForm.checkOutDate}
                  onChange={handleBookingFormChange}
                  min={
                    bookingForm.checkInDate ||
                    new Date().toISOString().split("T")[0]
                  }
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#49B9FF] focus:border-[#49B9FF] transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Number of Guests
                </label>
                <input
                  type="number"
                  name="guests"
                  value={bookingForm.guests}
                  onChange={handleBookingFormChange}
                  min="1"
                  max="10"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#49B9FF] focus:border-[#49B9FF] transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Payment Method
                </label>
                <select
                  name="paymentMethod"
                  value={bookingForm.paymentMethod}
                  onChange={handleBookingFormChange}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#49B9FF] focus:border-[#49B9FF] transition-all"
                  required
                >
                  <option value="Stripe">Credit Card (Stripe)</option>
                  <option value="PayPal">PayPal</option>
                  <option value="Cash">Cash</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Special Requests (Optional)
                </label>
                <textarea
                  name="specialRequests"
                  value={bookingForm.specialRequests}
                  onChange={handleBookingFormChange}
                  rows="3"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#49B9FF] focus:border-[#49B9FF] transition-all"
                  placeholder="Any special requests or preferences..."
                />
              </div>

              {bookingError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-600 text-sm">{bookingError}</p>
                </div>
              )}

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowBookingForm(false)}
                  className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={bookingLoading}
                  className="flex-1 px-4 py-3 bg-[#49B9FF] text-white rounded-xl hover:bg-[#3a9be8] transition-colors disabled:bg-gray-400"
                >
                  {bookingLoading ? "Creating Booking..." : "Confirm Booking"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomDetails;
