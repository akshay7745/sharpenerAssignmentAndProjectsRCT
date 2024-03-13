import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",
  initialState: {
    counter1: 0,
    showCounter: true,
  },
  reducers: {
    increment(state) {
      state.counter1 += 5;
    },
    decrement(state) {
      state.counter1 -= 5;
    },
    increase(state, action) {
      state.counter1 = state.counter1 + action.payload;
    },
    toggleCounter(state) {
      state.showCounter = !state.showCounter;
    },
  },
});

export default counterSlice.reducer;
export const counterActions = counterSlice.actions;
