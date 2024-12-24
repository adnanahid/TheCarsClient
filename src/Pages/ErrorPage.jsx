import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <img
        className="w-full max-w-md mb-8"
        src={`https://th.bing.com/th/id/R.d31f27d332e6af784602fc2924b7a7ea?rik=sHMldoEGBe7qXA&riu=http%3a%2f%2fwww.dumpaday.com%2fwp-content%2fuploads%2f2012%2f11%2ffunny-car-accidents-15.jpeg&ehk=sEh8MgYAA9L7f0D1uCj1BO8u0gcG7Mj%2feOvnerV5fks%3d&risl=&pid=ImgRaw&r=0`}
        alt="Error Illustration"
      />
      <button className="btn btn-primary mt-4 px-6 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition">
        <Link to="/">Back to Home</Link>
      </button>
    </div>
  );
};

export default ErrorPage;
