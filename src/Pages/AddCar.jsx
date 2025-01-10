import React, { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import axios from "axios";
import toast from "react-hot-toast";

const AddCar = () => {
  const { user } = useContext(AuthContext); // Assumes user context has `user` info
  const date = new Date();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Extract form data
      const formData = new FormData(e.target);
      const carsInfo = Object.fromEntries(formData.entries());
      carsInfo.email = user?.email; // Add email from user context

      // Send data to the backend
      const { data } = await axios.post(
        `${import.meta.env.VITE_DEFAULT_URL}/add-car`,
        {
          ...carsInfo,
          dateAdded: date,
          RentRequest: 0,
          availability: "Available",
          PostedBy: user?.displayName,
          email: user?.email,
        }, {withCredentials:true}
      );
      // Reset the form
      e.target.reset();
      toast.success("Car added successfully!");
    } catch (error) {
      console.error("Error adding car:", error);
      toast.error("Failed to add the car. Please try again.");
    }
  };

  return (
    <div className="min-h-scree py-10 px-6 md:pt-24">
      <div className="max-w-3xl mx-auto p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Add New Car</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Car Model */}
          <div className="form-control">
            <label className="label font-semibold">Car Model</label>
            <input
              type="text"
              name="carModel"
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
              className="input input-bordered w-full"
              placeholder="Enter car image URL"
              required
            />
          </div>

          {/* Rental Price */}
          <div className="form-control">
            <label className="label font-semibold">Daily Rental Price</label>
            <input
              type="number"
              name="rentalPrice"
              className="input input-bordered w-full"
              placeholder="Enter price per day"
              required
            />
          </div>

          {/* Vehicle Registration Number */}
          <div className="form-control">
            <label className="label font-semibold">
              Vehicle Registration Number
            </label>
            <input
              type="text"
              name="registrationNumber"
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
              className="input input-bordered w-full"
              placeholder="e.g., GPS, AC, etc."
            />
          </div>

          {/* Description */}
          <div className="form-control">
            <label className="label font-semibold">Description</label>
            <textarea
              name="description"
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
              className="input input-bordered w-full"
              placeholder="Enter location"
              required
            />
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn bg-[#E51837] w-full text-white">
            Add Car
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCar;
