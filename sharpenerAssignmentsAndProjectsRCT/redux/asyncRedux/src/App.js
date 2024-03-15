import { useEffect } from "react";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useSelector, useDispatch } from "react-redux";
import { updateNotification } from "./store/ui-slice";
import Notification from "./components/UI/Notification";
import { sendCartData, getCartData } from "./store/cartSlice";
let firstTimeLoading = true;
function App() {
  const dispatch = useDispatch();
  const isCartVisible = useSelector((store) => store.ui.isCartVisible);
  const cartStore = useSelector((store) => store.cart.cartItems);
  const notification = useSelector((store) => store.ui.notification);

  // const saveCartData = async (cartStore) => {
  //   try {
  //     dispatch(
  //       updateNotification({
  //         status: "pending",
  //         message: "Sending cart data",
  //         title: "Sending...",
  //       })
  //     );
  //     const res = await fetch(
  //       "https://onlinestore-594cd-default-rtdb.firebaseio.com/cartData.json",
  //       {
  //         method: "PUT",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(cartStore),
  //       }
  //     );
  //     if (!res.ok) {
  //       throw new Error("Something went wrong while updating cart data");
  //     }
  //     dispatch(
  //       updateNotification({
  //         status: "success",
  //         message: "sent cart data successfully",
  //         title: "Success!",
  //       })
  //     );
  //   } catch (error) {
  //     console.log(error.message);
  //     dispatch(
  //       updateNotification({
  //         status: "error",
  //         message: "Sending cart data failed",
  //         title: "Error!",
  //       })
  //     );
  //   }
  // };
  useEffect(() => {
    if (firstTimeLoading) {
      firstTimeLoading = false;
      dispatch(getCartData());
      return;
    }
    dispatch(sendCartData(cartStore));
    // saveCartData(cartStore);
  }, [cartStore]);
  return (
    <>
      {notification.showNotification && (
        <Notification
          status={notification.status}
          message={notification.message}
          title={notification.title}
        />
      )}
      <Layout>
        {isCartVisible && <Cart />}
        <Products />
      </Layout>
    </>
  );
}

export default App;
