const Expense = require("../models/expense");
const User = require("../models/user");
exports.addExpense = async (req, res, next) => {
  try {
    // const {category,description,amount}= req.body;
    // const newExpense = await Expense.create(req.body);
    // const expense = await req.user.addExpense(newExpense);
    const expense = await req.user.createExpense(req.body);

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
    const expenses = await req.user.getExpenses({ include: User });

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
      userId: req.user.id,
    },
  });

  res.status(200).json({
    success: true,
    message: `Expense with id ${deletedExpense} deleted successfully.`,
  });
};
