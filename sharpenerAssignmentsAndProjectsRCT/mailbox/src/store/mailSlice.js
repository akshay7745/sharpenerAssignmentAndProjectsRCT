import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

export const mailSlice = createSlice({
  name: "email",
  initialState: {
    mailData: [],
  },
  reducers: {
    addMail(state, action) {
      state.mailData.push({ ...action.payload, isRead: false, id: uuidv4() });
    },
    markAsRead(state, action) {
      const email = state.mailData.find((item) => item.id === action.payload);
      email.isRead = true;
    },
    deleteMail(state, action) {},
    restoreMailData(state, action) {
      state.mailData = action.payload || [];
    },
  },
});

export const { addMail, deleteMail, markAsRead, restoreMailData } =
  mailSlice.actions;
export default mailSlice.reducer;
