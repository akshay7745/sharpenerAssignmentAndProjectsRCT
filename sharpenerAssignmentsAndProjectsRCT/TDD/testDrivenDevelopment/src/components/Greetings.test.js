import Greetings from "./Greetings";
import { render, screen } from "@testing-library/react";

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
});
