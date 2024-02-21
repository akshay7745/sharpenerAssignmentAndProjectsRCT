import { createContext, useState } from "react";

const cartContext = createContext({
  onAddCart: (data) => {},
  addedToCart: [],
  addItem: () => {},
  removeItem: (id) => {},
  addOnlyOneItem: (id) => {},
});

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
  const increaseByOne = (id) => {
    setAddedToCart((prevState) => {
      const newState = prevState.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            quantity: item.quantity + 1,
          };
        }
        return item;
      });
      return newState;
    });
  };
  const decreaseByOne = (id) => {
    setAddedToCart((prevState) => {
      const arr = [];
      for (let val of prevState) {
        if (val.id === id) {
          if (val.quantity > 1) {
            arr.push({ ...val, quantity: val.quantity - 1 });
          } else {
            continue;
          }
        } else {
          arr.push(val);
        }
      }
      return arr;
    });
  };
  return (
    <cartContext.Provider
      value={{
        totalAmount,
        addedToCart,
        addItem: addCartHandler,
        removeItem: decreaseByOne,
        addOnlyOneItem: increaseByOne,
      }}
    >
      {props.children}
    </cartContext.Provider>
  );
};

export default cartContext;
