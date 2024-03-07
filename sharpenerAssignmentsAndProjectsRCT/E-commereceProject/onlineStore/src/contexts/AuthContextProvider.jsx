import authContext from "./authContext";
import { useState } from "react";
// const remainingTimeCalculater = (expirationTime) => {
//   const currentTime = new Date().getTime();
//   const adjExpirationTime = new Date(expirationTime).getTime();
//   const remainingTime = adjExpirationTime - currentTime;
//   return remainingTime;
// }
const AuthContextProvider = (props) => {
  const token = localStorage.getItem("token");
  const [authToken, setAuthToken] = useState(token || null);
  const isAuthenticated = !!authToken;
  const handleLogin = (data) => {
    localStorage.setItem("token", data);
    setAuthToken(data);
    // const remainingTime = remainingTimeCalculater(expirationTime);
    setTimeout(handleLogout, 5 * 60 * 1000);
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
