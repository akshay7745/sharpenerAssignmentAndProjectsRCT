const expenseForm = document.getElementById("expenseForm");

const expenseListContainer = document.querySelector(".expenseLists");

const purchaseBtn = document.getElementById("razorBtn");
const premiumSymbol = document.querySelector(".premiumSymbol");
const leaderboardBtn = document.querySelector("#leaderboardBtn");
const leaderboardParent = document.querySelector("#section");

expenseForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const description = e.target.description.value;
  const category = e.target.category.value;
  const amount = e.target.amount.value;

  const res = await axios.post(
    "http://localhost:3000/expense/addExpense",
    {
      description,
      category,
      amount,
    },
    {
      headers: { Authorization: localStorage.getItem("token") },
    }
  );

  const newExpense = res.data.expense;
  showExpense(newExpense);
});

const leaderboard = document.getElementById("leaderboard");

function parseJwt(token) {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}

async function getExpenses() {
  try {
    const expenses = await axios.get("http://localhost:3000/expense/expenses", {
      headers: { Authorization: localStorage.getItem("token") },
    });
    const expenseData = expenses.data.expenses;

    expenseData.forEach((data) => showExpense(data));
  } catch (error) {
    console.log(error);
  }
}

function showExpense(expense) {
  const { amount, description, category, id } = expense;
  const expenseList = `  <div
            id=${id}
            class="col-7 d-flex justify-content-between my-3 gap-3 align-items-center border border-1 rounded-3 px-1 py-2"
          >
          <div>
            <span class="mx-2">${category}</span>
            <span class="mx-2">${description}</span>
            <span class="mx-2">${amount}</span>
            </div>
            <button onclick='deleteExpense(event)' class="btn btn-info delete me-2">Delete Expense</button>
          </div>`;

  expenseListContainer.innerHTML = expenseListContainer.innerHTML
    ? expenseListContainer.innerHTML + expenseList
    : expenseList;
}

document.addEventListener("DOMContentLoaded", () => {
  const { isPremium } = parseJwt(localStorage.getItem("token"));
  // const payload = parseJwt(localStorage.getItem("token"));
  // console.log(isPremium);
  updatePremiumUser(isPremium);
  getExpenses();
});

async function deleteExpense(event) {
  const expenseId = +event.target.parentElement.id;
  try {
    const deletedExpense = await axios.delete(
      `http://localhost:3000/expense/delete/${expenseId}`,
      {
        headers: { Authorization: localStorage.getItem("token") },
      }
    );
    console.log("printing after deleting expense", deletedExpense);
    expenseListContainer.removeChild(event.target.parentElement);
  } catch (error) {
    console.log("Something went wrong on deleting the expense.");
  }
}

purchaseBtn.addEventListener("click", async (e) => {
  const token = localStorage.getItem("token");
  const response = await axios.get(
    "http://localhost:3000/purchase/premiummembership",
    { headers: { Authorization: token } }
  );

  console.log(response, "from line number 87");

  let options = {
    key: response.data.key_id, // key id from dashboard
    order_id: response.data.order.id, //for each payment new order id will be created by razorpay
    handler: async function (res) {
      // this method will be called on successful payment
      console.log("Successful payment handler from line number 93", res);
      const paymentInfo = await axios.post(
        "http://localhost:3000/purchase/updatetransactionstatus",
        {
          order_id: options.order_id,
          payment_id: res.razorpay_payment_id,
        },
        { headers: { Authorization: token } }
      );

      localStorage.setItem("token", paymentInfo.data.token);
      const { isPremium } = parseJwt(paymentInfo.data.token);
      updatePremiumUser(isPremium);
      alert("You are now a Prime member");
    },
  };

  const rzp1 = new Razorpay(options);
  rzp1.open();
  e.preventDefault();
  rzp1.on("payment.failed", function (response) {
    // this function will be called after payment failure.
    console.log("when payment fails", response);
    alert("Something went wrong, please try again later");
  });
});

leaderboardBtn.addEventListener("click", async (e) => {
  console.log("Showing leaderboard");
  const leaderboardData = await axios(
    "http://localhost:3000/premium/showleaderboard"
  );

  leaderboardParent.classList.replace("d-none", "d-block");

  const innerBody = leaderboardData.data.expenses
    .map((data, index) => {
      const { name, totalExpenses } = data;
      return `  <tr>
                  <th scope="row">${index + 1}</th>
                  <td>${name}</td>
                  <td>${totalExpenses}</td>
                  </tr>`;
    })
    .join("");
  const table = `  <table class="table table-striped text-center">
              <thead>
                <tr>
                  <th scope="col">Sr No</th>
                  <th scope="col">Name</th>
               
                  <th scope="col">Expenditure ( in Rs.)</th>
                </tr>
              </thead>
       <tbody> ${innerBody}</tbody>
            </table>`;
  leaderboard.innerHTML = table;
});

function updatePremiumUser(isPremium) {
  console.log(isPremium);
  purchaseBtn.classList.replace(
    isPremium ? "d-block" : "d-none",
    isPremium ? "d-none" : "d-block"
  );
  leaderboardBtn.classList.replace(
    isPremium ? "d-none" : "d-block",
    isPremium ? "d-block" : "d-none"
  );

  premiumSymbol.classList.replace(
    isPremium ? "d-none" : "d-block",
    isPremium ? "d-block" : "d-none"
  );
}
