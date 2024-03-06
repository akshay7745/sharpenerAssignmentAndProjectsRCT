import authContext from "./authContext";
import { useState } from "react";
const AuthContextProvider = (props) => {
  const token = localStorage.getItem("token");
  const [authToken, setAuthToken] = useState(token || null);
  const isAuthenticated = !!authToken;
  const handleLogin = (data) => {
    localStorage.setItem("token", data);
    setAuthToken(data);
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    setAuthToken(null);
  };
  return (
    <authContext.Provider
      value={{ handleLogin, handleLogout, isAuthenticated }}
    >
      {props.children}
    </authContext.Provider>
  );
};

export default AuthContextProvider;
