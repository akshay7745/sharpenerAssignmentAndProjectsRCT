import Input from "../Input/Input";
import React, {
  useReducer,
  useState,
  useEffect,
  useContext,
  useRef,
} from "react";
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
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const collegeInputRef = useRef();
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
    if (formIsValid) {
      authContextData.onLogIn(
        formState.email,
        formState.password,
        formState.college
      );
    } else if (!formState.isEmailValid) {
      emailInputRef.current.activate();
    } else if (!formState.isPasswordValid) {
      passwordInputRef.current.activate();
    } else {
      collegeInputRef.current.activate();
    }
  };
  // const validateEmailHandler = () => {
  //   setEmailIsValid(enteredEmail.includes("@"));
  // };
  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          ref={emailInputRef}
          type="email"
          id="email"
          value={formState.email}
          onChange={emailChangeHandler}
          labelName="E-Mail"
          isValid={formState.isEmailValid}
        />

        <Input
          ref={passwordInputRef}
          type="password"
          id="password"
          value={formState.password}
          onChange={passwordChangeHandler}
          labelName="Password"
          isValid={formState.isPasswordValid}
        />
        <Input
          ref={collegeInputRef}
          type="text"
          id="collegeName"
          value={formState.college}
          onChange={collegeNameChangeHandler}
          labelName="College Name"
          isValid={formState.isCollegeNameValid}
        />

        <div className={classes.actions}>
          <Button
            type="submit"
            className={classes.btn}
            // disabled={!formIsValid}
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
