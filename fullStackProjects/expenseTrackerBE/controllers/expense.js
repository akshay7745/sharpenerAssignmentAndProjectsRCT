const Expense = require("../models/expense");

exports.addExpense = async (req, res, next) => {
  try {
    // const {category,description,amount}= req.body;
    const expense = await Expense.create(req.body);

    res.status(201).json({ success: true, expense });
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  }
};

exports.getExpenses = async (req, res, next) => {
  try {
    const expenses = await Expense.findAll();

    res.status(200).json({
      success: true,
      expenses,
    });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};

exports.deleteExpense = async (req, res, next) => {
  const { expenseId } = req.params;

  const deletedExpense = await Expense.destroy({
    where: {
      id: expenseId,
    },
  });

  res
    .status(200)
    .json({
      success: true,
      message: `Expense with id ${deletedExpense} deleted successfully.`,
    });
};
