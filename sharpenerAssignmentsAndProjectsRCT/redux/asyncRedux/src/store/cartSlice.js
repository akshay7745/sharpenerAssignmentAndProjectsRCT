import { createSlice } from "@reduxjs/toolkit";
import { updateNotification } from "./ui-slice";
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
  },
  reducers: {
    addToCart(state, action) {
      const item = state.cartItems.find(
        (item) => item.id === action.payload.id
      );
      if (item) {
        item.quantity = item.quantity + 1;
      } else {
        state.cartItems.push({ ...action.payload, quantity: 1 });
      }
    },
    decreaseCartQuantity(state, action) {
      const cartItem = state.cartItems.find(
        (item) => item.id === action.payload.id
      );
      if (cartItem.quantity === 1) {
        const updatedCartItems = state.cartItems.filter(
          (item) => item.id !== action.payload.id
        );
        state.cartItems = updatedCartItems;
      } else {
        cartItem.quantity--;
      }
    },
    increaseCartQuantity(state, action) {
      const cartItem = state.cartItems.find(
        (item) => item.id === action.payload.id
      );
      cartItem.quantity++;
    },
    restoreCart(state, action) {
      state.cartItems = action.payload;
    },
  },
});

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      updateNotification({
        status: "pending",
        title: "Sending...",
        message: "Sending cart data!",
      })
    );

    const sendRequest = async () => {
      const res = await fetch(
        "https://onlinestore-594cd-default-rtdb.firebaseio.com/cartData.json",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(cart),
        }
      );

      if (!res.ok) {
        throw new Error("Sending cart data failed");
      }
    };

    try {
      await sendRequest();
      dispatch(
        updateNotification({
          status: "success",
          title: "Success!",
          message: "Sent cart data successfully",
        })
      );
    } catch (error) {
      dispatch(
        updateNotification({
          status: "error",
          title: "Error!",
          message: "Sending cart data failed!",
        })
      );
    }
  };
};
export const getCartData = () => {
  return async (dispatch) => {
    dispatch(
      updateNotification({
        status: "pending",
        title: "Fetching...",
        message: "Fetching cart data!",
      })
    );
    const gettingResponse = async () => {
      const res = await fetch(
        "https://onlinestore-594cd-default-rtdb.firebaseio.com/cartData.json"
      );
      if (!res.ok) {
        throw new Error(
          "Something went wrong while getting cart data from the backend"
        );
      }
      const resData = await res.json();

      dispatch(
        updateNotification({
          status: "success",
          title: "Success!",
          message: "Updated cart data successfully",
        })
      );
      dispatch(restoreCart(resData));
    };

    try {
      await gettingResponse();
    } catch (error) {
      dispatch(
        updateNotification({
          status: "error",
          title: "Error!",
          message: "Fetching cart data failed!",
        })
      );
    }
  };
};

export const {
  addToCart,
  decreaseCartQuantity,
  increaseCartQuantity,
  restoreCart,
} = cartSlice.actions;
export default cartSlice.reducer;
