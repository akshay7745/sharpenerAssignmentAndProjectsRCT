const User = require("../models/user");
const Expense = require("../models/expense");
const sequelize = require("../utils/database");
exports.allExpenses = async (req, res, next) => {
  try {
    // const aggregatedExpenses = await Expense.findAll({
    //   attributes: [
    // [sequelize.fn("SUM", sequelize.col("amount")), "totalAmount"],
    //     "userId",
    //   ],
    //   group: ["userId"],
    //   include: User,
    // });
    const userData = await User.findAll({
      attributes: [
        "id",
        "name",
        [sequelize.fn("SUM", sequelize.col("expenses.amount")), "total_sum"],
      ], //include means join default left join
      include: [
        {
          model: Expense,
          attributes: [],
        },
      ],
      group: ["user.id"],
      order: [[sequelize.col("total_sum"), "DESC"]],
    });

    res.status(200).json({ expenses: userData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
