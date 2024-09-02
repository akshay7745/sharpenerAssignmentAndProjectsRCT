import { useState } from "react";

import { createContext } from "react";

export const authContext = createContext();
const modifyUserName = (name) => {
  let ans = "";
  for (let val of name) {
    if (val === "@" || val === ".") {
      continue;
    }
    ans += val;
  }
  console.log(ans, "user name");
  return ans;
};
const AuthContextProvider = (props) => {
  const token = localStorage.getItem("token");
  const [authToken, setAuthToken] = useState(token || null);
  const isAuthenticated = !!authToken;
  const retrivedUserName = localStorage.getItem("userName");
  const [userName, setUserName] = useState(retrivedUserName || "");
  const handleLogin = (data, userName) => {
    localStorage.setItem("token", data);
    const name = modifyUserName(userName);
    localStorage.setItem("userName", name);
    setAuthToken(data);
    setUserName(name);
    // const remainingTime = remainingTimeCalculater(expirationTime);
    // setTimeout(handleLogout, 5 * 60 * 1000);
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
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
