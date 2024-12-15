const express = require("express");
const router = express.Router();

const {
  addExpense,
  getExpenses,
  deleteExpense,
} = require("../controllers/expense");
const { authenticate } = require("../middlewares/authenticate");

router.post("/addExpense", authenticate, addExpense);

router.get("/expenses", authenticate, getExpenses);

router.delete("/delete/:expenseId", authenticate, deleteExpense);

module.exports = router;
