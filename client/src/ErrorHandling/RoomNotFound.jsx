import React from "react";
import { useNavigate } from "react-router-dom";

const RoomNotFound = () => {
  const navigate = useNavigate();

  const handleContactSupport = () => {
    navigate("/");
    setTimeout(() => {
      const contactSection = document.querySelector("#contact-us");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <div className="flex flex-col items-center justify-center text-sm h-[400px]">
      <p className="font-medium text-lg text-indigo-500">404 Error</p>
      <h2 className="md:text-6xl text-4xl font-semibold text-gray-800">
        Room Not Found
      </h2>
      <p className="text-base mt-4 text-gray-500">
        Sorry, we couldn't find the room page you're looking for.
      </p>
      <div className="flex items-center gap-4 mt-6">
        <button
          type="button"
          className="bg-indigo-500 hover:bg-indigo-600 px-7 py-2.5 text-white rounded active:scale-95 cursor-pointer transition-all"
          onClick={() => navigate("/")}
        >
          Go back home
        </button>
        <button
          type="button"
          className="group flex items-center gap-2 px-7 py-2.5 active:scale-95 cursor-pointer transition"
          onClick={handleContactSupport}
        >
          Contact support
          <svg
            className="group-hover:translate-x-0.5 mt-1 transition"
            width="15"
            height="11"
            viewBox="0 0 15 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 5.5h13.092M8.949 1l5.143 4.5L8.949 10"
              stroke="#1F2937"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default RoomNotFound;
