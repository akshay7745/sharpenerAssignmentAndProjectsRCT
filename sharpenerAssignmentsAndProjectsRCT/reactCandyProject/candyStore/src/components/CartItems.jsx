import { useContext } from "react";
import candyContext from "../context/candyContext";

const CartItems = () => {
  const { cartItems } = useContext(candyContext);
  const totalAmount = cartItems.reduce((acc, item) => {
    return acc + item.quantity * item.price;
  }, 0);
  return (
    <ul>
      {cartItems.map((item) => {
        return (
          <li key={item.id}>
            <div>
              <div>
                <div>{item.name}</div>
                <div>
                  <span>₹{item.price}</span>
                  <span>x{item.quantity}</span>
                </div>
              </div>
              <div>
                <button>-</button>
                <button>+</button>
              </div>
            </div>
          </li>
        );
      })}
      <div>Total amount :{totalAmount} </div>
    </ul>
  );
};

export default CartItems;
