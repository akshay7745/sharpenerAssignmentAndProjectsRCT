import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const ProtectedRoute = (props) => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.authentication.isLogin);
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData")) || null;
    if (!userData) {
      navigate("/login");
    }
  }, []);
  return isAuthenticated ? props.children : null;
};

export default ProtectedRoute;
