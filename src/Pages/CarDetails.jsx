import axios from "axios";
import React, { useState, useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { format } from "date-fns";
import { AuthContext } from "../Provider/AuthProvider";

const CarDetails = () => {
  const car = useLoaderData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useContext(AuthContext);
  const { _id, carsInfo } = car;
  console.log({ ...carsInfo });

  // Format the date as DD-MM-YYYY HH:MM
  const today = new Date();
  const formattedDate = format(today, "dd-MM-yyyy HH:mm");

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleBooking = async () => {
    if (!user?.email) {
      alert("Please login to make a booking.");
      return;
    }

    try {
      // Only send necessary data for booking
      const bookingData = {
        carModel: car.carModel,
        rentalPrice: car.rentalPrice,
        availability: car.availability,
        location: car.location,
        buyerEmail: user.email,
        bookingDate: formattedDate, // Attach the booking date
      };

      const response = await axios.post(
        "http://localhost:5000/add-booking",
        bookingData
      );
      alert("Booking successful!");
      closeModal(); // Close the modal after booking
    } catch (error) {
      console.error("Booking failed:", error.message);
      alert("Error making the booking. Please try again.");
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
              <div className="modal modal-open">
                <div className="modal-box">
                  <h3 className="font-bold text-lg">Booking Confirmation</h3>
                  <p className="py-4">
                    You are about to book {car.carModel} for ${car.rentalPrice}{" "}
                    per day. Would you like to confirm your booking?
                  </p>
                  <div className="modal-action">
                    <button className="btn" onClick={closeModal}>
                      Cancel
                    </button>
                    <button onClick={handleBooking} className="btn btn-primary">
                      Confirm Booking
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CarDetails;
