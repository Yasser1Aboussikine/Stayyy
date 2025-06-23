import React from "react";
import { roomsDummyData } from "../assets/assets";
import HotelCard from "./HotelCard";
import Title from "./Title";
import { useNavigate } from "react-router-dom";

const FeaturedDestinations = () => {
  const navigate = useNavigate();
  return (
    <section className="flex flex-col items-center px-6 md:px-16 lg:px-24 py-20 bg-gradient-to-b from-[#eaf6fd] via-white to-[#f4faff] border-t border-b border-[#dbeafe] shadow-inner">
      <div className="w-full max-w-5xl mx-auto">
        <Title
          title="Featured Destination"
          subTitle={
            "Discover our handpicked selection of exceptional properties around the world, offering unparalleled luxury and unforgettable experiences."
          }
        />
        <div className="flex flex-wrap items-center justify-center gap-8 mt-16">
          {roomsDummyData.slice(0, 4).map((room) => (
            <HotelCard key={room._id} room={room} />
          ))}
        </div>
        <div className="flex justify-center mt-12">
          <button
            onClick={() => {
              navigate("/rooms");
              scrollTo(0, 0);
            }}
            className="px-6 py-2 text-base font-semibold rounded-full bg-[#49B9FF] text-white shadow hover:bg-[#2386c8] transition-all cursor-pointer"
          >
            View All Destinations
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedDestinations;
