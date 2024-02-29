import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import CartContextProvider from "./contexts/CartContextProvider.jsx";
import { RouterProvider } from "react-router-dom";
import router from "./App.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CartContextProvider>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </CartContextProvider>
  </React.StrictMode>
);
