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
    mailDeletedByReceiver(state, action) {
      const email = state.mailData.find((item) => item.id === action.payload);
      email.deletedByReceiver = true;
      if (email.deletedBySender) {
        state.mailData = state.mailData.filter(
          (mail) => mail.id !== action.payload
        );
      }
    },
    mailDeletedBySender(state, action) {
      const email = state.mailData.find((item) => item.id === action.payload);
      email.deletedBySender = true;
      if (email.deletedByReceiver) {
        state.mailData = state.mailData.filter(
          (mail) => mail.id !== action.payload
        );
      }
    },
    restoreMailData(state, action) {
      state.mailData = action.payload;
    },
  },
});

export const {
  addMail,
  deleteMail,
  markAsRead,
  restoreMailData,
  mailDeletedByReceiver,
  mailDeletedBySender,
} = mailSlice.actions;
export default mailSlice.reducer;
