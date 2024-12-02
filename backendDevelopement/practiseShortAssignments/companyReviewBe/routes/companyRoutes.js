const express = require("express");

const router = express.Router();
const { postReview, getReviews } = require("../controllers/review");

router.post("/company_review", postReview);

router.get("/reviews/:company", getReviews);

module.exports = router;
