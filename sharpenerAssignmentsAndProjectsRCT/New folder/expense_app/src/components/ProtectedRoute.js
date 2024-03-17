import { useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const ProtectedRoute = (props) => {
  const isAuthenticated = useSelector(
    (store) => store.authentication.isAuthentication
  );
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated]);
  return isAuthenticated ? props.children : null;
};

export default ProtectedRoute;
