import { useState } from "react";

const UserForm = (props) => {
  const [user, setUser] = useState({
    name: "",
    age: "",
  });

  const { onAddUser, onValidSubmit } = props;
  const submitHandler = (event) => {
    event.preventDefault();
    if (user.name.trim().length > 0 && Number(user.age.trim()) > 0) {
      onAddUser(user);
      setUser({
        name: "",
        age: "",
      });
      onValidSubmit();
    } else if (user.name.trim().length === 0) {
      onValidSubmit(false, false);
    } else if (Number(user.age.trim()) === 0) {
      onValidSubmit(true, false);
    }
  };

  const inputChangeHandler = (e) => {
    setUser((prevUser) => {
      return {
        ...prevUser,
        [e.target.name]: e.target.value,
      };
    });
  };
  return (
    <div>
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="name"
            value={user.name}
            onChange={inputChangeHandler}
          />
        </div>
        <div>
          <label htmlFor="number">Age(Years)</label>
          <input
            name="age"
            type="number"
            id="number"
            value={user.age}
            onChange={inputChangeHandler}
          />
        </div>
        <div>
          <button type="submit" value={"Add User"}>
            Add User
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
