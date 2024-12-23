import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";

const AvailableCars = () => {
  const { user, loading } = useContext(AuthContext);
  const [available, setAvailable] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCars, setFilteredCars] = useState([]);
  const [sortOption, setSortOption] = useState("default"); // State for sorting

  // Fetch cars from the server
  const fetchCars = async () => {
    try {
      if (user?.email) {
        const { data } = await axios.get(
          `http://localhost:5000/available-cars`,
          { withCredentials: true }
        );
        setAvailable(data);
        setFilteredCars(data);
      }
    } catch (error) {
      toast.error("Error fetching cars.");
    }
  };

  // Handle search input changes
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = available.filter(
      (car) =>
        car.carModel.toLowerCase().includes(query) ||
        car.brand?.toLowerCase().includes(query) ||
        car.location.toLowerCase().includes(query)
    );

    setFilteredCars(filtered);
  };

  // Handle sorting
  const handleSort = (e) => {
    const option = e.target.value;
    setSortOption(option);

    const sortedCars = [...available].sort((a, b) => {
      if (option === "price_low_high") {
        return a.rentalPrice - b.rentalPrice;
      } else if (option === "price_high_low") {
        return b.rentalPrice - a.rentalPrice;
      } else {
        return 0; // Default order
      }
    });

    setFilteredCars(sortedCars);
  };

  useEffect(() => {
    fetchCars();
  }, [user?.email]);

  return (
    <div className="max-w-screen-xl min-h-screen-64px mx-auto">
      {/* Search and Sort Controls */}
      <div className="mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <h1 className="text-4xl w-full md:w-3/12 font-bold mb-6">
          Available Cars
        </h1>
        <input
          type="text"
          placeholder="Search by model, brand, or location..."
          value={searchQuery}
          onChange={handleSearch}
          className="input input-bordered w-full md:w-6/12 px-4 py-2"
        />
        <select
          value={sortOption}
          onChange={handleSort}
          className="select select-bordered w-full md:w-3/12 px-4 py-2"
        >
          <option value="default">Sort by Price</option>
          <option value="price_low_high">Price (Lowest First)</option>
          <option value="price_high_low">Price (Highest First)</option>
        </select>
      </div>

      {filteredCars.length === 0 ? (
        <div className="text-gray-500 min-h-screen flex items-center justify-center">
          No cars match your search.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCars.map((car, index) => (
            <div
              key={index}
              className="card bg-base-100 shadow-xl mx-auto transition-transform transform hover:scale-105 w-96 md:w-[370px] lg:w-96 mb-12"
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
                <p className="text-gray-700 text-sm">
                  Price: ${car.rentalPrice}
                </p>
                <p className="text-gray-700 text-sm">
                  Location: {car.location}
                </p>
                <p className="text-sm text-gray-500">
                  Registration No: {car.registrationNumber}
                </p>
                <p className="text-sm text-green-600 font-semibold">
                  Status: {car.availability}
                </p>
                <div className="card-actions justify-center">
                  <Link
                    to={`/cars/${car._id}`}
                    className="btn btn-primary w-full hover:bg-blue-600"
                  >
                    Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AvailableCars;
