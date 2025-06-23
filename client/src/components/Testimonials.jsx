import React from "react";
import { testimonials } from "../assets/assets";
import StarRating from "./StarRating";
import Title from "./Title";

const Testimonials = () => {
  return (
    <div className="flex flex-col items-center px-6 md:px-16 lg:px-24 bg-slate-50 pt-20 pb-30">
      <Title
        title="What Our Guests Say"
        subTitle="Discover why discerning travelers choose Stayyy for their luxury 
            accommodations around the world. "
      />

      <div className="flex flex-wrap items-center gap-10 mt-20 justify-center">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="relative bg-white/80 p-8 rounded-2xl shadow-xl border border-[#49B9FF]/10 max-w-xs min-w-[300px] transition-all duration-300 hover:scale-105 hover:shadow-2xl group cursor-pointer"
          >
            {/* Accent bar */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#49B9FF] via-[#49B9FF]/60 to-transparent rounded-t-2xl" />
            <div className="flex items-center gap-4 mb-4">
              <img
                className="w-16 h-16 rounded-full border-4 border-[#49B9FF]/30 shadow"
                src={testimonial.image}
                alt={testimonial.name}
              />
              <div>
                <p className="font-playfair text-xl font-bold text-gray-800">
                  {testimonial.name}
                </p>
                <p className="text-gray-500 text-sm">{testimonial.address}</p>
              </div>
            </div>
            <div className="flex items-center gap-1 mb-3">
              <StarRating rating={testimonial.rating} />
            </div>
            <p className="text-gray-600 italic relative pl-8 mt-2">
              <span className="absolute left-0 top-0 text-3xl text-[#49B9FF] font-serif leading-none">
                "
              </span>
              {testimonial.review}
              <span className="absolute -right-2 bottom-0 text-3xl text-[#49B9FF] font-serif leading-none">
                "
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
