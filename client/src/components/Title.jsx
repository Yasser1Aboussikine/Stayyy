import React from "react";

const Title = ({ title, subTitle, align, font }) => {
  return (
    <div
      className={`flex flex-col justify-center items-center text-center ${
        align === "left" && "md:items-start md:text-left"
      }`}
    >
      <h1
        className={`text-4xl md:text-[40px] font-extrabold tracking-tight ${
          font || "font-playfair"
        } relative mb-2`}
        style={{ letterSpacing: "-1px" }}
      >
        {title}
        <span className="block w-16 h-1 bg-[#49B9FF] rounded-full mx-auto mt-2" />
      </h1>
      <p className="text-base md:text-lg text-gray-500/90 mt-3 max-w-2xl mx-auto text-center whitespace-pre-line leading-relaxed">
        {subTitle}
      </p>
    </div>
  );
};

export default Title;
