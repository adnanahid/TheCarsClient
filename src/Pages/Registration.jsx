import React, { useContext } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../Provider/AuthProvider";
import { Link, useNavigate } from "react-router-dom";

const Registration = () => {
  const { setUser, userRegistration, updateUserProfile } =
    useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const displayName = event.target.name.value;
    const email = event.target.email.value;
    const photoURL = event.target.photoURL.value;
    const password = event.target.password.value;

    userRegistration(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        updateUserProfile({
          displayName,
          photoURL,
        })
          .then(() => {
            setUser({ ...user, displayName, photoURL });
          })
          .catch((error) => console.error("Profile update error:", error));
        toast.success("Registration Successful!");
        navigate("/");
      })
      .catch((error) => {
        console.error("Error during registration:", error.message);
        toast.error(error.message);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Register
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-[#E51837] focus:outline-none"
              placeholder="Enter your name"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-[#E51837] focus:outline-none"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-[#E51837] focus:outline-none"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Photo URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Photo URL (Optional)
            </label>
            <input
              type="url"
              name="photoURL"
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-[#E51837] focus:outline-none"
              placeholder="Enter a photo URL"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#E51837] text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-red-500"
          >
            Register
          </button>
        </form>

        {/* Login Page Link */}
        <p className="mt-4 text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Registration;
