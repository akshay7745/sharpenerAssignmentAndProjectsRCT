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
      state.expenses = action.payload;
    },
    editExpense(state, action) {
      const { id, amount, description, category } = action.payload;
      const data = state.expenses.find((item) => item.id === id);
      data.amount = amount;
      data.description = description;
      data.category = category;
    },
    deleteExpense(state, action) {
      state.expenses.splice(action.payload.id, 1);
    },
    resetExpense(state) {
      state.expenses.length = 0;
    },
  },
});

export default expenseSlice.reducer;
export const {
  addExpense,
  restoreExpense,
  deleteExpense,
  resetExpense,
  editExpense,
} = expenseSlice.actions;
