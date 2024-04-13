import { createSlice } from "@reduxjs/toolkit";

const authenticationSlice = createSlice({
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
      state.token = "";
      state.userName = "";
      state.isLogin = false;
    },
  },
});

export default authenticationSlice.reducer;
export const { login, logout } = authenticationSlice.actions;
