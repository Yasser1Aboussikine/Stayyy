import React from "react";
import Title from "./Title";
import { assets, exclusiveOffers } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const ExclusiveOffers = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center px-6 md:px-16 lg:px-24 xl:px-32 pt-20 pb-30">
      <div className="flex flex-col items-center justify-center w-full text-center gap-6">
        <Title
          align="center"
          title="Exclusive Offers"
          subTitle="Take advantage of our limited-time offers and special packages to enhance\n            your stay and create unforgettable memories."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12 w-full justify-items-center">
        {exclusiveOffers.map((item) => (
          <div
            key={item._id}
            className="group relative flex flex-col items-start justify-between gap-1 pt-12 md:pt-18 px-6 pb-6 rounded-2xl text-white bg-no-repeat bg-cover bg-center overflow-hidden shadow-lg cursor-pointer transition-transform duration-250 hover:scale-105 hover:shadow-20xl"
            style={{ backgroundImage: `url(${item.image})` }}
          >
            {/* Overlay for glassmorphism */}
            <div className="absolute inset-0 bg-black/20 backdrop-blur-md z-0 transition-all group-hover:bg-black/30" />
            <p className="px-3 py-1 absolute top-4 left-4 text-xs bg-[#49B9FF] text-white font-semibold rounded-full shadow-lg z-10 border border-white/30">
              {item.priceOff}% OFF
            </p>

            <div className="relative z-10">
              <p className="text-2xl font-bold font-playfair drop-shadow-lg mb-1">
                {item.title}
              </p>
              <p className="text-base text-white/90 drop-shadow-sm">
                {item.description}
              </p>
              <p className="text-xs text-white/70 mt-3">
                Expires {item.expiryDate}
              </p>
            </div>

            <button className="relative z-10 flex items-center gap-2 font-semibold cursor-pointer mt-6 px-4 py-2 rounded-full bg-white/20 hover:bg-[#49B9FF] hover:text-white transition-all shadow group-hover:scale-105 group-hover:shadow-xl">
              View Offers
              <img
                className="invert group-hover:translate-x-1 group-hover:invert-0 group-hover:brightness-0 transition-all"
                src={assets.arrowIcon}
                alt="arrow-icon"
              />
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={() => navigate("/offers")}
        className="group flex items-center gap-2 px-6 py-2 text-base font-semibold rounded-full bg-[#49B9FF] text-white shadow hover:bg-[#2386c8] transition-all cursor-pointer mx-auto mt-12"
      >
        View All Offers
        <img
          src={assets.arrowIcon}
          alt="arrow-icon"
          className="group-hover:translate-x-1 transition-all"
        />
      </button>
    </div>
  );
};

export default ExclusiveOffers;
