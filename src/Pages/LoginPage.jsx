import React, { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { toast, Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";

const LoginPage = () => {
  const { user, setUser, signInWithGoogle, signInWithEmailPass } =
    useContext(AuthContext);
  const navigate = useNavigate();

  const handleGoogleLogin = (event) => {
    event.preventDefault();
    signInWithGoogle()
      .then((result) => {
        setUser(user);
        toast.success("Login Successfully!");
        navigate("/");
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.error(errorMessage);
        toast.error("An error occurred. Please try again.");
      });
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    signInWithEmailPass(email, password)
      .then((result) => {
        const user = result.user;
        setUser(user);
        toast.success("Login Successfully!");
        navigate("/");
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.error(errorMessage);
        toast.error("Invalid email or password.");
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-sm">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Welcome Back
        </h2>
        <form onSubmit={handleSignIn}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg shadow-md hover:bg-blue-700 transition-all"
          >
            Login
          </button>
        </form>
        <div className="mt-4 flex items-center justify-between">
          <span className="block h-px bg-gray-300 w-full"></span>
          <span className="text-sm text-gray-500 px-4">or</span>
          <span className="block h-px bg-gray-300 w-full"></span>
        </div>
        <button
          onClick={handleGoogleLogin}
          className="mt-4 w-full flex items-center justify-center gap-2 bg-red-500 text-white py-2 rounded-lg shadow-md hover:bg-red-600 transition-all"
        >
          <FaGoogle />
          Login with Google
        </button>
        <p className="text-center mt-6 text-sm text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/registration"
            className="text-blue-600 hover:underline font-medium"
          >
            Sign Up
          </Link>
        </p>
      </div>
      <Toaster />
    </div>
  );
};

export default LoginPage;
