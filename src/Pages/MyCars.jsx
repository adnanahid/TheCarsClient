import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthProvider";
import toast from "react-hot-toast";
import axios from "axios";

const MyCars = () => {
  const { user } = useContext(AuthContext);
  const [myCars, setMyCars] = useState([]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        if (user?.email) {
          const { data } = await axios.get(
            `http://localhost:5000/my-cars/${user?.email}`
          );
          setMyCars(data);
          console.log("this is 17th line", data);
        }
      } catch (error) {
        toast.error("Error fetching cars.");
      }
    };
    fetchCars();

  }, [user?.email]);

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>carModel</th>
              <th>rentalPrice</th>
              <th>availability</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {myCars.map((myCar, index) => (
              <tr>
                <th>{index + 1}</th>
                <td>{myCar.carModel}</td>
                <td>{myCar.rentalPrice}</td>
                <td>{myCar.availability}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyCars;
