import { screen, render } from "@testing-library/react";
import AllMails from "./AllMails";
import { MemoryRouter } from "react-router-dom";

describe("<AllMails/> component", () => {
  test("checking serch mail btn", () => {
    render(
      <MemoryRouter>
        <AllMails />
      </MemoryRouter>
    );
    const serchMailText = screen.getByText("Search mails");
    expect.toBeInTheDocument(serchMailText);
  });
  test("checking compose btn", () => {
    render(
      <MemoryRouter>
        <AllMails />
      </MemoryRouter>
    );
    const composeBtnText = screen.getByText("Compose");
    expect.toBeInTheDocument(composeBtnText);
  });
  test("checking mail list h2", () => {
    render(
      <MemoryRouter>
        <AllMails />
      </MemoryRouter>
    );
    const mailHeading = screen.getByText("All Mails list");
    expect.toBeInTheDocument(mailHeading);
  });
  test("checking list items, inbox", () => {
    render(
      <MemoryRouter>
        <AllMails />
      </MemoryRouter>
    );
    const inbox = screen.getByText("Inbox");
    expect.toBeInTheDocument(inbox);
  });
  test("checking list items, Sent", () => {
    render(
      <MemoryRouter>
        <AllMails />
      </MemoryRouter>
    );
    const sentMails = screen.getByText("Sent");
    expect.toBeInTheDocument(sentMails);
  });
});
