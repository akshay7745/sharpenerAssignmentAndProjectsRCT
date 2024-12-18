const loginForm = document.getElementById("login");
const resetPasswordForm = document.getElementById("resetPasswordForm");

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

        // localStorage.setItem("isPremium", res.data.isPremium);
        window.location.replace("expense.html");
      }
    })
    .catch((err) => {
      console.log(err.response.data.message);
    });
});

resetPasswordForm.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(e.target.email.value);
  axios
    .post("http://localhost:3000/password/forgotpassword", {
      email: e.target.email.value,
    })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
});
