import { createContext, useEffect, useState } from "react";

export const cartContext = createContext();

const CartContextProvider = (props) => {
  const [cartData, setCartData] = useState([]);
  const addAProductToCart = (data) => {
    setCartData((prevData) => {
      return [...prevData, data];
    });
  };

  const getCartData = async () => {
    try {
      const res = await fetch(
        "https://crudcrud.com/api/ecc4d0efc47244d9994e0757d5eb6781/cart"
      );
      if (res.ok) {
        const cartProducts = await res.json();
        console.log(cartProducts);
        setCartData(cartProducts);
      } else {
        throw new Error("Cart data  Fetching failed please reload the page ");
        // setCartData([]);
      }
    } catch (error) {
      alert(error.message);
    }
  };
  useEffect(() => {
    getCartData();
  }, []);

  return (
    <cartContext.Provider value={{ addAProductToCart, cartData }}>
      {props.children}
    </cartContext.Provider>
  );
};

export default CartContextProvider;
