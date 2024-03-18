import { screen, render } from "@testing-library/react";
import Asyncfile from "./Asyncfile";

describe("testing async component", () => {
  test("testing lists", async () => {
    window.fetch = jest.fn();
    window.fetch.mockResolvedValueOnce({
      json: async () => [
        {
          id: 1,
          email: "a@gmail.com",
          first_name: "ak",
          last_name: "pa",
          avatar: "url",
        },
      ],
    });
    render(<Asyncfile />);
    const listItemElements = await screen.findAllByRole("listitem");
    expect(listItemElements).not.toHaveLength(0);
  });
});
