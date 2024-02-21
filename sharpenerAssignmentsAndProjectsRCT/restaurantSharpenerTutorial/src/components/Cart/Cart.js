import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import { useContext } from "react";
import cartContext from "../context/cartContext";

const Cart = (props) => {
  const { addedToCart } = useContext(cartContext);
  const totalAmount = addedToCart.reduce((accumulator, item) => {
    return accumulator + item.price * item.quantity;
  }, 0);
  const cartItems = (
    <ul className={classes["cart-items"]}>
      {addedToCart.map((item) => (
        <li key={item.id}>
          <span>{item.name}</span>
          <span>$ {(item.quantity * item.price).toFixed(2)}</span>
        </li>
      ))}
    </ul>
  );
  return (
    <Modal onCartCardClick={props.onCartCardClick}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>${totalAmount.toFixed(2)} </span>
      </div>
      <div className={classes.actions}>
        <button
          onClick={props.onCartCardClick}
          className={classes["button--alt"]}
        >
          Close
        </button>
        <button className={classes.button}>Order</button>
      </div>
    </Modal>
  );
};

export default Cart;
