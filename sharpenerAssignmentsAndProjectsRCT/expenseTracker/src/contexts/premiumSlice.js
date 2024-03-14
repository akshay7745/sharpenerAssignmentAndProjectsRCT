import { createSlice } from "@reduxjs/toolkit";

const premiumSlice = createSlice({
  name: "premium_features",
  initialState: {
    isPremium: "false",
  },
  reducers: {
    activatePremium(state) {
      state.isPremium = true;
    },
    deactivatePremium(state) {
      state.isPremium = false;
    },
  },
});

export default premiumSlice.reducer;

export const { activatePremium, deactivatePremium } = premiumSlice.actions;
