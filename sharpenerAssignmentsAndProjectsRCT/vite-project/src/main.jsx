import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import AddMedicineContextProvider from "./contexts/AddMedicineContextProveder";
import CartContextProvider from "./contexts/CartContextProvider";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CartContextProvider>
      <AddMedicineContextProvider>
        <App />
      </AddMedicineContextProvider>
    </CartContextProvider>
  </React.StrictMode>
);
