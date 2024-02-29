import { useState } from "react";
import cartContext from "./cartContext";
// import { useSearch } from "../utility/useSearch";

const CartContextProvider = (props) => {
  const [cartData, setCartData] = useState([]);

  const onAddToCart = (data) => {
    setCartData((prevState) => {
      let flag = false;
      const updatedState = prevState.map((item) => {
        if (item.id === data.id) {
          flag = true;
          return {
            ...item,
            quantity: item.quantity++,
          };
        }
        return item;
      });
      return flag ? updatedState : [...prevState, { ...data, quantity: 1 }];
    });
  };
  return (
    <cartContext.Provider value={{ onAddToCart, cartData }}>
      {props.children}
    </cartContext.Provider>
  );
};

export default CartContextProvider;
