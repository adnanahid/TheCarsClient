import React from "react";

const Banner = () => {
  return (
    <div
      className="relative h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url('https://th.bing.com/th/id/R.59d90487372a12c9beae7269a703c3ab?rik=0kQ9hcBqA%2brnFA&pid=ImgRaw&r=0')", // Replace with your image URL
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-5xl font-bold drop-shadow-md">
            Drive Your Dreams Today!
          </h1>
          <p className="mt-4 text-lg drop-shadow-md">
            Your next car awaits you.
          </p>
          <button
            className="mt-6 px-6 py-3 bg-red-600 hover:bg-red-700 text-white text-lg font-semibold rounded-lg shadow-lg transition duration-300"
            onClick={() => {
              window.location.href = "/available-cars"; // Redirect to Available Cars page
            }}
          >
            View Available Cars
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
