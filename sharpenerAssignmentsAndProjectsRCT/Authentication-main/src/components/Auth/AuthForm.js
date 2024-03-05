import { useState, useRef } from "react";

import classes from "./AuthForm.module.css";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const emailRef = useRef();
  const passRef = useRef();
  console.log(emailRef, passRef);
  const submitHandler = (e) => {
    e.preventDefault();
    if (!isLogin) {
      authRequest(
        {
          email: emailRef.current.value,
          password: passRef.current.value,
          returnSecureToken: true,
        },
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCB10Q6a5p0jTcYwYXRu5YHzmOQ8UefSy4"
      );
    } else {
      authRequest(
        {
          email: emailRef.current.value,
          password: passRef.current.value,
          returnSecureToken: true,
        },
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCB10Q6a5p0jTcYwYXRu5YHzmOQ8UefSy4"
      );
    }
  };
  const authRequest = async (data, url) => {
    setIsLoading(true);
    setIsError(false);
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const data = await response.json();
        setIsLoading(false);
        setIsError(false);
        console.log(data);
      } else {
        const error = await response.json();

        throw new Error(error.error.message);
      }
    } catch (error) {
      setIsError(true);
      alert(error);
    }
  };

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input ref={emailRef} type="email" id="email" />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input ref={passRef} type="password" id="password" required />
        </div>
        <div className={classes.actions}>
          <button type="submit">{isLogin ? "Login" : "Create Account"}</button>
        </div>
        <div className={classes.actions}>
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
        <div>
          <span style={{ color: "white" }}>
            {!isError && isLoading ? "Sending request" : ""}
          </span>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
