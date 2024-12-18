const signupForm = document.getElementById("signup");

signupForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = signupForm.name.value;
  const email = signupForm.email.value;
  const password = signupForm.password.value;
  const userData = { name, email, password };
  axios
    .post(`http://localhost:3000/user/signup`, userData)
    .then((res) => {
      console.log("signup successful", res);
      window.location.replace("login.html");
    })
    .catch((err) => {
      console.log("Error", err);
    });
});
