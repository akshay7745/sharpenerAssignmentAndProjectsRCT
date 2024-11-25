const express = require("express");
const router = express.Router();
const Expense = require("../models/expense");
const {
  getExpenses,
  updateExpense,
  deleteExpense,
  createExpense,
} = require("../controllers/expense");

router.post("/expense", createExpense);

router.get("/expenses", getExpenses);

router.delete("/expenses/:expenseId", deleteExpense);

router.put("/expenses/:expenseId", updateExpense);
module.exports = router;
