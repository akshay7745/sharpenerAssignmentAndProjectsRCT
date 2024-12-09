const express = require("express");
const router = express.Router();

const {
  addExpense,
  getExpenses,
  deleteExpense,
} = require("../controllers/expense");

router.post("/addExpense", addExpense);

router.get("/expenses", getExpenses);

router.delete("/delete/:expenseId", deleteExpense);

module.exports = router;
