import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import expenseReducer from "./expenseSlice";
import themeReducer from "./themeSlice";
import premiumReducer from "./premiumSlice";
const store = configureStore({
  reducer: {
    authentication: authReducer,
    expense: expenseReducer,
    theme: themeReducer,
    premium: premiumReducer,
  },
});

export default store;
