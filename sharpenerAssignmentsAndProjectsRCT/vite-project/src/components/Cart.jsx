import { useContext } from "react";
import cartContext from "../contexts/cartContext";

const Cart = ({ hideCartList }) => {
  const { cartItems } = useContext(cartContext);
  const totalAmount = cartItems.reduce((acc, item) => {
    return acc + Number(item.price) * Number(item.quantity);
  }, 0);
  return (
    <div
      style={{
        position: "absolute",
        background: "grey",
        left: "600px",
        padding: "20px 40px",
      }}
    >
      <ul>
        {cartItems.map((item) => {
          const { name, price, quantity, id } = item;
          return (
            <li
              key={id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <span>{name}</span>
                <div>
                  <span>₹ {price}</span>
                  <span>x{quantity}</span>
                </div>
              </div>
              <div>₹ {(Number(price) * Number(quantity)).toFixed(2)}</div>
            </li>
          );
        })}
        <h3>Total amount: ₹ {totalAmount}</h3>
        <button
          onClick={() => {
            hideCartList(false);
          }}
        >
          close
        </button>
      </ul>
    </div>
  );
};

export default Cart;
