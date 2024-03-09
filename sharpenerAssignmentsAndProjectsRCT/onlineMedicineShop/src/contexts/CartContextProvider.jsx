import { createContext, useEffect, useState } from "react";

export const cartContext = createContext();

const CartContextProvider = (props) => {
  const [cartData, setCartData] = useState([]);
  const restoreCartData = (data) => {
    setCartData(data);
  };
  const getCartData = async () => {
    try {
      const res = await fetch(
        "https://crudcrud.com/api/92780c94fd844895bb4af50ad05a6dfc/medicines"
      );
      if (res.ok) {
        console.log(res, "cartItems");
        const cartItems = await res.json();
        console.log(cartItems, "cart itesm");
        restoreCartData(cartItems);
      }
    } catch (error) {
      console.log(
        "Something went wrong while getting medicine data after app launching"
      );
    }
  };
  useEffect(() => {
    getCartData();
  }, []);

  const addItemToCart = (data) => {
    setCartData((prevState) => {
      return [...prevState, data];
    });
  };
  return (
    <cartContext.Provider value={{ addItemToCart, restoreCartData, cartData }}>
      {props.children}
    </cartContext.Provider>
  );
};

export default CartContextProvider;
