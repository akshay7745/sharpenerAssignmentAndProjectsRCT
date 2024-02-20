import CartIcon from "../Cart/CartIcon";

import classes from "./HeaderCartButton.module.css";
const HeaderCartButton = (props) => {
  const { onCartCardClick } = props;
  return (
    <button onClick={onCartCardClick} className={classes.button}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>4</span>
    </button>
  );
};

export default HeaderCartButton;
