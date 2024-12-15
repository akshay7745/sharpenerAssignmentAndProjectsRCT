const Expense = require("../models/expense");
const User = require("../models/user");
const sequelize = require("../utils/database");
exports.addExpense = async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    const expense = await req.user.createExpense(req.body, { transaction: t });
    const newExpense = req.user.totalExpenses + +req.body.amount;
    const updatedUser = await req.user.update(
      { totalExpenses: newExpense },
      { transaction: t }
    );
    await t.commit();
    res.status(201).json({ success: true, expense, updatedUser });
  } catch (error) {
    await t.rollback();
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
  const t = await sequelize.transaction();
  try {
    const { expenseId } = req.params;
    const expenseToBeDeleted = await req.user.getExpenses({
      where: { id: expenseId },
      transaction: t,
    });
    const newTotalExpense =
      req.user.totalExpenses - +expenseToBeDeleted[0].amount;
    const updateUser = await req.user.update(
      { totalExpenses: newTotalExpense },
      { transaction: t }
    );

    await expenseToBeDeleted[0].destroy({ transaction: t });
    await t.commit();
    res.status(200).json({
      success: true,
      message: `Expense with id ${expenseToBeDeleted[0].id} deleted successfully.`,
      deleted: expenseToBeDeleted[0],
      updateUser,
    });
  } catch (error) {
    await t.rollback();

    res.status(500).json({
      message: "Something went wrong while deleting expense",
      error,
    });
  }
};
