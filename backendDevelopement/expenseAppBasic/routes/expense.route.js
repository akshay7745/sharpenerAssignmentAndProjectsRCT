const express = require("express");
const router = express.Router();

const {
  getExpenses,
  deleteExpense,
  editExpense,
  addExpense,
} = require("../controllers/expense.controllers");

router.route("/get-expenses").get(getExpenses);

router.route("/add-expense").post(addExpense);

router.route("/delete-expense/:id").delete(deleteExpense);

router.route("/edit-expense/:id").put(editExpense);
module.exports = router;
