import axios from "axios";
import React, { useState, useContext } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { AuthContext } from "../Provider/AuthProvider";
import toast from "react-hot-toast";

const CarDetails = () => {
  const car = useLoaderData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useContext(AuthContext);
  const { _id, carsInfo } = car;
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Format the date as DD-MM-YYYY HH:MM
  const today = new Date();
  const formattedDate = format(today, "dd-MM-yyyy HH:mm");

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleBooking = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    try {
      // Only send necessary data for booking
      const bookingData = {
        carId: car._id,
        carModel: car.carModel,
        carImage: car.carImage,
        rentalPrice: car.rentalPrice,
        availability: car.availability,
        location: car.location,
        buyerEmail: user.email,
        bookingDate: formattedDate,
        status: car.status,
        description: car.description,
        features: car.features,
        registration: car.registration,
        startDate,
        endDate,
      };

      if (user?.email === car.email) {
        return toast.error("You can't book your own car.");
      }

      const response = await axios.post(
        "${${import.meta.env.VITE_DEFAULT_URL}}/add-booking",
        bookingData
      );

      toast.success("Booking successful!");
      closeModal();
      navigate("/my-booking");
    } catch (error) {
      toast.error("Error making the booking. Please try again.");
    }
  };

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
            <button onClick={openModal} className="btn w-full bg-blue-400">
              Book Now
            </button>

            {/* Modal */}
            {isModalOpen && (
              <div className={`modal ${isModalOpen ? "modal-open" : ""}`}>
                <form onSubmit={handleBooking} className="modal-box">
                  <h3 className="font-bold text-lg">Booking Confirmation</h3>
                  <p className="py-4">
                    You are about to book <strong>{car.carModel}</strong> for{" "}
                    <strong>${car.rentalPrice}</strong> per day. Would you like
                    to confirm your booking?
                  </p>
                  <div className="py-2">
                    <label
                      htmlFor="start-date"
                      className="block font-medium mb-2"
                    >
                      Start Date
                    </label>
                    <input
                      id="start-date"
                      required
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="input input-bordered w-full"
                    />
                  </div>
                  <div className="py-2">
                    <label
                      htmlFor="end-date"
                      className="block font-medium mb-2"
                    >
                      End Date
                    </label>
                    <input
                      id="end-date"
                      required
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="input input-bordered w-full"
                    />
                  </div>
                  <div className="modal-action">
                    <button className="btn" onClick={closeModal}>
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Confirm Booking
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CarDetails;
