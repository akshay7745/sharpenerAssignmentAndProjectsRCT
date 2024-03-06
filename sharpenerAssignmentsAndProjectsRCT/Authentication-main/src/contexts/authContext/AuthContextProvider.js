import { useEffect, useState } from "react";
import authContext from "./authContext";
const AuthContextProvider = (props) => {
  const myToken = localStorage.getItem("token");
  const [authData, setAuthData] = useState(myToken || null);
  const isAuthenticated = !!authData;
  useEffect(() => {
    if (!isAuthenticated) {
      localStorage.removeItem("token");
    }
  }, [isAuthenticated]);

  const handleLogin = (data) => {
    setAuthData(data);
    localStorage.setItem("token", data);
  };
  const handleLogOut = () => {
    setAuthData(null);
    localStorage.removeItem("token");
  };
  return (
    <authContext.Provider
      value={{ token: authData, handleLogin, isAuthenticated, handleLogOut }}
    >
      {props.children}
    </authContext.Provider>
  );
};

export default AuthContextProvider;
