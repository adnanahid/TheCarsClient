import React, { useContext, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
// import { toast,  } from "react-hot-toast";

const LoginPage = () => {
  const { user, setUser, loginWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleGoogleLogin = (event) => {
    event.preventDefault();
    loginWithGoogle()
      .then((result) => {
        const user = result.user;
        setUser(user);
        toast.success("Login Successfully!");
        navigate("/");
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
        toast.error("error");
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="card w-96 bg-white shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-center">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="input input-bordered w-full"
                required
              />
            </div>
            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className="input input-bordered w-full"
                required
              />
            </div>
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary text-white">
                Login
              </button>
            </div>
          </form>
          <button
            onClick={handleGoogleLogin}
            className="btn btn-error text-white"
          >
            Login with Google
          </button>
          <p className="text-center mt-4">
            Don't have an account?
            <a href="#" className="text-blue-500 hover:underline">
              Sign Up
            </a>
          </p>
        </div>
      </div>
      <Toaster></Toaster>
    </div>
  );
};

export default LoginPage;
