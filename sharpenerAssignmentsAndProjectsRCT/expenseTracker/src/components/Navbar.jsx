import Button from "react-bootstrap/esm/Button";
import { useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Nav from "react-bootstrap/esm/Nav";
import Navbar from "react-bootstrap/esm/Navbar";
import { LinkContainer } from "react-router-bootstrap";
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
    <Navbar
      expand="lg"
      className={`bg-body-tertiary border-bottom border-black ${
        isDarkMode ? "bg-dark text-bg-dark" : "bg-light text-bg-light"
      }`}
    >
      <Container
        className={`${
          isDarkMode ? "bg-dark text-bg-dark" : "bg-light text-bg-light"
        }`}
      >
        <LinkContainer to="/">
          <Navbar.Brand
            className={`${
              isDarkMode ? "bg-dark text-bg-dark" : "bg-light text-bg-light"
            } fs-3`}
          >
            ExpenseManager
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {!isAuthenticated && (
              <LinkContainer to="/signup">
                <Nav.Link>Signup</Nav.Link>
              </LinkContainer>
            )}
            {isAuthenticated && totalExpenses > 10000 && (
              <div className="d-grid gap-2 d-flex justify-content-start">
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
                  {isPremiumActivated
                    ? "Deactivate Premium"
                    : "Activate Premium"}
                </Button>
              </div>
            )}
            {isAuthenticated && isPremiumActivated && totalExpenses > 10000 && (
              <div className="d-grid gap-2 d-flex justify-content-start">
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
              </div>
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
            {!isAuthenticated && (
              <LinkContainer to="/login">
                <Nav.Link>Login</Nav.Link>
              </LinkContainer>
            )}
            {isAuthenticated && (
              <LinkContainer to="/profile">
                <Nav.Link>
                  {" "}
                  <span
                    className={`${
                      isDarkMode
                        ? "bg-dark text-bg-dark"
                        : "bg-light text-bg-light"
                    }`}
                  >
                    Profile
                  </span>
                </Nav.Link>
              </LinkContainer>
            )}
            {isAuthenticated && (
              <LinkContainer to="/home">
                <Nav.Link>
                  <span
                    className={`${
                      isDarkMode
                        ? "bg-dark text-bg-dark"
                        : "bg-light text-bg-light"
                    }`}
                  >
                    Welcome
                  </span>
                </Nav.Link>
              </LinkContainer>
            )}
            {isAuthenticated && (
              <LinkContainer to="/login/verifyEmail">
                <Nav.Link>
                  {" "}
                  <span
                    className={`${
                      isDarkMode
                        ? "bg-dark text-bg-dark"
                        : "bg-light text-bg-light"
                    }`}
                  >
                    Verify Email
                  </span>
                </Nav.Link>
              </LinkContainer>
            )}
          </Nav>
          <Nav>
            {isAuthenticated && (
              <div className="d-grid gap-2 d-flex justify-content-start">
                <Button
                  variant="primary"
                  onClick={() => {
                    dispatch(logout());
                    navigate("/login");
                  }}
                  type="button"
                >
                  Logout
                </Button>
              </div>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
