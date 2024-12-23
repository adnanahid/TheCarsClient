import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import axios from "axios";
import toast from "react-hot-toast";
import { FaTrashCan } from "react-icons/fa6";

const MyBooking = () => {
  const { user } = useContext(AuthContext);
  const [myBooking, setMyBooking] = useState([]);
  const fetchCars = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/my-booked-cars/${user?.email}`
      );
      setMyBooking(data);
    } catch (error) {
      toast.error("Error fetching cars.");
    }
  };
  useEffect(() => {
    fetchCars();
  }, [user?.email]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/my-booked-car/${id}`);
      toast.success("Cancel booking successful");
      fetchCars();
    } catch (err) {
      toast.error("Failed to cancel booking");
      console.log(err);
    }
  };

  return (
    <div className="max-w-screen-lg mx-auto min-h-screen">
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th className="text-center">Image</th>
              <th className="text-center">Model</th>
              <th className="text-center">Price</th>
              <th className="text-center">Date Added</th>
              <th className="text-center">status</th>
              <th className="text-center">Delete</th>
            </tr>
          </thead>
          <tbody>
            {myBooking.map((myCar, index) => (
              <tr key={index}>
                <td className="text-center">
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img src={`${myCar.carImage}`} alt="Car" />
                    </div>
                  </div>
                </td>
                <td className="text-center">{myCar.carModel}</td>
                <td className="text-center">{myCar.rentalPrice}</td>
                <td className="text-center">{myCar.bookingDate}</td>
                <td className="text-center">{myCar.status}</td>
                <td className="text-center">
                  <button onClick={() => handleDelete(myCar._id)}>
                    <FaTrashCan />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyBooking;
