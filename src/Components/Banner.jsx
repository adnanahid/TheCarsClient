import React from "react";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div
      className="relative h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${"/src/assets/banner.jpg"})`,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="text-center text-white px-6 md:px-12">
          {/* Responsive Heading */}
          <h1 className="text-3xl md:text-5xl font-bold drop-shadow-md">
            Drive Your Dreams Today!
          </h1>
          {/* Responsive Subheading */}
          <p className="mt-4 text-base md:text-lg drop-shadow-md">
            Your next car awaits you.
          </p>
          {/* Call to Action Button */}
          <Link to="/available-cars">
            <button className="mt-6 px-4 py-2 md:px-6 md:py-3 bg-[#E51837] hover:bg-red-700 text-white text-sm md:text-lg font-semibold rounded-lg shadow-lg transition duration-300">
              View Available Cars
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;
