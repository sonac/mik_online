import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import Dirs from "./Dirs.jsx";
import Files from "./Files.jsx";
import { loader } from "./Files.jsx";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/dirs",
    element: <Dirs />,
  },
  {
    path: "/files/:dir",
    element: <Files />,
    loader: loader,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
