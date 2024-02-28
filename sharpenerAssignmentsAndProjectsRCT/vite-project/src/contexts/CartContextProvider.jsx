import cartContext from "./cartContext";
import { useState } from "react";
const CartContextProvider = (props) => {
  const [cartItems, setCartItems] = useState([]);
  const cartItemsHanlder = (data) => {
    setCartItems((prevState) => {
      let flag = false;
      const updatedQuantity = prevState.map((item) => {
        if (item.id === data.id) {
          flag = true;
          return {
            ...item,
            quantity: Number(item.quantity) + Number(data.quantity),
          };
        }
        return item;
      });
      return flag ? updatedQuantity : [...prevState, data];
    });
  };
  return (
    <cartContext.Provider value={{ cartItems, addToCart: cartItemsHanlder }}>
      {props.children}
    </cartContext.Provider>
  );
};

export default CartContextProvider;
