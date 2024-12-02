const Company = require("../models/company");
const Review = require("../models/review");

exports.postReview = async (req, res, next) => {
  try {
    console.log(req.body);
    const { name, pros, cons, rating } = req.body;
    console.log(name, pros, cons, rating);
    const [company, created] = await Company.findOrCreate({
      where: { name: name },
    });

    const review = await Review.create({ rating, pros, cons });
    const addReview = await company.addReview(review);

    res.status(200).json({ message: "Review added successfully" });
  } catch (error) {
    console.log("Something went wrong while post or adding review", error);
  }
};

exports.getReviews = async (req, res, next) => {
  try {
    const { company: name } = req.params;
    console.log(name);

    const companyReviews = await Company.findOne({
      where: { name },
      include: Review,
    });

    console.log("companyReviews", companyReviews);
    res.status(200).json({ reviews: companyReviews });
  } catch (error) {}
};
