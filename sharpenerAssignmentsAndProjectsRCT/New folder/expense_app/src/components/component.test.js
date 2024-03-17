import { render, screen } from "@testing-library/react";
import AddExpense from "./AddExpense.js";
import ExpenseList from "./ExpenseList";
import ForgotPassword from "./ForgotPassword";
import Home from "./Home";
import Login from "./Login";
import Navbar from "./Navbar";
import Profile from "./Profile";
import ProtectedRoute from "./ProtectedRoute";
import SignUp from "./SignUp";
import VerifyEmail from "./VerifyEmail";

describe("Testing all the components", () => {
  test("testing profile", () => {
    render(<Profile />);
    //   const linkElement = screen.getByText(/learn react/i);
    const linkElement = screen.getByText(/Profile/i);
    // const linkElement = screen.getByText("Profile", { exact: "false" });
    expect(linkElement).toBeInTheDocument();
  });
  test("testing expense list", () => {
    render(<ExpenseList />);
    //   const linkElement = screen.getByText(/learn react/i);
    const linkElement = screen.getByText(/Daily expenses/i);
    // const linkElement = screen.getByText("Daily expenses", { exact: "false" });
    expect(linkElement).toBeInTheDocument();
  });
  test("forgot password component", () => {
    render(<ForgotPassword />);
    //   const linkElement = screen.getByText(/learn react/i);
    const linkElement = screen.getByText(/Already have an account/i);
    expect(linkElement).toBeInTheDocument();
  });
  test("<Login/>", () => {
    render(<Login />);
    //   const linkElement = screen.getByText(/learn react/i);
    const linkElement = screen.getByText(
      /Don&apos;t have an account? Sign Up/i
    );
    expect(linkElement).toBeInTheDocument();
  });
  test("<SignUp/>", () => {
    render(<SignUp />);
    const linkElement = screen.getByText(/Email/i);
    expect(linkElement).toBeInTheDocument();
  });
  test("<Navbar/>", () => {
    render(<Navbar />);

    const linkElement = screen.getByText(/Download File/i);

    expect(linkElement).toBeInTheDocument();
  });
  test("<VerifyEmail/>", () => {
    render(<VerifyEmail />);
    const linkElement = screen.getByText(/Verify Email/i);
    expect(linkElement).toBeInTheDocument();
  });
  test("<AddExpense/>", () => {
    render(<AddExpense />);
    const linkElement = screen.getByText(/Expense Description and Amount/i);
    expect(linkElement).toBeInTheDocument();
  });
  test("<Home/>", () => {
    render(<Home />);
    const linkElement = screen.getByText(/Welcome to the expense app/i);
    expect(linkElement).toBeInTheDocument();
  });
});
