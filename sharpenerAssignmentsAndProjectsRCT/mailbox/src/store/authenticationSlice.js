import { createSlice } from "@reduxjs/toolkit";

export const authenticationSlice = createSlice({
  name: "authentication",
  initialState: {
    userData: {
      token: "",
      userId: "",
    },
    isLogin: false,
  },
  reducers: {
    login: (state, action) => {
      state.userData = action.payload;
      state.isLogin = !!action.payload.token;
    },
    logout: (state) => {
      state.userData = { token: "", userId: "" };

      state.isLogin = false;
    },
  },
});

export default authenticationSlice.reducer;
export const { login, logout } = authenticationSlice.actions;
