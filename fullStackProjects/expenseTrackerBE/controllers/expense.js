const Expense = require("../models/expense");
const User = require("../models/user");
exports.addExpense = async (req, res, next) => {
  try {
    // const { category, description, amount } = req.body;

    const expense = await req.user.createExpense(req.body);
    const newExpense = req.user.totalExpenses + +req.body.amount;
    const updatedUser = await req.user.update({ totalExpenses: newExpense });

    res.status(201).json({ success: true, expense, updatedUser });
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
  const expenseToBeDeleted = await req.user.getExpenses({
    where: { id: expenseId },
  });
  const newTotalExpense =
    req.user.totalExpenses - +expenseToBeDeleted[0].amount;
  const updateUser = await req.user.update({ totalExpenses: newTotalExpense });
  // const deletedExpense = await Expense.destroy({
  //   where: {
  //     id: expenseId,
  //     userId: req.user.id,
  //   },
  // });
  await expenseToBeDeleted[0].destroy();
  res.status(200).json({
    success: true,
    message: `Expense with id ${expenseToBeDeleted[0].id} deleted successfully.`,
    deleted: expenseToBeDeleted[0],
    updateUser,
  });
};
