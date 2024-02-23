import { useContext, useState } from "react";
import cartContext from "../contexts/cartContext";

const Header = (props) => {
  const { cartItems } = useContext(cartContext);

  const totalItems = cartItems.reduce((acc, item) => {
    return acc + Number(item.quantity);
  }, 0);
  return (
    <header>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "0 10%",
        }}
      >
        <h2>Medical Store</h2>
        <button
          onClick={() => {
            props.showCartHandler(true);
          }}
        >
          Cart:{totalItems}
        </button>
      </div>
    </header>
  );
};

export default Header;
