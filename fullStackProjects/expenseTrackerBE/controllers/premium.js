const User = require("../models/user");
const Expense = require("../models/expense");
const sequelize = require("../utils/database");
exports.allExpenses = async (req, res, next) => {
  try {
    const userData = await User.findAll({
      attributes: ["id", "name", "totalExpenses"], //include means join default left join
      order: [[sequelize.col("totalExpenses"), "DESC"]],
    });

    res.status(200).json({ expenses: userData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
