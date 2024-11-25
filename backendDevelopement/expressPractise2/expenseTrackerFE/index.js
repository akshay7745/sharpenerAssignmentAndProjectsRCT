const expenseContainer = document.querySelector(".list-group");
const expenseForm = document.querySelector("form");
let editId = null;
async function fetchExpenses() {
  const expenses = await axios.get("http://localhost:3000/expenses");
  expenses.data.expenses.forEach((expenseData) => {
    showNewExpense(expenseData);
  });
}

document.addEventListener("DOMContentLoaded", fetchExpenses);

expenseForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const amount = e.target.amount;
  const category = e.target.category;
  const description = e.target.description;
  if (editId) {
    axios
      .put("http://localhost:3000/expenses/" + editId, {
        amount: amount.value,
        category: category.value,
        description: description.value,
      })
      .then((res) => {
        editId = null;
        amount.value = "";
        description.value = "";
        category.value = "";
        showNewExpense(res.data.updatedExpense);
      });

    return;
  }
  axios
    .post("http://localhost:3000/expense", {
      amount: amount.value,
      category: category.value,
      description: description.value,
    })
    .then((res) => {
      amount.value = "";
      description.value = "";
      category.value = "";
      showNewExpense(res.data.expense);
    });
});

expenseContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    const parentList = e.target.parentElement;
    const id = parentList.id;
    axios.delete("http://localhost:3000/expenses/" + id).then((res) => {
      expenseContainer.removeChild(parentList);
    });
  } else if (e.target.classList.contains("edit")) {
    const parentList = e.target.parentElement;
    const childs = parentList.children;
    editId = parentList.id;
    const description = document.querySelector("#description");
    const amount = document.querySelector("#amount");
    const category = document.querySelector("#category");
    description.value = childs[0].textContent;
    amount.value = childs[1].textContent;
    category.value = childs[2].innerText;
    expenseContainer.removeChild(parentList);
  }
});

function showNewExpense({ id, amount, description, category }) {
  const expense = document.createElement("li");
  expense.id = id;
  expense.innerHTML = `<span>${description}</span><span>${amount}</span><span>${category}</span><button type="button" class="delete">Delete</button><button type="button" class="edit">Edit</button>`;
  expenseContainer.appendChild(expense);
}
