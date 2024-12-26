import Lottie from "lottie-react";
import React from "react";
import { Link } from "react-router-dom";
import ErrorAnimation from "../assets/ErrorAnimation.json";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <button className="btn mt-4 px-6 py-2 bg-[#E51837] text-white rounded-lg">
        <Link className="" to="/">
          Back to Home
        </Link>
      </button>
      <Lottie animationData={ErrorAnimation}></Lottie>
    </div>
  );
};

export default ErrorPage;
