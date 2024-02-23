import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import CandyContextProvider from "./context/CandyContextProvider.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CandyContextProvider>
      <App />
    </CandyContextProvider>
  </React.StrictMode>
);
