import authContext from "../../contexts/authContext/authContext";
import classes from "./ProfileForm.module.css";
import { useRef, useState, useContext } from "react";
const ProfileForm = () => {
  const passwordRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { isAuthenticated } = useContext(authContext);
  const passChangeHandler = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCB10Q6a5p0jTcYwYXRu5YHzmOQ8UefSy4`,
        {
          method: "POST",
          body: JSON.stringify({
            idToken: isAuthenticated,
            password: passwordRef.current.value,
            returnSecureToken: true,
            headers: {
              "Content-Type": "application/json",
            },
          }),
        }
      );
      if (res.ok) {
        const resData = await res.json();
        console.log("Password updated successfully", resData);
        setIsLoading(false);
        setIsError(false);
      } else {
        const resData = await res.json();
        const err = resData.error.message;
        throw new Error(err);
      }
    } catch (error) {
      setIsError(true);
      alert(error);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    passChangeHandler();
  };
  return (
    <form onSubmit={handleSubmit} className={classes.form}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input ref={passwordRef} type="password" id="new-password" />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
      <div>{isLoading && !isError && <span>Loading please wait...</span>}</div>
    </form>
  );
};

export default ProfileForm;
