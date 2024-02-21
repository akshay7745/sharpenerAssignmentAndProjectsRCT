import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";
import { useContext } from "react";
import cartContext from "../context/cartContext";
const HeaderCartButton = (props) => {
  const { onCartCardClick } = props;
  const { addedToCart } = useContext(cartContext);
  const totalQuantity = addedToCart.reduce((accumulator, item) => {
    return accumulator + item.quantity;
  }, 0);
  return (
    <button onClick={onCartCardClick} className={classes.button}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{totalQuantity}</span>
    </button>
  );
};

export default HeaderCartButton;
