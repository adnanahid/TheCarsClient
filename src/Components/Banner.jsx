import React from "react";
import { Link } from "react-router-dom";
import bannerBg from "../assets/banner.jpg";

const Banner = () => {
  return (
    <div
      className="relative h-[400px] md:h-[600px] bg-cover bg-center"
      style={{
        backgroundImage: `url(${bannerBg})`,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="text-center text-white px-6 md:px-12">
          {/* Heading */}
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold drop-shadow-md leading-tight">
            Drive Your Dreams Today!
          </h1>
          {/* Subheading */}
          <p className="mt-4 text-sm sm:text-base md:text-lg drop-shadow-md max-w-lg mx-auto">
            Your next car awaits you. Explore the best deals and drive in style.
          </p>
          {/* Call to Action Button */}
          <Link to="/available-cars">
            <button className="mt-6 px-4 py-2 sm:px-6 sm:py-3 bg-[#E51837] hover:bg-red-700 text-white text-sm sm:text-base md:text-lg font-semibold rounded-lg shadow-lg transition duration-300">
              View Available Cars
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;
