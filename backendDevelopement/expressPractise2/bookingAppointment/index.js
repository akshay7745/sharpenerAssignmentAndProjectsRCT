const form = document.querySelector("form");
const name = document.querySelector("#name");
const email = document.querySelector("#email");
const phoneNumber = document.querySelector("#phoneNumber");
const button = document.querySelector("#formBtn");
const listContainer = document.querySelector("ul");
let edit = false;
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = e.target.name;
  const email = e.target.email;
  const phonenumber = e.target.phoneNumber;
  const userData = {
    name: name.value,
    email: email.value,
    phonenumber: +phonenumber.value,
  };
  if (edit) {
    axios.put(`http://localhost:3000/user/${edit}`, userData).then((result) => {
      console.log("After edit", result);
      edit = false;
      addNewUser(result.data.updatedUser);
    });
  } else {
    axios.post("http://localhost:3000", userData).then((result) => {
      addNewUser(result.data);
    });
  }
  // localStorage.setItem(name.value, JSON.stringify(userData));

  name.value = "";
  email.value = "";
  phoneNumber.value = "";
});
function getUsers() {
  axios.get("http://localhost:3000").then((result) => {
    result.data.forEach((user) => addNewUser(user));
  });
}
document.addEventListener("DOMContentLoaded", (e) => {
  getUsers();
});
listContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    const removeElement = e.target.parentElement;
    const id = removeElement.getAttribute("id");
    axios.delete(`http://localhost:3000/user/${id}`).then((result) => {
      listContainer.removeChild(removeElement);
      // getUsers();
    });
    // console.log("remove child print", removeElement.children[0].innerText);
    // localStorage.removeItem(removeElement.children[0].innerText);
  } else if (e.target.classList.contains("edit")) {
    const parentElement = e.target.parentElement;
    const childs = parentElement.children;
    name.value = childs[0].textContent;
    email.value = childs[1].textContent;
    phoneNumber.value = childs[2].textContent;
    // localStorage.removeItem(parentElement.children[0].innerText);
    id = parentElement.getAttribute("id");
    edit = id;
    listContainer.removeChild(parentElement);
  }
});

function addNewUser({ name, email, phonenumber, id }) {
  const li = document.createElement("li");
  li.id = id;
  li.innerHTML = `<span>${name}</span> <span>${email}</span> <span>${phonenumber}</span> <button type='button' class='delete'>Delete</button> <button type='button' class='edit'>Edit</button>`;
  listContainer.appendChild(li);
}
