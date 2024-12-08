const loginForm = document.getElementById("login");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = loginForm.email.value;
  const password = loginForm.password.value;
  const userData = { email, password };
  console.log(userData);
  //   axios
  //     .post(`http://localhost:3000/user/login`, userData)
  //     .then((res) => {
  //       console.log("signup successful", res);
  //     })
  //     .catch((err) => {
  //       console.log("Error", err.response.data);
  //     });
});
