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

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>

      },
      {
        path: "/login",
        element: <LoginPage></LoginPage>
      },
      {
        path: "/add-car",
        element: <AddCar></AddCar>
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
