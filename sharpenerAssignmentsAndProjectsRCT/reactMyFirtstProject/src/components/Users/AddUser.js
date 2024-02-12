import Card from "../UI/Card";
import classes from "./AddUser.module.css";
import Button from "../UI/Button";
import { useState } from "react";
import ErrorModal from "../UI/ErrorModal";
const AddUser = (props) => {
  const [enteredUserName, setEnteredUserName] = useState("");
  const [enteredAge, setEnteredAge] = useState("");
  const [error, setError] = useState(null);

  const errorHandler = () => {
    setError(null);
  };
  const addUserHandler = (event) => {
    event.preventDefault();
    if (enteredAge.trim().length === 0 || enteredUserName.trim().length === 0) {
      setError({
        title: "Invalid Input",
        message: "Please enter valid name and age(Non empty values).",
      });
      return;
    }
    if (+enteredAge < 1) {
      setError({
        title: "Invalid age",
        message: "Please enter a valid age(age>0).",
      });
      return;
    }
    props.onUserAdded(enteredUserName, enteredAge);
    console.log(enteredAge, enteredUserName);
    setEnteredUserName("");
    setEnteredAge("");
  };
  const userNameChageHandler = (e) => {
    setEnteredUserName(e.target.value);
  };
  const userAgeChageHandler = (e) => {
    setEnteredAge(e.target.value);
  };
  return (
    <>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onError={errorHandler}
        />
      )}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <div>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              onChange={userNameChageHandler}
              value={enteredUserName}
            />
          </div>
          <div>
            <label htmlFor="age">Age</label>
            <input
              type="number"
              id="age"
              onChange={userAgeChageHandler}
              value={enteredAge}
            />
          </div>
          <div>
            <Button type="submit">Add User</Button>
          </div>
        </form>
      </Card>
    </>
  );
};

export default AddUser;
