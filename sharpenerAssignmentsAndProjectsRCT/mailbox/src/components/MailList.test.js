import { screen } from "@testing-library/react";
import MailList from "./MailList";
import { MemoryRouter, useOutletContext } from "react-router-dom";
import { renderWithProviders } from "../redux_utils/utils_for_tests";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useOutletContext: jest.fn(),
}));
describe("Testing <MailList/> component", () => {
  test("checking the all mail list heading (h2).", () => {
    const mockSwitchMails = {
      inbox: true,
      sent: false,
    };

    useOutletContext.mockReturnValue(mockSwitchMails);
  });
});
