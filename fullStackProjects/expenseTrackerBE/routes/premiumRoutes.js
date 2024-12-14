const express = require("express");
const router = express.Router();
const { allExpenses } = require("../controllers/premium");
router.get("/showleaderboard", allExpenses);

module.exports = router;
