import { screen } from "@testing-library/react";
import AllMails from "./AllMails";
import { MemoryRouter } from "react-router-dom";
import { renderWithProviders } from "../redux_utils/utils_for_tests";
describe("<AllMails/> component", () => {
  test("checking serch mail btn", () => {
    renderWithProviders(
      <MemoryRouter>
        <AllMails />
      </MemoryRouter>
    );
    const serchMailText = screen.getByText("Search mails");
    expect.toBeInTheDocument(serchMailText);
  });
  test("checking compose btn", () => {
    renderWithProviders(
      <MemoryRouter>
        <AllMails />
      </MemoryRouter>
    );
    const composeBtnText = screen.getByText("Compose");
    expect.toBeInTheDocument(composeBtnText);
  });
  test("checking list items, inbox", () => {
    renderWithProviders(
      <MemoryRouter>
        <AllMails />
      </MemoryRouter>
    );
    const inbox = screen.getByText("Inbox");
    expect.toBeInTheDocument(inbox);
  });
  test("checking list items, Sent", () => {
    renderWithProviders(
      <MemoryRouter>
        <AllMails />
      </MemoryRouter>
    );
    const sentMails = screen.getByText("Sent");
    expect.toBeInTheDocument(sentMails);
  });
});
