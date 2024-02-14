import { createContext, useState, useEffect } from "react";

const AuthContext = createContext({
  isLoggedIn: false,
  onLogIn: (email, password, college) => {},
  onLogOut: () => {},
});

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const authenticationStatus = JSON.parse(localStorage.getItem("isLogin"));
    setIsLoggedIn(authenticationStatus);
  }, [isLoggedIn]);
  const logoutHandler = () => {
    localStorage.setItem("isLogin", false);
    setIsLoggedIn(false);
  };
  const loginHandler = (email, password, college) => {
    localStorage.setItem("isLogin", true);
    console.log("clicked");
    setIsLoggedIn(true);
  };
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        onLogOut: logoutHandler,
        onLogIn: loginHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
