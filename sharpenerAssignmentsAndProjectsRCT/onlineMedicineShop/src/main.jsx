import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import MedicineContextProvider from "./contexts/MedicineContextProvider.jsx";
import CartContextProvider from "./contexts/CartContextProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MedicineContextProvider>
      <CartContextProvider>
        <App />
      </CartContextProvider>
    </MedicineContextProvider>
  </React.StrictMode>
);
