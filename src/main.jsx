import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Root from "./Pages/Root";
import AuthProvider from "./AuthProvider";
import ErrorPage from "./Pages/ErrorPage";
import Home from "./Pages/Home";
import LoginPage from "./Pages/LoginPage";
import AddCar from "./Pages/AddCar";
import MyCars from "./Pages/MyCars";
import Registration from "./Pages/Registration";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/add-car",
        element: <AddCar></AddCar>,
      },
      {
        path: "/my-cars",
        element: <MyCars></MyCars>,
      },
      {
        path: "/login",
        element: <LoginPage></LoginPage>,
      },
      {
        path: "/registration",
        element: <Registration></Registration>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
