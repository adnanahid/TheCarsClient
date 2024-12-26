import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import axios from "axios";
import toast from "react-hot-toast";
import { FaTrashCan } from "react-icons/fa6";
import { SlCalender } from "react-icons/sl";
import EmptyAnimation from "../assets/EmptyAnimation.json";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import Swal from "sweetalert2";
import Lottie from "lottie-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const MyBooking = () => {
  const { user } = useContext(AuthContext);
  const [myBooking, setMyBooking] = useState([]);
  const [editBooking, setEditBooking] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const fetchCars = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_DEFAULT_URL}/my-booked-cars/${user?.email}`,
        { withCredentials: true }
      );
      setMyBooking(data);
    } catch (error) {
      toast.error("Error fetching cars.");
    }
  };

  useEffect(() => {
    fetchCars();
  }, [user?.email]);

  //! handleDelete operations
  const handleCancelBooking = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        await axios.put(
          `${import.meta.env.VITE_DEFAULT_URL}/my-booked-car/${id}?email=${
            user.email
          }`,
          { status: "cancel" },
          { withCredentials: true }
        );

        toast.success("Cancel booking successful");
        fetchCars(); // Ensure this function is defined and updates the UI properly.

        await Swal.fire({
          title: "Canceled!",
          position: "top-right",
          text: "Your booking has been canceled.",
          icon: "success",
        });
      }
    } catch (err) {
      toast.error("Failed to cancel booking");
      console.error(err); // Log the error for debugging purposes.
    }
  };

  //! handleUpdate operations
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(
        `${import.meta.env.VITE_DEFAULT_URL}/my-booked-car/${
          editBooking.carId
        }`,
        { startDate, endDate },
        { withCredentials: true }
      );
      toast.success("Booking updated successfully");
      setEditBooking(null); // Close modal
      fetchCars(); // Refresh bookings
    } catch (err) {
      toast.error("Failed to update booking");
      console.log(err);
    }
  };

  return (
    <div className="max-w-screen-lg mx-auto min-h-screen mt-16">
      <div className="overflow-x-auto">
        <h1 className="text-4xl font-bold text-center mb-12">My Booking</h1>
        {myBooking.length > 0 ? (
          <table className="table">
            <thead>
              <tr>
                <th className="text-center">Image</th>
                <th className="text-center">Model</th>
                <th className="text-center">Total Price</th>
                <th className="text-center">Date Added</th>
                <th className="text-center">Status</th>
                <th className="text-center">Update</th>
                <th className="text-center">Cancel Booking</th>
              </tr>
            </thead>
            <tbody>
              {myBooking.map((myCar, index) => (
                <tr key={index} className="hover:bg-gray-100 transition">
                  <td className="text-center">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img src={`${myCar.carImage}`} alt="Car" />
                      </div>
                    </div>
                  </td>
                  <td className="text-center">{myCar.carModel}</td>
                  <td className="text-center">
                    {Math.ceil(
                      (new Date(myCar?.endDate) - new Date(myCar?.startDate)) /
                        (1000 * 60 * 60 * 24)
                    ) * parseInt(myCar.rentalPrice)}
                  </td>
                  <td className="text-center">{myCar.bookingDate}</td>
                  <td className="text-center">{myCar.status}</td>
                  <td className="text-center">
                    <button
                      onClick={() => {
                        setEditBooking(myCar);
                        setStartDate(new Date(myCar.startDate));
                        setEndDate(new Date(myCar.endDate));
                      }}
                      className="btn btn-xs bg-blue-400 text-white gap-2 items-center text-center hover:bg-blue-600"
                      disabled={myCar.status === "cancel"}
                    >
                      <SlCalender /> <span>Modify Date</span>
                    </button>

                    {/* Modal for editing booking */}
                    {editBooking && (
                      <div className="modal modal-open">
                        <form onSubmit={handleUpdate} className="modal-box">
                          <h3 className="font-bold text-lg">Edit Booking</h3>
                          <p className="py-2">
                            Update details for{" "}
                            <strong>{editBooking.carModel}</strong>.
                          </p>
                          <div className="py-2">
                            <label className="block font-medium">
                              Start Date
                            </label>
                            <DatePicker
                              selected={startDate}
                              onChange={(date) => setStartDate(date)}
                              className="input input-bordered w-full"
                              dateFormat="yyyy-MM-dd"
                            />
                          </div>
                          <div className="py-2">
                            <label className="block font-medium">
                              End Date
                            </label>
                            <DatePicker
                              selected={endDate}
                              onChange={(date) => setEndDate(date)}
                              className="input input-bordered w-full"
                              dateFormat="yyyy-MM-dd"
                            />
                          </div>
                          <div className="modal-action">
                            <button
                              className="btn"
                              onClick={() => setEditBooking(null)}
                            >
                              Cancel
                            </button>
                            <button type="submit" className="btn btn-primary">
                              Save Changes
                            </button>
                          </div>
                        </form>
                      </div>
                    )}
                  </td>
                  <td className="text-center">
                    <button
                      onClick={() => handleCancelBooking(myCar.carId)}
                      disabled={myCar.status === "cancel"}
                      className={`btn btn-xs ${
                        myCar.status === "cancel"
                          ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                          : "bg-red-500 hover:bg-red-600 text-white"
                      }`}
                    >
                      <FaTrashCan /> <span>Cancel Booking</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center text-gray-500 mt-10">
            <Lottie animationData={EmptyAnimation}></Lottie>
          </div>
        )}
      </div>
      {myBooking.length > 0 && (
        <div className="p-4 bg-white rounded-lg shadow-md my-12">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Chart based on car Daily Rental Price
          </h2>
          <BarChart
            width={500}
            height={300}
            data={myBooking}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" className="stroke-gray-300" />
            <XAxis dataKey="carModel" className="text-gray-500" />
            <YAxis className="text-gray-500" />
            <Tooltip wrapperStyle={{ outline: "none" }} />
            <Legend />
            <Bar dataKey="rentalPrice" fill="#4f46e5" />
          </BarChart>
        </div>
      )}
    </div>
  );
};

export default MyBooking;
