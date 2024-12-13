const loginForm = document.getElementById("login");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = loginForm.email.value;
  const password = loginForm.password.value;
  const userData = { email, password };
  axios
    .post(`http://localhost:3000/user/login`, userData)
    .then((res) => {
      if (res.status === 200) {
        console.log(res);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("isPremium", res.data.isPremium);
        window.location.replace("expense.html");
      }
    })
    .catch((err) => {
      console.log(err.response.data.message);
    });
});
