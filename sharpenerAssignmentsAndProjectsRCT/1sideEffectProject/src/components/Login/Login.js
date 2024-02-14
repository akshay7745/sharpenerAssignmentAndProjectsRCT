import React, { useReducer, useState, useEffect, useContext } from "react";
import AuthContext from "../../store/auth-context";
import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
const formReducer = (state, action) => {
  if (action.type === "USER_EMAIL") {
    let validateEmail = false;
    if (action.value.trim().includes("@") && action.value.trim().length > 6) {
      validateEmail = true;
    }

    return {
      ...state,
      email: action.value,
      isEmailValid: validateEmail,
    };
  } else if (action.type === "USER_PASSWORD") {
    let validatePass = false;
    if (action.value.trim().length > 6) {
      validatePass = true;
    }
    return {
      ...state,
      password: action.value,
      isPasswordValid: validatePass,
    };
  } else {
    let validateCollegeName = false;
    if (action.value.trim().length > 6) {
      validateCollegeName = true;
    }

    return {
      ...state,
      college: action.value,
      isCollegeNameValid: validateCollegeName,
    };
  }
};

const Login = () => {
  const [formIsValid, setFormIsValid] = useState(false);
  const [formState, formDispatch] = useReducer(formReducer, {
    email: "",
    isEmailValid: false,
    password: "",
    isPasswordValid: false,
    college: "",
    isCollegeNameValid: false,
  });
  const authContextData = useContext(AuthContext);
  const { isCollegeNameValid, isEmailValid, isPasswordValid } = formState;
  useEffect(() => {
    const clearTimer = setTimeout(() => {
      console.log("Effect");
      setFormIsValid(isCollegeNameValid && isEmailValid && isPasswordValid);
    }, 700);

    return () => {
      console.log("SetTimeout cleared");
      clearTimeout(clearTimer);
    };
  }, [isEmailValid, isPasswordValid, isCollegeNameValid]);

  const emailChangeHandler = (event) => {
    formDispatch({ type: "USER_EMAIL", value: event.target.value });
  };

  const passwordChangeHandler = (event) => {
    formDispatch({ type: "USER_PASSWORD", value: event.target.value });
  };
  const collegeNameChangeHandler = (event) => {
    formDispatch({ type: "USER_COLLEGENAME", value: event.target.value });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (formState.email && formState.password && formState.college) {
      authContextData.onLogIn(
        formState.email,
        formState.password,
        formState.college
      );
    }
  };
  // const validateEmailHandler = () => {
  //   setEmailIsValid(enteredEmail.includes("@"));
  // };
  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            formState.isEmailValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={formState.email}
            onChange={emailChangeHandler}
            /* onBlur={validateEmailHandler}*/
          />
        </div>
        <div
          className={`${classes.control} ${
            formState.isPasswordValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={formState.password}
            onChange={passwordChangeHandler}
            /*onBlur={validatePasswordHandler}*/
          />
        </div>
        <div
          className={`${classes.control} ${
            formState.isCollegeNameValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="collegeName">College Name</label>
          <input
            type="text"
            id="collegeName"
            value={formState.college}
            onChange={collegeNameChangeHandler}
            /* onBlur={validateCollegeNameHandler}*/
          />
        </div>
        <div className={classes.actions}>
          <Button
            type="submit"
            className={classes.btn}
            disabled={!formIsValid}
            onClick={authContextData.onLogIn}
          >
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
