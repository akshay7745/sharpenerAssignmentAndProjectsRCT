const UsersList = (props) => {
  const { allUsers, validSubmit } = props;
  console.log("from usersList", props);
  if (validSubmit.isNameEntered && validSubmit.isAgeEntered) {
    return (
      <div>
        <ul>
          {allUsers.length > 0 &&
            allUsers.map((user) => {
              return (
                <li key={user.id}>{`${user.name} (${user.age} years old)`}</li>
              );
            })}
        </ul>
      </div>
    );
  } else if (!validSubmit.isNameEntered && !validSubmit.isAgeEntered) {
    alert("Please enter a valid name and age (non empty values)");
  } else if (!validSubmit.isAgeEntered) {
    alert("Please enter age non negative number >0");
  }
};

export default UsersList;
