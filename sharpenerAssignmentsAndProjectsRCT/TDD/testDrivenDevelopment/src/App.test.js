import { render, screen } from "@testing-library/react";
import App from "./App";

describe("creating first suite", () => {
  test("renders learn react link", () => {
    render(<App />);
    const linkElement = screen.getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
  });
  test("Testing in the suite", () => {
    render(<App />);
    const linkElement = screen.getByText(/grow bro grow/i);
    expect(linkElement).toBeInTheDocument();
  });
  test("looking for the react logo", () => {
    render(<App />);
    const image = screen.getByAltText("loogo");
    expect(image).not.toBeInTheDocument();
  });
});
