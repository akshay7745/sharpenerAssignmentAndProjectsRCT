import { Fragment } from "react";
import { useEffect } from "react";
import { useState } from "react";

const Asyncfile = () => {
  const [data, setData] = useState([]);
  const getUsers = async () => {
    try {
      const res = await fetch("https://reqres.in/api/users?page=2");
      const data = await res.json();
      console.log(data);
      setData(data.data);
    } catch (error) {}
  };
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <Fragment>
      <ul>
        {data.length > 0 &&
          data.map((item) => {
            const { avatar, email, first_name, id, last_name } = item;
            return (
              <li key={id}>
                <span>{email}</span>
                <span>{first_name}</span>
                <span>{last_name}</span>
              </li>
            );
          })}
      </ul>
      <h2>Async data</h2>
    </Fragment>
  );
};

export default Asyncfile;
