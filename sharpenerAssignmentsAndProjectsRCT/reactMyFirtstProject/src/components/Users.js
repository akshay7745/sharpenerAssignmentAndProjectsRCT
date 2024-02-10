import "./Users.css";
import UserForm from "./UserForm";
import { useState } from "react";
import UsersList from "./UsersList";
const Users = () => {
  const [usersData, setUsersData] = useState([]);
  const [validSubmit, setValidSubmit] = useState({
    isNameEntered: true,
    isAgeEntered: true,
  });
  console.log(validSubmit, "From app");
  const addUserHandler = (user) => {
    setUsersData((prevUsers) => {
      return [{ ...user, id: Math.random().toString() }, ...prevUsers];
    });
  };
  const validSubmitHandler = (name = true, age = true) => {
    setValidSubmit({ isNameEntered: name, isAgeEntered: age });
  };
  return (
    <div>
      <UserForm onAddUser={addUserHandler} onValidSubmit={validSubmitHandler} />
      <UsersList allUsers={usersData} validSubmit={validSubmit} />
    </div>
  );
};

export default Users;
