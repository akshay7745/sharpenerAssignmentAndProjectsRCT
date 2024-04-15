import { screen } from "@testing-library/react";
import Composer from "./Composer";
import { renderWithProviders } from "../redux_utils/utils_for_tests";
import { MemoryRouter } from "react-router-dom";
describe("Login.js component", () => {
  test("checking subject label", () => {
    renderWithProviders(
      <MemoryRouter>
        <Composer />
      </MemoryRouter>
    );
    const subjectLabel = screen.getByLabelText("Subject");
    expect.toBeInTheDocument(subjectLabel);
  });
  test("checking receiver label", () => {
    renderWithProviders(
      <MemoryRouter>
        <Composer />
      </MemoryRouter>
    );
    const receiverLabel = screen.getByLabelText("To");
    expect.toBeInTheDocument(receiverLabel);
  });
  test("Send mail button", () => {
    renderWithProviders(
      <MemoryRouter>
        <Composer />
      </MemoryRouter>
    );
    const sendMailBtn = screen.getByText("send mail", {
      exact: false,
    });
    expect.toBeInTheDocument(sendMailBtn);
  });
  test("Subject input testing", () => {
    renderWithProviders(
      <MemoryRouter>
        <Composer />
      </MemoryRouter>
    );
    const subjectInp = screen.getByPlaceholderText("Enter subject", {
      exact: false,
    });
    expect.toBeInTheDocument(subjectInp);
  });
  test("Email input", () => {
    renderWithProviders(
      <MemoryRouter>
        <Composer />
      </MemoryRouter>
    );
    const emailInp = screen.getByPlaceholderText("name@example.com", {
      exact: false,
    });
    expect.toBeInTheDocument(emailInp);
  });
});
