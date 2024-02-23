import cartContext from "./cartContext";
import { useState } from "react";
const CartContextProvider = (props) => {
  const [cartItems, setCartItems] = useState([]);
  const cartItemsHanlder = (data) => {
    setCartItems((prevState) => {
      return [...prevState, data];
    });
  };
  return (
    <cartContext.Provider value={{ cartItems, addToCart: cartItemsHanlder }}>
      {props.children}
    </cartContext.Provider>
  );
};

export default CartContextProvider;
