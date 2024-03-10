import { createContext, useState } from "react";

export const authContext = createContext();

const AuthContextProvider = (props) => {
  const [token, setToken] = useState("");
  const isAuthenticated = !!token;
  const handleToken = (data) => {
    setToken(data);
  };

  return (
    <authContext.Provider value={{ handleToken, isAuthenticated, token }}>
      {props.children}
    </authContext.Provider>
  );
};

export default AuthContextProvider;
