import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";
const HotelCard = ({ room }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 w-full max-w-xs mx-auto">
      <Link
        to={`/rooms/${room._id}`}
        onClick={() => {
          scrollTo(0, 0);
        }}
        key={room._id}
        className="block"
      >
        <div className="relative w-full aspect-[4/3] bg-gray-100">
          <img
            src={room.images[0]}
            alt="room-img"
            className="w-full h-full object-cover rounded-t-2xl"
          />
          {room.rating >= 4.5 && (
            <span className="absolute top-3 left-3 bg-[#49B9FF] text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
              Best Seller
            </span>
          )}
        </div>
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="font-semibold text-lg text-gray-800 truncate">
              {room.hotel.name}
            </p>
            <div className="flex items-center gap-1">
              <img
                src={assets.starIconFilled}
                alt="star-icon"
                className="h-4 w-4"
              />
              <span className="text-sm font-medium text-yellow-500">
                {room.rating}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1 text-sm text-gray-500 mb-3">
            <img src={assets.locationIcon} alt="location" className="h-4 w-4" />
            <span className="truncate">{room.hotel.address}</span>
          </div>
          <div className="flex items-center justify-between mt-4">
            <p>
              <span className="text-xl text-gray-800 font-bold">
                ${room.pricePerNight}
              </span>
              <span className="text-sm text-gray-500">/night</span>
            </p>
            <button className="px-4 py-2 text-sm font-semibold rounded-full bg-[#49B9FF] text-white shadow hover:bg-[#2386c8] transition-all cursor-pointer">
              Book Now
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default HotelCard;
