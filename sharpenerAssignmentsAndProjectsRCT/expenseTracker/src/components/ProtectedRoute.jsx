import { useContext, useEffect } from "react";
import { authContext } from "../contexts/AuthContextProvider";
import { useNavigate } from "react-router-dom";
const ProtectedRoute = (props) => {
  const { isAuthenticated } = useContext(authContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated]);
  return isAuthenticated ? props.children : null;
};

export default ProtectedRoute;
