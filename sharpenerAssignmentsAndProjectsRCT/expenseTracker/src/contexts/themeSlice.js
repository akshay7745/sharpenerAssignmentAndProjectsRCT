import { createSlice } from "@reduxjs/toolkit";
const themeSlice = createSlice({
  name: "theme",
  initialState: {
    isDarkMode: false,
  },
  reducers: {
    darkMode(state) {
      state.isDarkMode = true;
    },
    lightMode(state) {
      state.isDarkMode = false;
    },
  },
});

export default themeSlice.reducer;

export const { darkMode, lightMode } = themeSlice.actions;
