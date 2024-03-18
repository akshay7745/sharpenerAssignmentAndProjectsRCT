import Greetings from "./Greetings";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
describe("greeting component", () => {
  test("renders Hello world as a text", () => {
    //Arrange
    render(<Greetings />);
    //Act
    //... Nothing
    //Assert
    const helloWorldElement = screen.getByText("Greetings", { exact: false });
    expect(helloWorldElement).toBeInTheDocument();
  });
  test("Text changes on the click of the button", () => {
    // Arrange
    render(<Greetings />);
    // Act
    const btnElement = screen.getByRole("button");
    userEvent.click(btnElement);
    //Assert
    const changedText = screen.getByText("ChangE is the only constant", {
      exact: false,
    });
    expect(changedText).toBeInTheDocument();
  });
  test("<p></p> should conditionally render on the click of the button", () => {
    // Arrange
    render(<Greetings />);
    //act
    const btnElement = screen.getByRole("button");
    userEvent.click(btnElement);
    const outputElement = screen.queryByText("old is gold", { exact: false });
    expect(outputElement).toBeNull();
  });
});
