import { createContext, useState } from "react";

export const authContext = createContext({
  handleToken: () => {},
  isAuthenticated: false,
  token: null,
});

const AuthContextProvider = (props) => {
  const [token, setToken] = useState(null);
  const isAuthenticated = !!token;
  const handleToken = (data) => {
    localStorage.setItem("token", data);
    setToken(data);
  };

  return (
    <authContext.Provider value={{ handleToken, isAuthenticated, token }}>
      {props.children}
    </authContext.Provider>
  );
};

export default AuthContextProvider;
