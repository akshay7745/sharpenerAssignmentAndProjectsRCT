import classes from "./CartItem.module.css";
import { useDispatch } from "react-redux";
import {
  increaseCartQuantity,
  decreaseCartQuantity,
  addToCart,
} from "../../store/cartSlice";
const CartItem = (props) => {
  console.log(
    increaseCartQuantity,
    decreaseCartQuantity,
    addToCart,
    "from the cart item"
  );
  const { title, quantity, total, price } = props.item;
  const dispatch = useDispatch();
  return (
    <li className={classes.item}>
      <header>
        <h3>{title}</h3>
        <div className={classes.price}>
          ${total.toFixed(2)}{" "}
          <span className={classes.itemprice}>(${price.toFixed(2)}/item)</span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{quantity}</span>
        </div>
        <div className={classes.actions}>
          <button
            onClick={() => {
              dispatch(decreaseCartQuantity(props.item));
            }}
          >
            {" "}
            -
          </button>
          <button
            onClick={() => {
              dispatch(increaseCartQuantity(props.item));
            }}
          >
            +
          </button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
