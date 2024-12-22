import React from "react";
import { useLoaderData } from "react-router-dom";

const CarDetails = () => {
  const car = useLoaderData(); // Access data loaded by the route's loader

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      {/* Render car details */}
      {!car ? (
        <p className="text-center text-gray-500">Loading car details...</p>
      ) : (
        <div>
          <div className="mb-6">
            <img
              src={car.carImage || "https://via.placeholder.com/800x400"}
              alt={car.carModel}
              className="w-full h-96 object-cover rounded-lg"
            />
          </div>
          <h1 className="text-3xl font-bold mb-4">{car.carModel}</h1>
          <p className="text-lg text-gray-600 mb-2">
            <strong>Price Per Day:</strong> ${car.rentalPrice}
          </p>
          <p className="text-lg text-gray-600 mb-2">
            <strong>Availability:</strong> {car.availability}
          </p>
          <p className="text-lg text-gray-600 mb-4">
            <strong>Location:</strong> {car.location}
          </p>
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Features</h2>
            <p className="text-gray-700">{car.features}</p>
          </div>
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p className="text-gray-700">{car.description}</p>
          </div>
          <div>
            <button className="btn w-full bg-blue-400">Book Now</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarDetails;
