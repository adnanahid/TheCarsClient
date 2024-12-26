import React, { useContext } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../Provider/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import RegistrationAnimation from "../assets/RegistrationAnimation.json";
import { FaGoogle } from "react-icons/fa";

const Registration = () => {
  const {
    user,
    setUser,
    userRegistration,
    updateUserProfile,
    signOutUser,
    signInWithGoogle,
  } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleGoogleLogin = (event) => {
    event.preventDefault();
    signInWithGoogle()
      .then((result) => {
        setUser(user);
        toast.success("Login Successfully!");
        navigate(location?.state ? location.state : "/");
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.error(errorMessage);
        toast.error("An error occurred. Please try again.");
      });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const displayName = event.target.name.value;
    const email = event.target.email.value;
    const photoURL = event.target.photoURL.value;
    const password = event.target.password.value;

    userRegistration(email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        // Update the user profile with displayName and photoURL
        updateUserProfile({
          displayName,
          photoURL,
        });
        signOutUser().then(() => {});
        navigate("/login") // Redirect after successful registration
          .then(() => {
            setUser({ ...user, displayName, photoURL });
            toast.success("Registration Successful!");

            //after registration user have to login
          })
          .catch((error) => {
            console.error("Profile update error:", error.message);
            toast.error("Failed to update profile. Please try again.");
          });
      })
      .catch((error) => {
        console.error("Error during registration:", error.message);
        toast.error(error.message);
      });
  };

  return (
    <div className="min-h-screen max-w-screen-lg mx-auto flex flex-col md:flex-row items-center justify-center px-4 py-8">
      {/* Animation Section */}
      <div className="w-full md:w-1/2 flex justify-center">
        <Lottie animationData={RegistrationAnimation} loop={true} />
      </div>

      {/* Registration Form Section */}
      <div className="w-full md:w-1/2 max-w-md bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Register
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-red-500 focus:outline-none"
              placeholder="Enter your name"
              required
            />
          </div>

          {/* Email Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-red-500 focus:outline-none"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-red-500 focus:outline-none"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Photo URL Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Photo URL (Optional)
            </label>
            <input
              type="url"
              name="photoURL"
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-red-500 focus:outline-none"
              placeholder="Enter a photo URL"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-500"
          >
            Register
          </button>
          <div className="mt-4 flex items-center justify-between">
            <span className="block h-px bg-gray-300 w-full"></span>
            <span className="text-sm text-gray-500 px-4">or</span>
            <span className="block h-px bg-gray-300 w-full"></span>
          </div>
        </form>
        <button
          onClick={handleGoogleLogin}
          className="mt-4 w-full flex items-center justify-center gap-2 bg-blue-500 text-white py-2 rounded-lg shadow-md hover:bg-red-600 transition-all"
        >
          <FaGoogle />
          Login with Google
        </button>

        {/* Redirect to Login Page */}
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
