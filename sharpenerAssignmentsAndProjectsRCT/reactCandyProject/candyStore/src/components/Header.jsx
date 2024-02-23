import { useContext } from "react";
import candyContext from "../context/candyContext";

const Header = () => {
  const { cartItems } = useContext(candyContext);
  let totalQuantity = 0;
  if (cartItems.length !== 0) {
    totalQuantity = cartItems.reduce((accu, item) => {
      return accu + item.quantity;
    }, 0);
  }
  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "0 10%",
        alignItems: "center",
      }}
    >
      <h1>CandyStore....</h1>{" "}
      <button style={{ fontSize: "30px", fontWeight: "bold" }}>
        Cart <span>{totalQuantity}</span>
      </button>
    </header>
  );
};

export default Header;
