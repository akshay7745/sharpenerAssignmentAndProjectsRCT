import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import { RouterProvider } from "react-router-dom";
import { appRouter } from "./App.jsx";
import CourseContextProvider from "./context/CourseContextProvider.jsx";
import AuthContextProvider from "./context/AuthContextProvider.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthContextProvider>
      <CourseContextProvider>
        <RouterProvider router={appRouter} />
      </CourseContextProvider>
    </AuthContextProvider>
  </StrictMode>
);
