import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import { MagnifyingGlass } from "react-loader-spinner";

const AvailableCars = () => {
  const { user, loading } = useContext(AuthContext);
  const [available, setAvailable] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCars, setFilteredCars] = useState([]);
  const [sortOption, setSortOption] = useState("default");
  const [viewMode, setViewMode] = useState("grid");

  const fetchCars = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_DEFAULT_URL}/available-cars`,
        {
          withCredentials: true,
        }
      );
      setAvailable(data);
      setFilteredCars(data);
    } catch (error) {
      toast.error("Error fetching cars.");
    }
  };

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
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <MagnifyingGlass
          visible={true}
          height="80"
          width="80"
          ariaLabel="magnifying-glass-loading"
          wrapperClass="magnifying-glass-wrapper"
          glassColor="#c0efff"
          color="#e15b64"
        />
      </div>
    );
  }

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-6 lg:px-8 min-h-screen">
      {/* Title */}
      <h1 className="text-3xl font-bold text-center my-6">Available Cars</h1>

      {/* Search and Filter Section */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-6">
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search by model, brand, or location..."
          value={searchQuery}
          onChange={handleSearch}
          className="col-span-7 input input-bordered w-full px-4 py-2"
        />

        {/* Sort Dropdown */}
        <select
          value={sortOption}
          onChange={handleSort}
          className="col-span-3 select select-bordered w-full px-4 py-2"
        >
          <option value="default">Sort by Price</option>
          <option value="price_low_high">Price (Lowest First)</option>
          <option value="price_high_low">Price (Highest First)</option>
        </select>

        {/* View Toggle */}
        <button
          onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
          className="col-span-2 btn bg-blue-400 text-white px-4 py-2"
        >
          {viewMode === "grid" ? "List View" : "Grid View"}
        </button>
      </div>

      {/* Car Listings */}
      {filteredCars.length === 0 ? (
        <div className="text-gray-500 min-h-[50vh] flex items-center justify-center">
          No cars match your search.
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCars.map((car, index) => (
            <div
              key={index}
              className="card bg-base-100 shadow-xl transition-transform transform hover:scale-105 my-12"
            >
              <figure>
                <img
                  src={car.carImage || "https://via.placeholder.com/400x220"}
                  alt={car.carModel || "Car Image"}
                  className="h-[220px] object-cover w-full"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title text-lg md:text-xl font-semibold">
                  {car.carModel}
                </h2>
                <p className="text-gray-700 text-sm">
                  Rent: {car.rentalPrice}$/day
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
                  {user ? (
                    <Link
                      to={`/cars/${car._id}`}
                      className="btn bg-[#E51837] text-white w-full hover:bg-blue-600"
                    >
                      Details
                    </Link>
                  ) : (
                    <p className="text-red-500 text-sm">
                      Login to see more details
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {filteredCars.map((car, index) => (
            <div
              key={index}
              className="flex items-center border rounded-lg p-4 shadow-sm"
            >
              <img
                src={car.carImage || "https://via.placeholder.com/150x100"}
                alt={car.carModel || "Car Image"}
                className="h-[100px] w-[150px] object-cover mr-4"
              />
              <div className="flex-1">
                <h2 className="text-lg font-semibold">{car.carModel}</h2>
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
              </div>
              <Link
                to={`/cars/${car._id}`}
                className="btn bg-[#E51837] ml-4 hover:bg-blue-600"
              >
                Details
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AvailableCars;
