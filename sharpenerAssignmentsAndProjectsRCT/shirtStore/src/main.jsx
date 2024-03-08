import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import ProductContextProvider from "./contexts/ProductContextProvider.jsx";
import CartContextProvider from "./contexts/CartContextProvider.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ProductContextProvider>
      <CartContextProvider>
        <App />
      </CartContextProvider>
    </ProductContextProvider>
  </React.StrictMode>
);
