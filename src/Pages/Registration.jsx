import React, { useContext } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../Provider/AuthProvider";
import { useNavigate } from "react-router-dom";

const Registration = () => {
  const { setUser, userRegistration, updateUserProfile } =
    useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Create a FormData object and extract the form data
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
            setUser({ ...user, displayName, photoURL }); // Update state with user data
          })
          .catch((error) => console.error("Profile update error:", error));
        toast.success("Registration Successful!");
        navigate("/");
      })
      .catch((error) => {
        console.error("Error during registration:", error.message);
        toast.error(error.message); // Display user-friendly error message
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label className="block font-medium">Name</label>
            <input
              type="text"
              name="name"
              className="input input-bordered w-full"
              placeholder="Full Name"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block font-medium">Email</label>
            <input
              type="email"
              name="email"
              className="input input-bordered w-full"
              placeholder="Email"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block font-medium">Password</label>
            <input
              type="password"
              name="password"
              className="input input-bordered w-full"
              placeholder="Password"
              required
            />
          </div>

          {/* Photo URL */}
          <div>
            <label className="block font-medium">Photo URL</label>
            <input
              type="url"
              name="photoURL"
              className="input input-bordered w-full"
              placeholder="Photo URL (optional)"
            />
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-primary w-full">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Registration;
