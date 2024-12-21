import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthProvider";

const AddCar = () => {
  const { user } = useContext(AuthContext); // Assumes user context has `user` info

  const handleSubmit = async (e) => {
    e.preventDefault();
    const carModel = e.target.carModel.value;
    const carImage = e.target.carImage.value;
    const rentalPrice = e.target.rentalPrice.value;
    const availability = e.target.availability.value;
    const registrationNumber = e.target.registrationNumber.value;
    const features = e.target.features.value;
    const description = e.target.description.value;
    const location = e.target.location.value;

    console.log(
      carModel,
      carImage,
      rentalPrice,
      availability,
      registrationNumber,
      features,
      description,
      location
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
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

          {/* car image */}
          <div className="form-control">
            <label className="label font-semibold">Car Image</label>
            <input
              type="URL"
              name="carImage"
              className="input input-bordered w-full"
              placeholder="Enter car Image URL"
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

          {/* Availability */}
          <div className="form-control">
            <label className="label font-semibold">Availability</label>
            <select
              name="availability"
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
          <button type="submit" className="btn btn-primary w-full text-white">
            Add Car
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCar;
