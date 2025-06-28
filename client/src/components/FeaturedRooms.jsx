import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { roomsAPI } from "../services/api";
import { assets, facilityIcons } from "../assets/assets";
import StarRating from "./StarRating";

const FeaturedRooms = () => {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopRatedRooms = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await roomsAPI.getTopRatedRooms(4);
        setRooms(data.rooms || []);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching top rated rooms:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTopRatedRooms();
  }, []);

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="w-full max-w-[1600px] mx-auto px-4 md:px-16 lg:px-24 xl:px-32">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Featured Rooms
            </h2>
            <div className="w-16 h-1 bg-[#49B9FF] rounded-full mx-auto mb-4"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our most popular and highly-rated accommodations
            </p>
          </div>

          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#49B9FF]"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-white">
        <div className="w-full max-w-[1600px] mx-auto px-4 md:px-16 lg:px-24 xl:px-32">
          <div className="text-center">
            <p className="text-red-500 text-lg mb-4">
              Error loading featured rooms
            </p>
            <p className="text-gray-600">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  if (rooms.length === 0) {
    return null; // Don't show section if no rooms
  }

  return (
    <section className="py-16 bg-white">
      <div className="w-full max-w-[1600px] mx-auto px-4 md:px-16 lg:px-24 xl:px-32">
        <div className="text-center mb-12">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Featured Rooms
          </h2>
          <div className="w-16 h-1 bg-[#49B9FF] rounded-full mx-auto mb-4"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our most popular and highly-rated accommodations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {rooms.map((room) => (
            <div
              key={room._id}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
              onClick={() => {
                navigate(`/rooms/${room._id}`);
                window.scrollTo(0, 0);
              }}
            >
              {/* Room Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={room.images?.[0] || assets.roomImg1}
                  alt={room.roomType}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                  <div className="flex items-center gap-1">
                    <StarRating rating={room.rating || 4.5} size="small" />
                    <span className="text-xs font-medium text-gray-700">
                      {room.rating || 4.5}
                    </span>
                  </div>
                </div>
              </div>

              {/* Room Details */}
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[#49B9FF] font-semibold text-sm uppercase tracking-wide">
                    {room.hotel?.city || "Hotel"}
                  </p>
                  <p className="text-xs text-gray-500">{room.roomType}</p>
                </div>

                <h3 className="text-lg font-playfair font-bold text-gray-800 mb-2 line-clamp-1">
                  {room.hotel?.name || room.roomType}
                </h3>

                <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
                  <img
                    src={assets.locationIcon}
                    alt="location-icon"
                    className="w-4 h-4"
                  />
                  <span className="line-clamp-1">
                    {room.hotel?.address || "Address not available"}
                  </span>
                </div>

                {/* Room Amenities */}
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  {room.amenities?.slice(0, 2).map((amenity, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-1 px-2 py-1 rounded-full bg-[#49B9FF]/10 border border-[#49B9FF]/20"
                    >
                      <img
                        src={facilityIcons[amenity] || assets.freeWifiIcon}
                        alt={amenity}
                        className="w-3 h-3"
                      />
                      <p className="text-xs font-medium text-gray-700">
                        {amenity}
                      </p>
                    </div>
                  ))}
                  {room.amenities?.length > 2 && (
                    <span className="text-xs text-gray-500">
                      +{room.amenities.length - 2} more
                    </span>
                  )}
                </div>

                {/* Price */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xl font-bold text-gray-800">
                      ${room.pricePerNight}
                    </p>
                    <p className="text-xs text-gray-500">per night</p>
                  </div>
                  <button className="px-4 py-2 bg-[#49B9FF] text-white text-sm rounded-lg hover:bg-[#3a9be8] transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button
            onClick={() => navigate("/hotels")}
            className="px-8 py-3 bg-[#49B9FF] text-white rounded-lg hover:bg-[#3a9be8] transition-colors font-semibold"
          >
            View All Rooms
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedRooms;
