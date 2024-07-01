import CreateBook from "./CreateBook";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

describe("CreateBook component", () => {
  it("edit a title", () => {
    render(
      <BrowserRouter>
        <CreateBook />
      </BrowserRouter>
    );
    const input = screen.getByLocal("Title");
    fireEvent.change(input, { target: { value: "new Title" } });
    expect(input.value).toBe("new Title");
  });

  it("submit the change", () => {
    const mockNavigate = jest.fn();
    jest.mock("react-router-dom", () => ({
      ...jest.requireActual("react-router-dom"),
      useNaviagte: () => mockNavigate,
    }));

    render(
      <BrowserRouter>
        <CreateBook />
      </BrowserRouter>
    );
    const submitButton = screen.getByRole("button", { name: /add/i });
    fireEvent("submit", submitButton);
    expect(mockNavigate).toHaveBeenCalled("/");
  });
});
