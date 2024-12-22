import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import toast from "react-hot-toast";
import axios from "axios";
import { FaTrashCan } from "react-icons/fa6";
import { FaPenFancy } from "react-icons/fa";
import { useDropzone } from "react-dropzone";
import { Link } from "react-router-dom";

const MyCars = () => {
  const { user } = useContext(AuthContext);
  const [myCars, setMyCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [sortOption, setSortOption] = useState("newest");

  // Fetch user's cars
  const fetchCars = async (sort = "date_asc") => {
    try {
      if (user?.email) {
        const { data } = await axios.get(
          `http://localhost:5000/my-cars/${user?.email}?sort=${sort}`
        );
        setMyCars(data);
      }
    } catch (error) {
      toast.error("Error fetching cars.");
    }
  };

  useEffect(() => {
    fetchCars(sortOption);
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
                await axios.delete(`http://localhost:5000/cars/${carId}`);
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

  // Handle update modal
  const handleUpdate = (car) => {
    setSelectedCar(car);
    setIsOpen(true);
  };

  // Handle file drop for images
  const onDrop = (acceptedFiles) => {
    setUploadedImages(acceptedFiles);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  // Handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const carsInfo = Object.fromEntries(formData.entries());

    // Append uploaded images
    uploadedImages.forEach((file) => {
      carsInfo.append("images", file);
    });

    try {
      await axios.put(
        `http://localhost:5000/cars/${selectedCar._id}`,
        carsInfo,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      toast.success("Car updated successfully!");
      setIsOpen(false);
      fetchCars(sortOption);
    } catch (error) {
      console.error("Error updating car:", error);
      toast.error("Failed to update car.");
    }
  };

  if (myCars.length === 0)
    return (
      <div className="text-gray-500 min-h-screen flex flex-col items-center justify-center">
        <p>No cars available. Add a new car to get started!</p>
        <Link to="/add-car" className="btn btn-primary mt-4">
          Add Car
        </Link>
      </div>
    );

  return (
    <div className="min-h-screen">
      <div className="flex justify-between items-center lg:max-w-screen-lg mx-auto py-4">
        <h2 className="text-2xl font-bold">My Cars</h2>
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
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th className="text-center">Image</th>
              <th className="text-center">Model</th>
              <th className="text-center">Price</th>
              <th className="text-center">Availability</th>
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
                <td className="text-center">{myCar.rentalPrice}</td>
                <td className="text-center">{myCar.availability}</td>
                <td className="text-center">
                  {new Date(myCar.dateAdded).toLocaleDateString()}
                </td>
                <td className="text-center">
                  <button onClick={() => handleUpdate(myCar)}>
                    <FaPenFancy />
                  </button>
                </td>
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

      {/* Update modal */}
      {isOpen && selectedCar && (
        <dialog open className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Update Car</h3>
            <form onSubmit={handleFormSubmit}>
              <div className="py-2">
                <label className="block">Car Model</label>
                <input
                  name="carModel"
                  defaultValue={selectedCar.carModel}
                  className="input input-bordered w-full"
                />
              </div>
              <div className="py-2">
                <label className="block">Daily Rental Price</label>
                <input
                  name="rentalPrice"
                  type="number"
                  defaultValue={selectedCar.rentalPrice}
                  className="input input-bordered w-full"
                />
              </div>
              <div className="py-2">
                <label className="block">Availability</label>
                <input
                  name="availability"
                  defaultValue={selectedCar.availability}
                  className="input input-bordered w-full"
                />
              </div>
              <div className="py-2">
                <label className="block">Vehicle Registration Number</label>
                <input
                  name="registrationNumber"
                  defaultValue={selectedCar.registrationNumber}
                  className="input input-bordered w-full"
                />
              </div>
              <div className="py-2">
                <label className="block">Features</label>
                <input
                  name="features"
                  defaultValue={selectedCar.features}
                  className="input input-bordered w-full"
                />
              </div>
              <div className="py-2">
                <label className="block">Description</label>
                <textarea
                  name="description"
                  defaultValue={selectedCar.description}
                  className="textarea textarea-bordered w-full"
                ></textarea>
              </div>
              <div className="py-2">
                <label className="block">Location</label>
                <input
                  name="location"
                  defaultValue={selectedCar.location}
                  className="input input-bordered w-full"
                />
              </div>
              <div className="py-2">
                <label className="block">Upload Images</label>
                <div
                  {...getRootProps()}
                  className="border-dashed border-2 p-4 rounded-md cursor-pointer"
                >
                  <input {...getInputProps()} />
                  <p>Drag & drop files here, or click to select files</p>
                </div>
                {uploadedImages.length > 0 && (
                  <ul className="mt-2">
                    {uploadedImages.map((file, index) => (
                      <li key={index}>{file.name}</li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="modal-action">
                <button type="submit" className="btn btn-primary">
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="btn"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default MyCars;
