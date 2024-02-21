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
    //! ADD STYLE THROUGH CSS FILE
    <ul className={classes["cart-items"]}>
      {addedToCart.map((item) => (
        <li key={item.id}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              alignItems: "center",
              borderBottom: "1px solid black",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",

                width: "30%",
              }}
            >
              <h4 style={{ textAlign: "left" }}>{item.name}</h4>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100px",
                }}
              >
                <span>${item.price}</span>
                <span>x{item.quantity}</span>
              </div>
            </div>
            <div style={{ display: "flex", gap: "10px" }}>
              <span>
                <button>-</button>
              </span>
              <span>
                <button>+</button>
              </span>
            </div>
          </div>
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
