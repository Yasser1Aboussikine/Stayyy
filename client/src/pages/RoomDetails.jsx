import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  assets,
  facilityIcons,
  roomCommonData,
  roomsDummyData,
} from "../assets/assets";
import StarRating from "../components/StarRating";
import RoomNotFound from "../ErrorHandling/RoomNotFound";

const RoomDetails = () => {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [mainImage, setMainImage] = useState(null);

  useEffect(() => {
    const foundRoom = roomsDummyData.find((room) => room._id === id);
    if (foundRoom) {
      setRoom(foundRoom);
      setMainImage(foundRoom.images[0]);
    }
  }, [id]);

  if (!room) {
    return <RoomNotFound />;
  }

  // Only runs if room is not null
  const images = room.images.slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#eaf6fd] via-white to-[#f4faff] pt-24 pb-20">
      <div className="w-full max-w-[1600px] mx-auto px-4 md:px-16 lg:px-24 xl:px-32">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-4">
            <div className="flex-1">
              <h1 className="text-3xl md:text-5xl font-playfair font-bold text-gray-800 mb-2">
                {room.hotel.name}
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
              <StarRating rating={4.5} />
              <p className="text-gray-600 font-medium">200+ reviews</p>
            </div>
            <div className="flex items-center gap-2 text-gray-500">
              <img
                src={assets.locationIcon}
                alt="location-icon"
                className="w-5 h-5"
              />
              <span className="font-medium">{room.hotel.address}</span>
            </div>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="flex flex-col lg:flex-row gap-8 mb-12">
          {/* Main Image */}
          <div className="w-full lg:w-2/3 flex items-center justify-center">
            <img
              src={mainImage}
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
                {room.amenities.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-[#49B9FF]/10 to-[#49B9FF]/5 border border-[#49B9FF]/20 hover:shadow-md transition-all duration-300"
                  >
                    <img
                      src={facilityIcons[item]}
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
                Guests will be allocated on the ground floor according to
                availability. You get a comfortable two bedroom apartment that
                has a true city feeling. The price quoted is for two guests, at
                the guest slot please mark the number of guests to get the exact
                price for groups. The Guests will be allocated ground floor
                according to availability. You get the comfortable two bedroom
                apartment that has a true city feeling.
              </p>
            </div>

            {/* Host Information */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
              <div className="flex items-start gap-6">
                <img
                  src={room.hotel.owner.image}
                  alt="Host"
                  className="h-20 w-20 rounded-full shadow-lg border-4 border-white"
                />
                <div className="flex-1">
                  <h3 className="text-2xl font-playfair font-bold text-gray-800 mb-2">
                    Hosted by {room.hotel.name}
                  </h3>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <StarRating rating={room.rating || 4.5} />
                      <p className="text-gray-600 font-medium">200+ ratings</p>
                    </div>
                  </div>
                  <button className="px-8 py-3 bg-[#49B9FF] hover:bg-[#2386c8] text-white font-semibold rounded-full transition-colors duration-300 shadow-lg hover:shadow-xl">
                    Contact Host
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Booking Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-32">
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
                <div className="text-center mb-6">
                  <p className="text-4xl font-bold text-gray-800 mb-2">
                    ${room.pricePerNight}
                    <span className="text-lg font-normal text-gray-500">
                      /night
                    </span>
                  </p>
                  <p className="text-sm text-gray-500">
                    Including taxes and fees
                  </p>
                </div>

                {/* Booking Form */}
                <form className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="checkInDate"
                        className="block text-sm font-semibold text-gray-700 mb-2"
                      >
                        Check-In
                      </label>
                      <input
                        type="date"
                        id="checkInDate"
                        className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#49B9FF] focus:border-[#49B9FF] transition-all"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="checkOutDate"
                        className="block text-sm font-semibold text-gray-700 mb-2"
                      >
                        Check-Out
                      </label>
                      <input
                        type="date"
                        id="checkOutDate"
                        className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#49B9FF] focus:border-[#49B9FF] transition-all"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="guests"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Guests
                    </label>
                    <input
                      type="number"
                      id="guests"
                      placeholder="1"
                      min="1"
                      className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#49B9FF] focus:border-[#49B9FF] transition-all"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-[#49B9FF] to-[#2386c8] hover:from-[#2386c8] hover:to-[#49B9FF] text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                  >
                    Check Availability
                  </button>
                </form>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <p className="text-xs text-gray-500 text-center">
                    You won't be charged yet
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;
