const Expense = require("../models/expense.model");

const getExpenses = (req, res) => {
  Expense.findAll()
    .then((expenses) => {
      res.status(200).json({ expenses });
    })
    .catch((err) => {
      res.status(500).json({ err });
    });
};

const addExpense = (req, res) => {
  const { category, amount, description } = req.body;

  Expense.create({ category, amount, description })
    .then((expense) => {
      res.status(201).json({ expense });
    })
    .catch((err) => {
      res.status(500).json({ err });
    });
};

const deleteExpense = (req, res) => {
  // Expense.findByPk(req.params.id).then((expense)=>{
  //     expense.destroy();
  //     res.status(200).json({message:"deleted"})
  // })

  Expense.destroy({ where: { id: req.params.id } })
    .then((result) => {
      res.status(200).json({ message: "deleted" });
    })
    .catch((err) => {
      res.status(500).json({ err });
    });
};

const editExpense = (req, res) => {
  Expense.findByPk(req.params.id)
    .then((expense) => {
      expense
        .update({
          category: req.body.category,
          amount: req.body.amount,
          description: req.body.description,
        })
        .then((result) => {
          res.status(200).json({ message: "updated" });
        });
    })
    .catch((err) => {
      res.status(500).json({ err });
    });
};

module.exports = { getExpenses, deleteExpense, editExpense, addExpense };
