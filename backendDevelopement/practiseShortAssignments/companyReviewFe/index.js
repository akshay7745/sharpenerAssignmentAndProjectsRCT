const addReviewForm = document.getElementById("addReviewForm");
const showReviewForm = document.getElementById("showReviewForm");
const reviewContainer = document.getElementById("reviewContainer");
addReviewForm.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("Form submitted");
  const name = e.target.companyName;
  const pros = e.target.pros;
  const cons = e.target.cons;
  const rating = e.target.rating;
  console.log(name, pros, cons, rating);

  axios
    .post("http://localhost:3000/company_review", {
      name: name.value,
      pros: pros.value,
      cons: cons.value,
      rating: rating.value,
    })
    .then((res) => {
      name.value = "";
      pros.value = "";
      cons.value = "";
      rating.value = "";
      alert("Added CompanyReview successfully");
    })
    .catch((err) => {
      console.log("Something went wrong");
    });
});

showReviewForm.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("Form submitted");
  const name = e.target.showReview.value;
  console.log(name);

  axios.get(`http://localhost:3000/reviews/${name}`).then((res) => {
    console.log(res.data.reviews);
    const { name, reviews } = res.data.reviews;

    let avgRating = 0;
    reviews.forEach((review) => {
      avgRating += review.rating;
    });
    avgRating = avgRating / reviews.length;
    avgRating = Math.round(avgRating * 10) / 10;

    const childReviews = reviews
      .map((review) => {
        const { rating, pros, cons } = review;
        return `<div>
    <div>Pros <span>${pros}</span></div>
    <div>Cons <span>${cons}</span></div>
    <div class="bottomBorder">Rating <span>${rating}</span></div>
    <br>
    </div>`;
      })
      .join("");
    reviewContainer.innerHTML = "";
    reviewContainer.innerHTML = `<div >
    <div class="border">
    <h1>Company Reviews</h1>
        <h2><span>Company Name:</span><span>${name}</span></h2>
        <h2><span>Avg Rating:</span><span>${avgRating}</span></h2>
        </div>
        ${childReviews}
        </div>`;
  });
});
