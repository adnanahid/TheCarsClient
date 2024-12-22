import React, { useContext } from "react";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import toast from "react-hot-toast";
const Navbar = () => {
  const { user, signOutUser } = useContext(AuthContext);

  const handleSignOut = () => {
    signOutUser().then((result) => {
      toast.success("LogOut successful");
    });
  };
  return (
    <div className="navbar">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="lg:hidden">
            <HiOutlineMenuAlt1 />
          </div>
          <div
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <NavLink>Home</NavLink>
          </div>
        </div>
        <a className="btn btn-ghost text-xl">The Cars</a>
      </div>
      <div className="navbar-end hidden lg:flex">
        <div className="menu menu-horizontal px-1 space-x-5 lg:flex items-center">
          <NavLink to="/">Home</NavLink>
          <NavLink to="available-cars">Available Cars</NavLink>
          {user ? (
            <div className="space-x-5 flex items-center">
              <NavLink to="/add-car">Add Cars</NavLink>
              <NavLink to="/my-cars">My Cars</NavLink>
              <NavLink to="/my-booking">My Booking</NavLink>
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full">
                    <img
                      referrerPolicy="no-referrer"
                      alt={`${user?.displayName}`}
                      src={`${user?.photoURL}`}
                    />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                >
                  <li>
                    <a onClick={handleSignOut} className="justify-between">
                      LogOut
                    </a>
                  </li>
                </ul>
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
