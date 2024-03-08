import React, { useContext } from "react";
import { cartContext } from "../contexts/CartContextProvider";

const Cart = (props) => {
  const { cartData } = useContext(cartContext);
  return (
    <div
      style={{
        background: "black",
        height: "800px",
        position: "absolute",
        width: "500px",
        right: "1px",
      }}
    >
      <button
        style={{ position: "relative", left: "480px" }}
        onClick={props.hide}
      >
        x
      </button>
    </div>
  );
};

export default Cart;
