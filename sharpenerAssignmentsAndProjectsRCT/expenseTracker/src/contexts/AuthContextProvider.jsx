import { createContext, useState } from "react";

export const authContext = createContext({
  handleToken: () => {},
  isAuthenticated: false,
  token: null,
});

const AuthContextProvider = (props) => {
  const storedToken = localStorage.getItem("token");
  const [token, setToken] = useState(storedToken || null);
  const isAuthenticated = !!token;
  const handleLogin = (data) => {
    localStorage.setItem("token", data);
    setToken(data);
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };
  return (
    <authContext.Provider
      value={{ handleLogin, isAuthenticated, token, handleLogout }}
    >
      {props.children}
    </authContext.Provider>
  );
};

export default AuthContextProvider;
