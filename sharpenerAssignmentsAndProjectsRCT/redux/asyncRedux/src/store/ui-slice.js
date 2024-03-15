import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    isCartVisible: false,
    notification: {
      showNotification: null,
      status: "",
      title: "",
      message: "",
    },
  },
  reducers: {
    updateNotification(state, action) {
      state.notification.showNotification = true;
      state.notification.status = action.payload.status;
      state.notification.title = action.payload.title;
      state.notification.message = action.payload.message;
    },
    toggleCart(state) {
      state.isCartVisible = !state.isCartVisible;
    },
  },
});

export const { updateNotification, toggleCart } = uiSlice.actions;
export default uiSlice.reducer;
