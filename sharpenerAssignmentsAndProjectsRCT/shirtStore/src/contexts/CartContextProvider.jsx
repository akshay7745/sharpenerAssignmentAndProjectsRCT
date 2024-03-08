import { createContext, useEffect, useState } from "react";

export const cartContext = createContext();

const CartContextProvider = (props) => {
  const [cartData, setCartData] = useState([]);
  const hanldleCartData = (data) => {
    setCartData((prevData) => {
      return [...prevData, data];
    });
  };
  const restoreCartData = (data) => {
    setCartData(data);
  };
  const getCartData = async () => {
    try {
      const res = await fetch(
        "https://crudcrud.com/api/3adec8f911224b2eb7f0b5e36a2aff63/cart"
      );

      if (res.ok) {
        const cartData = await res.json();
        restoreCartData(cartData);
      } else {
        throw new Error(
          "Something went wrong while adding and storing product"
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCartData();
  }, []);
  return (
    <cartContext.Provider
      value={{ hanldleCartData, restoreCartData, cartData }}
    >
      {props.children}
    </cartContext.Provider>
  );
};

export default CartContextProvider;
