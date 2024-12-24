import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import toast from "react-hot-toast";
import axios from "axios";
import { formatDistanceToNow, parseISO } from "date-fns";

const RecentCars = () => {
  const { user } = useContext(AuthContext);
  const [available, setAvailable] = useState([]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_DEFAULT_URL}/recent-cars`
        );
        setAvailable(data);
      } catch (error) {
        console.error("Error fetching cars:", error);
        toast.error("Error fetching cars.");
      }
    };
    fetchCars();
  }, [user?.email]);

  return (
    <div className="max-w-screen-xl mx-auto my-24 px-4 md:px-6 lg:px-8">
      <h1 className="text-3xl md:text-4xl font-bold mb-12 text-center">
        Recently Added Cars
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {available.map((car) => (
          <article
            key={car.id}
            className="card bg-base-100 shadow-xl mx-auto transition-transform transform hover:scale-105 w-full md:w-[90%] lg:w-full"
          >
            <figure>
              <img
                src={car.carImage || "https://via.placeholder.com/400x220"}
                alt={car.carModel || "Default Car Image"}
                className="h-[220px] object-cover w-full"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title text-lg md:text-xl font-semibold">
                {car.carModel}
              </h2>
              <p className="text-gray-700 text-sm">Price: ${car.rentalPrice}</p>
              <p className="text-gray-700 text-sm">Location: {car.location}</p>
              <p className="text-gray-700 text-sm">
                Listed{" "}
                {formatDistanceToNow(parseISO(car.dateAdded), {
                  addSuffix: true,
                })}
              </p>
              <p className="text-sm text-gray-500">
                Registration No: {car.registrationNumber}
              </p>
              <p className="text-sm text-green-600 font-semibold">
                Status: {car.availability}
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default RecentCars;
