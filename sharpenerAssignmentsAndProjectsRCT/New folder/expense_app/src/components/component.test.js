import { render, screen } from "@testing-library/react";
import Profile from "./Profile";

describe("Testing all the components", () => {
  test("testing profile", () => {
    render(<Profile />);
    //   const linkElement = screen.getByText(/learn react/i);
    const linkElement = screen.getByText(/Profile/i);
    // const linkElement = screen.getByText("Profile", { exact: "false" });
    expect(linkElement).toBeInTheDocument();
  });
});
