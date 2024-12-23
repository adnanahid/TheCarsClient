import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Root from "./Pages/Root";
import AuthProvider from "./Provider/AuthProvider";
import ErrorPage from "./Pages/ErrorPage";
import Home from "./Pages/Home";
import LoginPage from "./Pages/LoginPage";
import AddCar from "./Pages/AddCar";
import MyCars from "./Pages/MyCars";
import Registration from "./Pages/Registration";
import AvailableCars from "./Pages/AvailableCars";
import CarDetails from "./Pages/CarDetails";
import MyBooking from "./Pages/MyBooking";
import PrivateRoute from "./PrivateRoute/privateRoute";

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
        path: "/available-cars",
        element: <AvailableCars></AvailableCars>,
      },
      {
        path: "/cars/:id",
        loader: ({ params }) =>
          fetch(`http://localhost:5000/cars/${params.id}`),
        element: (
          <PrivateRoute>
            <CarDetails></CarDetails>
          </PrivateRoute>
        ),
      },
      {
        path: "/add-car",
        element: (
          <PrivateRoute>
            <AddCar></AddCar>
          </PrivateRoute>
        ),
      },
      {
        path: "/my-cars",
        element: (
          <PrivateRoute>
            <MyCars></MyCars>
          </PrivateRoute>
        ),
      },
      {
        path: "/my-booking",
        element: (
          <PrivateRoute>
            <MyBooking></MyBooking>
          </PrivateRoute>
        ),
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
