import React from "react";
import { Provider } from "react-redux";
import store from "./contexts/store.js";
import ReactDOM from "react-dom/client";
import { router } from "./App.js";
import { RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
