const express = require("express");

const router = express.Router();

const { authenticate } = require("../middlewares/authenticate");

const {
  premiumMembership,
  updateTransaction,
} = require("../controllers/purchase");

// premiumController
router.get("/premiummembership", authenticate, premiumMembership);

router.post("/updatetransactionstatus", authenticate, updateTransaction);

module.exports = router;
