import React, { useReducer } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

const Login = (props) => {
  // const [formIsValid, setFormIsValid] = useState(false);
  const formReducer = (state, action) => {
    if (action.type === "USER_EMAIL") {
      let validateEmail = false;
      if (action.value.trim().includes("@") && action.value.trim().length > 6) {
        validateEmail = true;
      }
      let validateForm = false;
      if (state.password && state.college && validateEmail) {
        validateForm = true;
      }
      return {
        ...state,
        email: action.value,
        isEmailValid: validateEmail,
        isFormValid: validateForm,
      };
    } else if (action.type === "USER_PASSWORD") {
      let validatePass = false;
      if (action.value.trim().length > 6) {
        validatePass = true;
      }
      let validateForm = false;
      if (state.email && state.college && validatePass) {
        validateForm = true;
      }
      return {
        ...state,
        password: action.value,
        isPasswordValid: validatePass,
        isFormValid: validateForm,
      };
    } else {
      let validateCollegeName = false;
      if (action.value.trim().length > 6) {
        validateCollegeName = true;
      }
      let validateForm = false;
      if (state.password && state.email && validateCollegeName) {
        validateForm = true;
      }
      return {
        ...state,
        college: action.value,
        isCollegeNameValid: validateCollegeName,
        isFormValid: validateForm,
      };
    }
  };
  const [formState, formDispatch] = useReducer(formReducer, {
    email: "",
    isEmailValid: false,
    password: "",
    isPasswordValid: false,
    college: "",
    isCollegeNameValid: false,
    isFormValid: false,
  });

  // useEffect(() => {
  //   const clearTimer = setTimeout(() => {
  //     console.log("Effect");
  //     setFormIsValid(
  //       enteredPassword.trim().length > 6 &&
  //         enteredEmail.includes("@") &&
  //         enteredCollegeName.trim().length > 6 &&
  //         enteredCollegeName !== ""
  //     );
  //   }, 700);

  //   return () => {
  //     console.log("SetTimeout cleared");
  //     clearTimeout(clearTimer);
  //   };
  // }, [enteredEmail, enteredPassword, enteredCollegeName]);

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
      props.onLogin(formState.email, formState.password, formState.college);
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
            disabled={!formState.isFormValid}
          >
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
