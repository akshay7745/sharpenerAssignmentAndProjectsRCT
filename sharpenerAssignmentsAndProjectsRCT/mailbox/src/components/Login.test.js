import { screen, render } from "@testing-library/react";
import Login from "./Login";
import { MemoryRouter } from "react-router-dom";
describe("Login.js component", () => {
  test("checking email label", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
    const emailLabel = screen.getByLabelText("Email");
    expect.toBeInTheDocument(emailLabel);
  });
  test("checking password label", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
    const passwordLabel = screen.getByLabelText("Password");
    expect.toBeInTheDocument(passwordLabel);
  });
  test("checking redirecting to the signup page", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
    const signupRedirector = screen.getByText("Don't Have an account? Signup", {
      exact: false,
    });
    expect.toBeInTheDocument(signupRedirector);
  });
  test("Forgot password", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
    const forgotPassword = screen.getByText("Forgot password?", {
      exact: false,
    });
    expect.toBeInTheDocument(forgotPassword);
  });
  test("Login button", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
    const loginButton = screen.getByText("Login", {
      exact: false,
    });
    expect.toBeInTheDocument(loginButton);
  });
});
