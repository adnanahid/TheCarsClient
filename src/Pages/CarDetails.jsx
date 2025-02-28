import axios from "axios";
import React, { useState, useContext, useEffect } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { AuthContext } from "../Provider/AuthProvider";
import toast from "react-hot-toast";

const CarDetails = () => {
  const { data } = useLoaderData();
  const car = data;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);

  const today = format(new Date(), "yyyy-MM-dd");

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setStartDate("");
    setEndDate("");
    setTotalPrice(0);
  };

  useEffect(() => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const days = Math.max(0, (end - start) / (1000 * 60 * 60 * 24));
      setTotalPrice(days * car.rentalPrice);
    }
  }, [startDate, endDate, car.rentalPrice]);

  const handleBooking = async (e) => {
    e.preventDefault();

    if (new Date(startDate) >= new Date(endDate)) {
      return toast.error("End date must be later than start date.");
    }

    if (new Date(startDate) < new Date(today)) {
      return toast.error("Start date cannot be in the past.");
    }

    try {
      const bookingData = {
        carId: car._id,
        carModel: car.carModel,
        carImage: car.carImage,
        rentalPrice: car.rentalPrice,
        availability: "Booked",
        location: car.location,
        ownerEmail: car.email,
        buyerEmail: user.email,
        bookingDate: format(new Date(), "dd-MM-yyyy HH:mm"),
        startDate,
        endDate,
        status: "confirmed",
      };

      if (user?.email === car.email) {
        return toast.error("You can't book your own car.");
      }

      await axios.post(
        `${import.meta.env.VITE_DEFAULT_URL}/add-booking`,
        bookingData,
        { withCredentials: true }
      );

      toast.success("Booking successful!");
      closeModal();
      navigate("/my-booking");
    } catch (error) {
      console.error("Error during booking:", error);
      toast.error("Error making the booking. Please try again.");
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-10 md:pt-24 px-4">
      {!car ? (
        <p className="text-center text-gray-500">Loading car details...</p>
      ) : (
        <div>
          <div className="mb-6">
            <img
              src={car.carImage || "https://via.placeholder.com/800x400"}
              alt={car.carModel}
              className="w-full md:h-96 object-cover rounded-lg"
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
          <button
            onClick={openModal}
            className="btn w-full text-white text-xl bg-[#E51837]"
          >
            Book Now
          </button>

          {isModalOpen && (
            <div className="modal modal-open">
              <form
                onSubmit={handleBooking}
                className="modal-box text-center"
                role="dialog"
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
              >
                <h3 id="modal-title" className="font-bold text-lg">
                  Booking Confirmation
                </h3>
                <p id="modal-description" className="py-4">
                  You are booking <strong>{car.carModel}</strong> for{" "}
                  <strong>${car.rentalPrice}</strong> per day.
                </p>
                <div className="py-2">
                  <label
                    htmlFor="start-date"
                    className="block font-medium mb-2"
                  >
                    Start Date
                  </label>
                  <input
                    required
                    type="date"
                    id="start-date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    min={today}
                    className="input input-bordered w-full"
                  />
                </div>
                <div className="py-2">
                  <label htmlFor="end-date" className="block font-medium mb-2">
                    End Date
                  </label>
                  <input
                    required
                    type="date"
                    id="end-date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    min={startDate || today}
                    className="input input-bordered w-full"
                  />
                </div>
                <div className="py-4">
                  <p>
                    <strong>Total Price:</strong> ${totalPrice}
                  </p>
                </div>
                <div className="modal-action">
                  <button type="button" className="btn" onClick={closeModal}>
                    Cancel
                  </button>
                  <button type="submit" className="btn bg-[#E51837] text-white">
                    Confirm Booking
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CarDetails;
