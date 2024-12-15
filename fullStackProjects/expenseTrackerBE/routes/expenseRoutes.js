const express = require("express");
const router = express.Router();

const {
  addExpense,
  getExpenses,
  deleteExpense,
  allExpenses,
} = require("../controllers/expense");
const { authenticate } = require("../middlewares/authenticate");

router.post("/addExpense", authenticate, addExpense);

router.get("/expenses", authenticate, getExpenses);

router.delete("/delete/:expenseId", authenticate, deleteExpense);
// router.delete("/delete/:expenseId", deleteExpense);

module.exports = router;
