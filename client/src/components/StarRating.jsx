import React from "react";
import { assets } from "../assets/assets";

const StarRating = ({ rating }) => {
  // Round the rating to the nearest whole number
  const roundedRating = Math.round(rating);

  return (
    <div className="flex items-center gap-0.5">
      {Array(5)
        .fill("")
        .map((_, index) => (
          <img
            key={index}
            src={
              roundedRating > index
                ? assets.starIconFilled
                : assets.starIconOutlined
            }
            alt="star-icon"
            className={`w-6 h-6 transition-all duration-200 ${
              roundedRating > index
                ? "drop-shadow-[0_2px_6px_rgba(73,185,255,0.4)] scale-110"
                : "opacity-60"
            }`}
            style={{
              filter: roundedRating > index ? "brightness(1.2)" : "none",
            }}
          />
        ))}
    </div>
  );
};

export default StarRating;
