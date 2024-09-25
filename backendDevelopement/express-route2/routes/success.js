const express = require("express");

const router = express.Router();
const { success } = require("../controllers/shop");

router.route("/").post(success);

module.exports = router;
