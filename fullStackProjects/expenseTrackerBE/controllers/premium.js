const User = require("../models/user");
const Expense = require("../models/expense");
exports.allExpenses = async (req, res, next) => {
  try {
    const expenseData = await User.findAll({ include: Expense });
    const massagedExpenses = expenseData
      .map((user) => {
        const { name, expenses, id } = user;
        let totalExpenses = 0;
        expenses.forEach((expenseData) => {
          const { amount } = expenseData;
          totalExpenses += amount;
        });
        return {
          name,
          totalExpenses,
          id,
        };
      })
      .sort((user1, user2) => {
        return user2.totalExpenses - user1.totalExpenses;
      });

    res.status(200).json({ expenses: massagedExpenses });
  } catch (error) {}
};
