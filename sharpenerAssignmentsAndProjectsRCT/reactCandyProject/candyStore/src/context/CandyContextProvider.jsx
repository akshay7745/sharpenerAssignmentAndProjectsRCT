import { useState } from "react";
import candyContext from "./candyContext";

const CandyContextProvider = (props) => {
  const [candy, setCandy] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const addToCart = (data) => {
    let flag = false;
    const updatedQuantity = cartItems.map((item) => {
      if (item.id !== data.id) {
        return item;
      } else {
        flag = true;
        return { ...item, quantity: +item.quantity + Number(data.quantity) };
      }
    });
    flag
      ? setCartItems(updatedQuantity)
      : setCartItems((prevData) => {
          return [...prevData, data];
        });
  };
  const addNewCandy = (data) => {
    setCandy((prevState) => {
      return [...prevState, { ...data, quantity: 0 }];
    });
  };
  return (
    <candyContext.Provider
      value={{
        candies: candy,
        addNewCandy,
        addToCart,
        cartItems: cartItems,
      }}
    >
      {props.children}
    </candyContext.Provider>
  );
};

export default CandyContextProvider;
