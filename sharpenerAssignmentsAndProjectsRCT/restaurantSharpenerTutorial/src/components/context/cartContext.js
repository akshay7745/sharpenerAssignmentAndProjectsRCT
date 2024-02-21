import { createContext, useState } from "react";

const cartContext = createContext({ onAddCart: (data) => {}, addedToCart: [] });

export const CartContextProvider = (props) => {
  const [addedToCart, setAddedToCart] = useState([]);
  console.log("From the cart context", addedToCart);
  const totalAmount = 0;
  const addCartHandler = (data) => {
    setAddedToCart((prevState) => {
      let flag = null;
      const newState = prevState.map((item) => {
        if (item.id === data.id) {
          flag = true;
          return { ...item, quantity: item.quantity + data.quantity };
        }
        return item;
      });
      return flag ? newState : [...prevState, data];
    });
  };
  return (
    <cartContext.Provider
      value={{
        totalAmount,
        addedToCart,
        addItem: addCartHandler,
        removeItem: (id) => {},
      }}
    >
      {props.children}
    </cartContext.Provider>
  );
};

export default cartContext;
