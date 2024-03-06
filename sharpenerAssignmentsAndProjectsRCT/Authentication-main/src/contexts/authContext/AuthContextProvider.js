import { useState } from "react";
import authContext from "./authContext";
const AuthContextProvider = (props) => {
  const [authData, setAuthData] = useState(null);
  const handleLogin = (data) => {
    setAuthData(data);
  };
  const handleLogOut = () => {
    setAuthData(null);
  };
  return (
    <authContext.Provider
      value={{ isAuthenticated: authData, handleLogin, handleLogOut }}
    >
      {props.children}
    </authContext.Provider>
  );
};

export default AuthContextProvider;
