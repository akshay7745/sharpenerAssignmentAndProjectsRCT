import React from "react";
import classes from "./Header.module.css";
import { HEADER_BACKGROUND_IMG } from "../../assets/constants";
import HeaderCartButton from "./HeaderCartButton";
const Header = (props) => {
  const { onCartCardClick } = props;
  return (
    <React.Fragment>
      <header className={classes.header}>
        <h1>ReactMeals</h1>
        <HeaderCartButton onCartCardClick={onCartCardClick} />
      </header>
      <div className={classes["main-image"]}>
        <img
          src={HEADER_BACKGROUND_IMG}
          alt="A table full of delicious foods!"
        />
      </div>
    </React.Fragment>
  );
};

export default Header;
