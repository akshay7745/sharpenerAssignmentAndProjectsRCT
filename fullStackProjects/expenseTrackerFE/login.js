const loginForm = document.getElementById("login");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = loginForm.email.value;
  const password = loginForm.password.value;
  const userData = { email, password };
  console.log(userData);
  axios
    .post(`http://localhost:3000/user/login`, userData)
    .then((res) => {
      if (res.status === 200) {
        alert("Login successful");
        console.log(res);
      }
    })
    .catch((err) => {
      console.log(err.response.data.message);
    });
});
