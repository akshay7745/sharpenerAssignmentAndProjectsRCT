import Card from "../UI/Card";
import classes from "./AddUser.module.css";
import Button from "../UI/Button";
import { useState } from "react";
import ErrorModal from "../UI/ErrorModal";
const AddUser = (props) => {
  const [enteredUserName, setEnteredUserName] = useState("");
  const [enteredCollege, setEnteredCollege] = useState("");
  const [enteredAge, setEnteredAge] = useState("");
  const [error, setError] = useState(null);

  const errorHandler = () => {
    setError(null);
  };
  const addUserHandler = (event) => {
    event.preventDefault();
    if (
      enteredAge.trim().length === 0 ||
      enteredUserName.trim().length === 0 ||
      enteredCollege.trim().length === 0
    ) {
      setError({
        title: "Invalid Input",
        message:
          "Please enter valid name , age(Non empty values) and valid college name.",
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
    props.onUserAdded(enteredUserName, enteredAge, enteredCollege);
    setEnteredUserName("");
    setEnteredAge("");
    setEnteredCollege("");
  };
  const userNameChageHandler = (e) => {
    setEnteredUserName(e.target.value);
  };
  const userCollegeChageHandler = (e) => {
    setEnteredCollege(e.target.value);
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
            <label htmlFor="college">College Name</label>
            <input
              type="text"
              id="college"
              onChange={userCollegeChageHandler}
              value={enteredCollege}
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
