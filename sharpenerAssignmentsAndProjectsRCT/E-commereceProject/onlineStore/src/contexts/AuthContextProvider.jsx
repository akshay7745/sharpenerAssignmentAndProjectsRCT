import authContext from "./authContext";
import { useState } from "react";
// const remainingTimeCalculater = (expirationTime) => {
//   const currentTime = new Date().getTime();
//   const adjExpirationTime = new Date(expirationTime).getTime();
//   const remainingTime = adjExpirationTime - currentTime;
//   return remainingTime;
// }
const modifyUserName = (name) => {
  let ans = "";
  for (let val of name) {
    if (val === "@" || val === ".") {
      continue;
    }
    ans += val;
  }
  return ans;
};
const AuthContextProvider = (props) => {
  const token = localStorage.getItem("token");
  const [authToken, setAuthToken] = useState(token || null);
  const isAuthenticated = !!authToken;
  const [userName, setUserName] = useState("");
  const handleLogin = (data, userName) => {
    localStorage.setItem("token", data);
    const name = modifyUserName(userName);
    setAuthToken(data);
    setUserName(name);
    // const remainingTime = remainingTimeCalculater(expirationTime);
    setTimeout(handleLogout, 5 * 60 * 1000);
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    setAuthToken(null);
  };
  return (
    <authContext.Provider
      value={{ handleLogin, handleLogout, isAuthenticated, userName }}
    >
      {props.children}
    </authContext.Provider>
  );
};

export default AuthContextProvider;
