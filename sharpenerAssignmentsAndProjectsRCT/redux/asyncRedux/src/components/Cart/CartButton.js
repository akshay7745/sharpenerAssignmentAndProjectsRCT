import classes from "./CartButton.module.css";
import { toggleCart } from "../../store/cartSlice";
import { useDispatch, useSelector } from "react-redux";
const CartButton = (props) => {
  const cartItems = useSelector((store) => store.cart.cartItems);
  let totalItems = 0;
  totalItems =
    cartItems.length > 0 &&
    cartItems.reduce((acc, item) => {
      return (acc += item.quantity);
    }, 0);
  const dispatch = useDispatch();
  return (
    <button onClick={() => dispatch(toggleCart())} className={classes.button}>
      <span>My Cart</span>
      <span className={classes.badge}>{totalItems}</span>
    </button>
  );
};

export default CartButton;
