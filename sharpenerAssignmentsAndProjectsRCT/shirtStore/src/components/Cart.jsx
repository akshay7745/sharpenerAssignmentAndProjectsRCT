import { useContext } from "react";
import { cartContext } from "../contexts/CartContextProvider";

const Cart = (props) => {
  const { cartData } = useContext(cartContext);
  let cartMassagedData = cartData.reduce((acc, item) => {
    if (acc[item.shirtName]) {
      acc[item.shirtName].quantity = acc[item.shirtName].quantity + 1;
    } else {
      acc[item.shirtName] = { ...item, quantity: 1 };
    }
    return acc;
  }, {});
  cartMassagedData = Object.values(cartMassagedData);
  const totalAmount = cartMassagedData.reduce((acc, item) => {
    return (acc += item.quantity * item.price);
  }, 0);
  return (
    <div
      style={{
        background: "black",
        height: "800px",
        position: "absolute",
        width: "500px",
        right: "1px",
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
      }}
    >
      <button
        style={{ position: "relative", left: 280, padding: "5px 15px" }}
        onClick={props.hide}
      >
        x
      </button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Total Price</th>
          </tr>
        </thead>
        <tbody>
          {cartMassagedData.map((item) => {
            return (
              <tr key={item._id}>
                <td>{item.shirtName}</td>
                <td>
                  {item.quantity}x{item.price}
                </td>
                <td>={item.quantity * item.price}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <h2>Total amount:{totalAmount}</h2>
    </div>
  );
};

export default Cart;
