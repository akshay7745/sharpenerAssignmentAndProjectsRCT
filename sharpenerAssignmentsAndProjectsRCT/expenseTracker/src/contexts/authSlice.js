import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "authenticate",
  initialState: {
    token: localStorage.getItem("token") || null,
    isAuthentication: !!localStorage.getItem("token") || null,
    email: localStorage.getItem("email") || "",
    displayName: "",
    profilePicture: "",
  },
  reducers: {
    login(state, action) {
      const { idToken, email, profilePicture, displayName } = action.payload;
      localStorage.setItem("token", idToken);
      localStorage.setItem("email", email);
      state.isAuthentication = !!action.payload.idToken;
      state.token = idToken;
      state.email = email;
      state.profilePicture = profilePicture || "";
      state.displayName = displayName || "";
    },
    logout(state) {
      localStorage.removeItem("token");
      localStorage.removeItem("email");
      state.isAuthentication = false;
      state.token = null;
      state.email = null;
    },
  },
});

export default authSlice.reducer;
export const { login, logout } = authSlice.actions;
