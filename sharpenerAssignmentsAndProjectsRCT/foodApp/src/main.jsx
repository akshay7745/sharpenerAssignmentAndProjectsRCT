import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import Applayout from './App'
import "./index.css";
import { RouterProvider } from "react-router-dom";
import appRouter from "./App";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={appRouter} />
  </StrictMode>
);