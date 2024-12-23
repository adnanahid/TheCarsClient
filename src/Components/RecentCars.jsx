import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import toast from "react-hot-toast";
import axios from "axios";

const RecentCars = () => {
  const { user, loading } = useContext(AuthContext);
  const [available, setAvailable] = useState([]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/recent-cars`);
        setAvailable(data);
      } catch (error) {
        toast.error("Error fetching cars.");
      }
    };
    fetchCars();
  }, [user?.email]);
  return (
    <div className="max-w-screen-xl mx-auto my-24">
      <h1 className="text-4xl font-bold mb-12 text-center">Recently Added cars</h1>
      <div className="grid grid-cols-3 ">
        {available.map((car, index) => (
          <div
            key={index}
            className="card bg-base-100 shadow-xl mx-auto transition-transform transform hover:scale-105 w-96 md:w-[370px] lg:w-96"
          >
            <figure>
              <img
                src={car.carImage || "https://via.placeholder.com/400x220"}
                alt={car.carModel || "Car Image"}
                className="h-[220px] object-cover w-full"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title text-xl font-semibold">
                {car.carModel}
              </h2>
              <p className="text-gray-700 text-sm">Price: ${car.rentalPrice}</p>
              <p className="text-gray-700 text-sm">Location: {car.location}</p>
              <p className="text-sm text-gray-500">
                Registration No: {car.registrationNumber}
              </p>
              <p className="text-sm text-green-600 font-semibold">
                Status: {car.availability}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentCars;
