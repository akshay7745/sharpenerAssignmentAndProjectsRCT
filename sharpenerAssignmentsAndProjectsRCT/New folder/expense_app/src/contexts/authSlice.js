import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "authenticate",
  initialState: {
    token: localStorage.getItem("token") || null,
    isAuthentication: !!localStorage.getItem("token") || null,
  },
  reducers: {
    login(state, action) {
      localStorage.setItem("token", action.payload);
      state.isAuthentication = !!action.payload;
      state.token = action.payload;
    },
    logout(state) {
      localStorage.removeItem("token");
      state.isAuthentication = false;
      state.token = null;
    },
  },
});

export default authSlice.reducer;
export const { login, logout } = authSlice.actions;
