import React, { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!user) {
    navigate("/login"); // Redirect to the login page
  }

  return <>{children}</>;
};

export default PrivateRoute;
