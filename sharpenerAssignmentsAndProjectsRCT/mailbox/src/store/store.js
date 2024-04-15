import { configureStore } from "@reduxjs/toolkit";
import mailReducer from "./mailSlice";
import authenticationReducer from "./authenticationSlice";
export const store = configureStore({
  reducer: {
    mails: mailReducer,
    authentication: authenticationReducer,
  },
});
