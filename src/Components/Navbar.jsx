import React, { useContext } from "react";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../AuthProvider";
const Navbar = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="navbar bg-base-100">
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
          <NavLink>Home</NavLink>
          <NavLink>Available Cars</NavLink>
          {user ? (
            <div className="space-x-5 flex items-center">
              <NavLink to="/add-car">Add Cars</NavLink>
              <NavLink>My Cars</NavLink>
              <NavLink>My Booking</NavLink>
            </div>
          ) : (
            <NavLink to="/login">Login</NavLink>
          )}

          <img
            referrerPolicy="no-referrer"
            className="w-10 h-10 rounded-full"
            src={`${user?.photoURL}`}
            alt={`${user?.displayName}`}
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
