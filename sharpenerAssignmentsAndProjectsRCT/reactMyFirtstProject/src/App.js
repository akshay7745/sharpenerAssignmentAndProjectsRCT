import React, { useState } from "react";
import AddUser from "./components/Users/AddUser";
import UsersList from "./components/Users/UsersList";

function App() {
  const [users, setUsers] = useState([]);
  const userAddHandler = (userName, userAge, userCollege) => {
    setUsers((prevData) => {
      return [
        {
          name: userName,
          age: userAge,
          college: userCollege,
          id: Math.random().toString(),
        },
        ...prevData,
      ];
    });
  };
  return (
    <div>
      <AddUser onUserAdded={userAddHandler} />
      <UsersList users={users} />
    </div>
  );
}

export default App;
