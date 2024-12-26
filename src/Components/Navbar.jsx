import React, { useContext } from "react";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import toast from "react-hot-toast";
import icon from "../../public/assets/logoTesla.png";

const Navbar = () => {
  const { user, signOutUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleSignOut = () => {
    signOutUser().then(() => {
      toast.success("LogOut successful");
    });
  };

  return (
    <div className="w-full shadow-lg md:h-16">
      <div className="max-w-screen-2xl mx-auto flex items-center justify-between px-4 py-2">
        {/* Navbar Start */}
        <div className="flex items-center">
          {/* Dropdown for smaller screens */}
          <div className="dropdown lg:hidden">
            <button tabIndex={0} role="button" className="text-2xl">
              <HiOutlineMenuAlt1 />
            </button>
            <div
              tabIndex={0}
              className="menu menu-sm dropdown-content rounded-box z-[1] mt-3 w-52 p-2 shadow bg-white"
            >
              <NavLink to="/" className="block py-2">
                Home
              </NavLink>
              <NavLink to="/available-cars" className="block py-2">
                Available Cars
              </NavLink>
              {user ? (
                <>
                  <NavLink to="/add-car" className="block py-2">
                    Add Cars
                  </NavLink>
                  <NavLink to="/my-cars" className="block py-2">
                    My Cars
                  </NavLink>
                  <NavLink to="/my-booking" className="block py-2">
                    My Booking
                  </NavLink>
                  <button
                    onClick={handleSignOut}
                    className="block py-2 text-left"
                  >
                    LogOut
                  </button>
                </>
              ) : (
                <>
                  <NavLink to="/login" className="block py-2">
                    Login
                  </NavLink>
                  <NavLink to="/registration" className="block py-2">
                    Registration
                  </NavLink>
                </>
              )}
            </div>
          </div>

          {/* Logo */}
          <img src={icon} alt="Logo" className="w-8 ml-2" />
          <div
            onClick={() => navigate("/")}
            className="text-2xl font-bold ml-2"
          >
            The <span className="text-red-600">Cars</span>
          </div>
        </div>

        {/* Navbar Links for Larger Screens */}
        <div className="hidden lg:flex items-center space-x-6">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/available-cars">Available Cars</NavLink>
          {user ? (
            <div className="flex items-center space-x-6">
              <NavLink to="/add-car">Add Cars</NavLink>
              <NavLink to="/my-cars">My Cars</NavLink>
              <NavLink to="/my-booking">My Booking</NavLink>
              <button onClick={handleSignOut} className="">
                Logout
              </button>
              <div className="dropdown dropdown-end">
                <button
                  tabIndex={0}
                  role="button"
                  className="btn-circle avatar"
                >
                  <div className="w-10 rounded-full">
                    <img
                      referrerPolicy="no-referrer"
                      alt={`${user?.displayName}`}
                      src={`${user?.photoURL}`}
                    />
                  </div>
                </button>
              </div>
            </div>
          ) : (
            <div className="flex gap-5">
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/registration">Registration</NavLink>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
