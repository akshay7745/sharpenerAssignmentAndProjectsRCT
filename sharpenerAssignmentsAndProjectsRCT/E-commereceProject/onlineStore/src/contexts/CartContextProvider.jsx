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

  // console.log("from cart context", cartData);
  // const postCartData = async (cartData) => {
  //   try {
  //     const res = await fetch(
  //       `https://crudcrud.com/api/a1d6682b14c44c0c918d9ea2d0c1c75a/cart${userName}`,
  //       {
  //         method: "POST",
  //         body: JSON.stringify({ cartData: cartData }),
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );

  //     if (!res.ok) {
  //       throw new Error("Something went wrong while doing post");
  //     }
  //   } catch (error) {
  //     alert(error.message);
  //   }
  // };
  // useEffect(() => {
  //   if (isAuthenticated && cartData.length) {
  //     postCartData(cartData);
  //   }
  // }, [cartData]);
  const clearCart = () => {
    setCartData([]);
  };
  const onAddToCart = (data) => {
    console.log(data, "from cart context line 36");
    const cartObj = data.reduce((acc, product) => {
      if (acc[product.id]) {
        acc[product.id].quantity = acc[product.id].quantity + 1;
      } else {
        acc[product.id] = { ...product, quantity: 1 };
      }
      return acc;
    }, {});
    console.log(cartObj, "cartObj");

    const cartData = Object.values(cartObj);
    setCartData(cartData);
    // if (Array.isArray(data)) {
    //   setCartData(data);
    // }
    // setCartData((prevState) => {
    //   let flag = false;
    //   const updatedState = prevState.map((item) => {
    //     if (item.id === data.id) {
    //       flag = true;
    //       return {
    //         ...item,
    //         quantity: item.quantity++,
    //       };
    //     }
    //     return item;
    //   });
    //   return flag ? updatedState : [...prevState, { ...data, quantity: 1 }];
    // });
  };
  return (
    <cartContext.Provider value={{ onAddToCart, cartData, clearCart,handleClose,handleShow,show }}>
      {props.children}
    </cartContext.Provider>
  );
};

export default CartContextProvider;
