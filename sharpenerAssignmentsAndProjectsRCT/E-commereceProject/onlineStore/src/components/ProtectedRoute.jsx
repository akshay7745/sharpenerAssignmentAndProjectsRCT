import { Suspense, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import authContext from "../contexts/authContext";

const ProtectedRoute = (props) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(authContext);
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);
  return isAuthenticated ? (
    <Suspense fallback={<div>Loading...</div>}>{props.children}</Suspense>
  ) : null;
};

export default ProtectedRoute;
