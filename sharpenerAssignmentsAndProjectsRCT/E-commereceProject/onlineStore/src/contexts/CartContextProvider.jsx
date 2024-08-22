import { useEffect, useState, useContext } from "react";
import cartContext from "./cartContext";
import authContext from "./authContext";
// import { useSearch } from "../utility/useSearch";
const CartContextProvider = (props) => {
  const [cartData, setCartData] = useState([]);
  const [show, setShow] = useState(false);
  const { userName, isAuthenticated } = useContext(authContext);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const clearCart = () => {
    async function clearProductData(id) {
      fetch(
        `http://crossorigin.me/https://crudcrud.com/api/${
          import.meta.env.VITE_KEY_URL
        }/cart${userName}${id}`,
        {
          method: "DELELE",
          headers: {
            "Content-type": "application/json",
          },
        }
      );
    }
    for (let val of cartData) {
      if (val._id) {
        clearProductData(val._id);
      }
    }
    setCartData([]);

    alert("Order placed successfully.");
  };
  const removeProduct = (id) => {
    const filteredProducts = cartData.filter((product) => product.id !== id);
    setCartData(filteredProducts);
  };
  const addSingleProduct = (data) => {
    setCartData((state) => {
      return [...state, data];
    });
  };
  const onAddToCart = (data) => {
    setCartData(data);
  };
  return (
    <cartContext.Provider
      value={{
        onAddToCart,
        cartData,
        clearCart,
        handleClose,
        handleShow,
        show,
        addSingleProduct,
        removeProduct,
      }}
    >
      {props.children}
    </cartContext.Provider>
  );
};

export default CartContextProvider;
