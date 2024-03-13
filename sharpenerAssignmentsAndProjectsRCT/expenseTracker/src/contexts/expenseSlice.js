import { createSlice } from "@reduxjs/toolkit";

const expenseSlice = createSlice({
  name: "expenses",
  initialState: {
    expenses: [],
  },
  reducers: {
    addExpense(state, action) {
      state.expenses.push(action.payload);
    },
    restoreExpense(state, action) {
      state.expenses.length = 0;

      for (let val of action.payload) {
        state.expenses.push(val);
      }
    },
    resetExpense(state) {
      state.expenses.length = 0;
    },
  },
});

export default expenseSlice.reducer;
export const { addExpense, restoreExpense, resetExpense } =
  expenseSlice.actions;
