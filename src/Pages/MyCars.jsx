import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import toast from "react-hot-toast";
import axios from "axios";
import { FaTrashCan } from "react-icons/fa6";
import { FaPenFancy } from "react-icons/fa";
import { Link } from "react-router-dom";

const MyCars = () => {
  const { user } = useContext(AuthContext);
  const [myCars, setMyCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [sortOption, setSortOption] = useState("newest");

  // Fetch user's cars
  const fetchCars = async (sort = "date_asc") => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_DEFAULT_URL}/my-cars/${user?.email}?sort=${sort}`,
      { withCredentials: true }
    );
    setMyCars(data);
  };

  useEffect(() => {
    if (user?.email) {
      fetchCars(sortOption);
    }
  }, [user?.email, sortOption]);

  // Handle delete
  const handleDelete = async (carId) => {
    toast((t) => (
      <div>
        <p>Are you sure you want to delete this car?</p>
        <div className="flex justify-end gap-2 mt-2">
          <button
            className="btn bg-red-500 btn-sm text-white"
            onClick={async () => {
              try {
                await axios.delete(
                  `${import.meta.env.VITE_DEFAULT_URL}/cars/${carId}`,
                  { withCredentials: true }
                );
                toast.success("Car deleted successfully!");
                toast.dismiss(t.id);
                fetchCars(sortOption);
              } catch (error) {
                console.error("Error deleting car:", error);
                toast.error("Failed to delete the car.");
              }
            }}
          >
            Yes
          </button>
          <button
            className="btn bg-green-400 btn-sm text-white"
            onClick={() => toast.dismiss(t.id)}
          >
            No
          </button>
        </div>
      </div>
    ));
  };

  const handleOpenUpdateModal = (myCar) => {
    setIsOpen(true);
    setSelectedCar(myCar);
  };

  // Handle form submission
  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const carsInfo = Object.fromEntries(formData.entries());
    console.log(carsInfo);

    try {
      // Send PATCH request to update car info
      const { data } = await axios.patch(
        `${import.meta.env.VITE_DEFAULT_URL}/update-cars/${selectedCar?._id}`,
        carsInfo,
        { withCredentials: true }
      );

      // Display success message
      toast.success("Car updated successfully!");

      // Refresh the list of cars
      fetchCars(sortOption);

      // Close the modal
      setIsOpen(false);
    } catch (error) {
      console.error("Error updating car:", error);
      toast.error("Failed to update car. Please try again.");
    }
  };

  if (myCars.length === 0)
    return (
      <div className="text-gray-500 min-h-screen flex flex-col items-center justify-center">
        <p>No cars available. Add a new car to get started!</p>
        <Link to="/add-car" className="btn btn-primary pt-4">
          Add Car
        </Link>
      </div>
    );

  return (
    <div className="min-h-screen pt-16">
      <h1 className="text-4xl font-bold text-center mb-12">My Cars</h1>
      <div className="text-end lg:max-w-screen-lg mx-auto py-4 mb-4">
        <div>
          <label htmlFor="sort" className="mr-2">
            Sort by:
          </label>
          <select
            id="sort"
            className="select select-bordered"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="date_asc">Date (Newest First)</option>
            <option value="date_desc">Date (Oldest First)</option>
            <option value="price_asc">Price (Lowest First)</option>
            <option value="price-desc">Price (Highest First)</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto lg:max-w-screen-lg mx-auto">
        <table className="table table-auto w-full">
          {/* head */}
          <thead>
            <tr>
              <th className="text-center">Image</th>
              <th className="text-center">Model</th>
              <th className="text-center">Rent/d</th>
              <th className="text-center">Availability</th>
              <th className="text-center">RentRequest</th>
              <th className="text-center">Date Added</th>
              <th className="text-center">Update</th>
              <th className="text-center">Delete</th>
            </tr>
          </thead>
          <tbody>
            {myCars.map((myCar, index) => (
              <tr key={index}>
                <td className="text-center">
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img src={`${myCar.carImage}`} alt="Car" />
                    </div>
                  </div>
                </td>
                <td className="text-center">{myCar.carModel}</td>
                <td className="text-center">{myCar.rentalPrice}$</td>
                <td className="text-center">{myCar.availability}</td>
                <td className="text-center">{myCar.RentRequest}</td>
                <td className="text-center">
                  {new Date(myCar.dateAdded).toLocaleDateString()}
                </td>
                <td className="text-center">
                  <button onClick={() => handleOpenUpdateModal(myCar)}>
                    <FaPenFancy className="text-blue-600" />
                  </button>
                </td>
                <td className="text-center">
                  <button onClick={() => handleDelete(myCar._id)}>
                    <FaTrashCan className="text-red-600" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Update modal */}
      {isOpen && selectedCar && (
        <dialog className="modal modal-bottom sm:modal-middle" open>
          <div className="modal-box max-w-lg w-full">
            <form onSubmit={handleUpdate} className="space-y-1">
              {/* Car Model */}
              <div className="form-control">
                <label className="label font-semibold">Car Model</label>
                <input
                  type="text"
                  name="carModel"
                  defaultValue={selectedCar.carModel}
                  className="input input-bordered w-full"
                  placeholder="Enter car model"
                  required
                />
              </div>

              {/* Car Image */}
              <div className="form-control">
                <label className="label font-semibold">Car Image</label>
                <input
                  type="url"
                  name="carImage"
                  defaultValue={selectedCar.carImage}
                  className="input input-bordered w-full"
                  placeholder="Enter car image URL"
                  required
                />
              </div>

              {/* Rental Price */}
              <div className="form-control">
                <label className="label font-semibold">
                  Daily Rental Price
                </label>
                <input
                  type="number"
                  name="rentalPrice"
                  defaultValue={selectedCar.rentalPrice}
                  className="input input-bordered w-full"
                  placeholder="Enter price per day"
                  required
                />
              </div>

              {/* Availability */}
              <div className="form-control">
                <label className="label font-semibold">Availability</label>
                <select
                  name="availability"
                  defaultValue={selectedCar.availability}
                  className="select select-bordered w-full"
                  required
                >
                  <option value="">Select availability</option>
                  <option value="Available">Available</option>
                  <option value="Unavailable">Unavailable</option>
                </select>
              </div>

              {/* Vehicle Registration Number */}
              <div className="form-control">
                <label className="label font-semibold">
                  Vehicle Registration Number
                </label>
                <input
                  type="text"
                  name="registrationNumber"
                  defaultValue={selectedCar.registrationNumber}
                  className="input input-bordered w-full"
                  placeholder="Enter registration number"
                  required
                />
              </div>

              {/* Features */}
              <div className="form-control">
                <label className="label font-semibold">Features</label>
                <input
                  type="text"
                  name="features"
                  defaultValue={selectedCar.features}
                  className="input input-bordered w-full"
                  placeholder="e.g., GPS, AC, etc."
                />
              </div>

              {/* Description */}
              <div className="form-control">
                <label className="label font-semibold">Description</label>
                <textarea
                  name="description"
                  defaultValue={selectedCar.description}
                  className="textarea textarea-bordered w-full"
                  placeholder="Add a detailed description"
                ></textarea>
              </div>

              {/* Location */}
              <div className="form-control">
                <label className="label font-semibold">Location</label>
                <input
                  type="text"
                  name="location"
                  defaultValue={selectedCar.location}
                  className="input input-bordered w-full"
                  placeholder="Enter location"
                  required
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn bg-blue-600 w-full text-white"
              >
                Update Information
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="w-full btn bg-red-600 text-white"
              >
                Close Modal
              </button>
            </form>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default MyCars;
