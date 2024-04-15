import { render, screen } from "@testing-library/react";
import Signup from "./Signup";
import { MemoryRouter } from "react-router-dom";
import { renderWithProviders } from "../redux_utils/utils_for_tests";
describe("Singup.js component", () => {
  test("checking email label", () => {
    renderWithProviders(
      <MemoryRouter>
        <Signup />
      </MemoryRouter>
    );
    const emailLabel = screen.getByLabelText("Email", { exact: true });

    expect(emailLabel).toBeInTheDocument();
  });
  test("checking password label", () => {
    renderWithProviders(
      <MemoryRouter>
        <Signup />
      </MemoryRouter>
    );

    const passLabel = screen.getByLabelText("Password", { exact: true });

    expect(passLabel).toBeInTheDocument();
  });
  test("checking confirm password label", () => {
    renderWithProviders(
      <MemoryRouter>
        <Signup />
      </MemoryRouter>
    );

    const confirmPassLabel = screen.getByLabelText("Confirm Password", {
      exact: true,
    });
    expect(confirmPassLabel).toBeInTheDocument();
  });
  test("checking email input", () => {
    renderWithProviders(
      <MemoryRouter>
        <Signup />
      </MemoryRouter>
    );

    const emailInp = screen.getByPlaceholderText("Enter Email", {
      exact: true,
    });
    expect(emailInp).toBeInTheDocument();
  });
  test("checking password input", () => {
    renderWithProviders(
      <MemoryRouter>
        <Signup />
      </MemoryRouter>
    );

    const confirmPassInp = screen.getByPlaceholderText("Password", {
      exact: true,
    });
    expect(confirmPassInp).toBeInTheDocument();
  });
});
