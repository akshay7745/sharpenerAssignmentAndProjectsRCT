const expenseForm = document.getElementById("expenseForm");

const expenseListContainer = document.querySelector(".expenseLists");

expenseForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const description = e.target.description.value;
  const category = e.target.category.value;
  const amount = e.target.amount.value;

  const res = await axios.post("http://localhost:3000/expense/addExpense", {
    description,
    category,
    amount,
  });

  const newExpense = res.data.expense;
  showExpense(newExpense);
});

async function getExpenses() {
  try {
    const expenses = await axios.get("http://localhost:3000/expense/expenses");
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
            class="col-12 d-flex justify-content-center my-3 gap-3 align-items-center border border-1 rounded-3 px-1 py-2"
          >
            <span>${category}</span>
            <span>${description}</span>
            <span>${amount}</span>
            <button onclick='deleteExpense(event)' class="btn btn-info delete">Delete Expense</button>
          </div>`;

  expenseListContainer.innerHTML = expenseListContainer.innerHTML
    ? expenseListContainer.innerHTML + expenseList
    : expenseList;
}

document.addEventListener("DOMContentLoaded", () => {
  getExpenses();
});

async function deleteExpense(event) {
  const expenseId = +event.target.parentElement.id;
  try {
    const deletedExpense = axios.delete(
      `http://localhost:3000/expense/delete/${expenseId}`
    );

    expenseListContainer.removeChild(event.target.parentElement);
  } catch (error) {
    console.log("Something went wrong on deleting the expense.");
  }
}
