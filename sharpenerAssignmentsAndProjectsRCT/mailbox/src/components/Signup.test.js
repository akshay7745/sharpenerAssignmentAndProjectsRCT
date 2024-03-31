import { render, screen } from "@testing-library/react";
import Signup from "./Signup";

describe("Singup.js component", () => {
  test("checking email label", () => {
    render(<Signup />);
    const emailLabel = screen.getByLabelText("Email", { exact: true });

    expect(emailLabel).toBeInTheDocument();
  });
  test("checking password label", () => {
    render(<Signup />);

    const passLabel = screen.getByLabelText("Password", { exact: true });

    expect(passLabel).toBeInTheDocument();
  });
  test("checking confirm password label", () => {
    render(<Signup />);

    const confirmPassLabel = screen.getByLabelText("Confirm Password", {
      exact: true,
    });
    expect(confirmPassLabel).toBeInTheDocument();
  });
  test("checking email input", () => {
    render(<Signup />);

    const emailInp = screen.getByPlaceholderText("Enter Email", {
      exact: true,
    });
    expect(emailInp).toBeInTheDocument();
  });
  test("checking password input", () => {
    render(<Signup />);

    const confirmPassInp = screen.getByPlaceholderText("Password", {
      exact: true,
    });
    expect(confirmPassInp).toBeInTheDocument();
  });
});
