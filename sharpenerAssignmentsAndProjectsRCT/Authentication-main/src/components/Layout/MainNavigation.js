import { Link } from "react-router-dom";

import classes from "./MainNavigation.module.css";
import { useContext } from "react";
import authContext from "../../contexts/authContext/authContext";
const MainNavigation = () => {
  const { handleLogOut, isAuthenticated } = useContext(authContext);
  return (
    <header className={classes.header}>
      <Link to="/">
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          {!isAuthenticated && (
            <li>
              <Link to="/auth">Login</Link>
            </li>
          )}
          {isAuthenticated && (
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          )}
          {isAuthenticated && (
            <li>
              <button onClick={() => handleLogOut()}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
