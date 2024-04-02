import { screen, render } from "@testing-library/react";
import Composer from "./Composer";
import { MemoryRouter } from "react-router-dom";
describe("Login.js component", () => {
  test("checking subject label", () => {
    render(
      <MemoryRouter>
        <Composer />
      </MemoryRouter>
    );
    const subjectLabel = screen.getByLabelText("Subject");
    expect.toBeInTheDocument(subjectLabel);
  });
  test("checking receiver label", () => {
    render(
      <MemoryRouter>
        <Composer />
      </MemoryRouter>
    );
    const receiverLabel = screen.getByLabelText("To");
    expect.toBeInTheDocument(receiverLabel);
  });
  test("Send mail button", () => {
    render(
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
    render(
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
    render(
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
