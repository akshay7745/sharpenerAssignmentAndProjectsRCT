import Button from "react-bootstrap/Button";
import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../contexts/authSlice";
import { activatePremium, deactivatePremium } from "../contexts/premiumSlice";
import { darkMode, lightMode } from "../contexts/themeSlice";
function Navigation() {
  const [btnUrl, setBtnUrl] = useState("");
  const isPremiumActivated = useSelector((store) => store.premium.isPremium);
  const isDarkMode = useSelector((store) => store.theme.isDarkMode);
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (store) => store.authentication.isAuthentication
  );
  const expenses = useSelector((store) => store.expense.expenses);
  const totalExpenses = expenses.reduce((acc, expense) => {
    return (acc += Number(expense.amount));
  }, 0);
  const navigate = useNavigate();
  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "20px 90px",
        border: "1px solid black",
        alignItems: "center",
      }}
    >
      <div>
        <NavLink to="/">Home</NavLink>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          width: isPremiumActivated ? "800px" : "550px",
          alignItems: "center",
        }}
      >
        {!isAuthenticated && <NavLink to="/signup">Signup</NavLink>}
        {isAuthenticated && totalExpenses > 10000 && (
          <Button
            onClick={() => {
              if (isPremiumActivated) {
                dispatch(deactivatePremium());
              } else {
                dispatch(activatePremium());
              }
            }}
            variant="warning"
            type="button"
          >
            {isPremiumActivated ? "Deactivate Premium" : "Activate Premium"}
          </Button>
        )}
        {isAuthenticated && isPremiumActivated && totalExpenses > 10000 && (
          <Button
            onClick={() => {
              if (isDarkMode) {
                dispatch(lightMode());
              } else {
                dispatch(darkMode());
              }
            }}
            variant={isDarkMode ? "light" : "secondary"}
            type="button"
          >
            {isDarkMode ? "Light Mode" : "Dark Mode"}
          </Button>
        )}
        {isAuthenticated && isPremiumActivated && totalExpenses > 10000 && (
          <a href={btnUrl} target="_blank" download={"file1.csv"}>
            <Button
              variant="info"
              onClick={() => {
                const csvExpenses = expenses
                  .map((item) => {
                    return Object.values(item).join(",");
                  })
                  .join("\n");
                const blob = new Blob([csvExpenses], { type: "csv" });
                const url = URL.createObjectURL(blob);
                setBtnUrl(url);
              }}
            >
              Download File
            </Button>
          </a>
        )}
        {!isAuthenticated && <NavLink to="/login">Login</NavLink>}
        {isAuthenticated && <NavLink to="/profile">Profile</NavLink>}
        {isAuthenticated && <NavLink to="/home">Welcome</NavLink>}
        {isAuthenticated && (
          <NavLink to="/login/verifyEmail">Verify Email</NavLink>
        )}
        {isAuthenticated && (
          <Button
            onClick={() => {
              dispatch(logout());
              navigate("/login");
            }}
            type="button"
          >
            Logout
          </Button>
        )}
      </div>
    </header>
  );
}

export default Navigation;
