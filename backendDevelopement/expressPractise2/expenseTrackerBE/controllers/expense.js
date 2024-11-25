const Expense = require("../models/expense");
exports.createExpense = async (req, res, next) => {
  try {
    const expenseData = req.body;
    if (
      expenseData.name === "" ||
      expenseData.description === "" ||
      expenseData.amount === ""
    ) {
      throw new Error("Please enter valid expense details");
    }
    const newExpense = await Expense.create(expenseData);
    res.status(201).json({ expense: newExpense });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong while creating expense",
      error,
    });
  }
};

exports.getExpenses = async (req, res, next) => {
  try {
    const expenses = await Expense.findAll();
    res.status(200).json({
      expenses,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went while getting expense data",
      error,
    });
  }
};

exports.deleteExpense = async (req, res, next) => {
  try {
    const { expenseId } = req.params;
    if (expenseId === "" || expenseId === "undefined" || !expenseId) {
      throw new Error("Please provide valid expense id");
    }

    const deleteExpense = await Expense.destroy({
      where: {
        id: expenseId,
      },
    });

    res.status(201).json({
      message: `Expense with id ${expenseId} deleted successfully`,
      deleteExpense,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong while deleting expense",
      error,
    });
  }
};

exports.updateExpense = async (req, res, next) => {
  try {
    const { expenseId } = req.params;
    if (expenseId === "" || expenseId === "undefined" || !expenseId) {
      throw new Error("Please provide valid expense id");
    }
    const expense = await Expense.update(req.body, {
      where: {
        id: expenseId,
      },
    });
    const updatedExpense = await Expense.findByPk(expenseId);
    res.status(201).json({
      updatedExpense,
    });
  } catch (error) {}
};
