import { useContext } from "react";
import { cartContext } from "../contexts/CartContextProvider";

const Cart = ({ handleHide }) => {
  const { cartData } = useContext(cartContext);
  const cartMassagedData = cartData.reduce((acc, item) => {
    if (acc[item.name]) {
      acc[item.name].quantity = acc[item.name].quantity + 1;
    } else {
      acc[item.name] = { ...item, quantity: 1 };
    }
    return acc;
  }, {});
  const updatedCart = Object.values(cartMassagedData);
  const totalAmount = updatedCart.reduce((acc, item) => {
    return (acc += Number(item.price) * Number(item.quantity));
  }, 0);
  return (
    <div
      style={{
        position: "absolute",
        background: "black",
        color: "white",
        height: "800px",
        width: "300px",
        right: 1,
      }}
    >
      <button onClick={handleHide}>Cart</button>
      <div>
        <table style={{ border: "1px solid white" }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Total Price</th>
            </tr>
          </thead>
          <tbody>
            {updatedCart.map((item) => {
              return (
                <tr key={item._id}>
                  <td>{item.name} :</td>
                  <td>{`${item.price} X ${item.quantity}`} =</td>
                  <td>{+item.price * +item.quantity}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <h3>Total amount: {totalAmount}</h3>
      </div>
    </div>
  );
};

export default Cart;
