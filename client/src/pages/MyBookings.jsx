import React, { useState } from "react";

import Title from "../components/Title";
import { assets, userBookingsDummyData } from "../assets/assets";

const MyBookings = () => {
  const [bookings, setBookings] = useState(userBookingsDummyData);

  return (
    <div className="py-28 md:pb-35 md:pt-32 px-4 md:px-16 lg:px-24 xl:px-32">
      <Title
        align="center"
        title="My Bookings"
        subTitle="Easily manage your past, current and upcoming hotel reservations
       in one place. Plan your tips seamlessly with just a few clicks"
      />

      <div className="max-w-6xl mt-8 w-full text-gray-800">
        <div
          className="hidden md:grid md:grid-cols-[3fr_2fr_1fr] w-full border-b 
          border-gray-300 font-semibold text-lg py-3 tracking-wide text-gray-700"
        >
          <div className="w-1/3">Hotel</div>
          <div className="w-1/3">Date & Timings</div>
          <div className="w-1/3">Payment</div>
        </div>

        {bookings.map((booking) => (
          <div
            key={booking._id}
            className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 grid grid-cols-1 md:grid-cols-[3fr_2fr_1fr] w-full border border-gray-100 py-8 px-4 md:px-8 my-6"
          >
            {/* Hotel Details */}
            <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
              <img
                src={booking.room.images[0]}
                alt="hotel-img"
                className="w-32 h-24 md:w-44 md:h-32 rounded-xl shadow object-cover border-2 border-gray-100"
              />

              <div className="flex flex-col gap-2 md:ml-4 w-full">
                <p className="font-playfair text-xl md:text-2xl font-bold text-gray-800">
                  {booking.hotel.name}
                  <span className="font-inter text-sm font-normal text-gray-500 ml-2">
                    ({booking.room.roomType})
                  </span>
                </p>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <img
                    src={assets.locationIcon}
                    alt="location-icon"
                    className="w-4 h-4"
                  />
                  <span>{booking.hotel.address}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <img
                    src={assets.guestsIcon}
                    alt="guests-icon"
                    className="w-4 h-4"
                  />
                  <span>Guests: {booking.guests}</span>
                </div>
                <p className="text-base font-semibold text-indigo-600 mt-1">
                  Total: ${booking.totalPrice}
                </p>
              </div>
            </div>

            {/* Date & Timings */}
            <div className="flex flex-row md:flex-col items-center md:items-start gap-8 md:gap-4 mt-6 md:mt-0">
              <div>
                <p className="font-semibold text-gray-700">Check-In:</p>
                <p className="text-gray-500 text-sm">
                  {new Date(booking.checkInDate).toDateString()}
                </p>
              </div>
              <div>
                <p className="font-semibold text-gray-700">Check-Out:</p>
                <p className="text-gray-500 text-sm">
                  {new Date(booking.checkOutDate).toDateString()}
                </p>
              </div>
            </div>

            {/* Payment status */}
            <div className="flex flex-col items-center justify-center gap-3 pt-3">
              <div className="flex items-center gap-2">
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
              {!booking.isPaid && (
                <button className="px-5 py-2 mt-2 text-xs font-semibold bg-gradient-to-r from-indigo-500 to-blue-400 text-white rounded-full shadow hover:from-blue-600 hover:to-indigo-600 transition-all cursor-pointer">
                  Pay Now
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBookings;
