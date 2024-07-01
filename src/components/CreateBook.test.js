import CreateBook from "./CreateBook";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("CreateBook component", () => {
  it("edit a title", () => {
    render(
      <BrowserRouter>
        <CreateBook />
      </BrowserRouter>
    );
    const input = screen.getByTestId("title");
    fireEvent.change(input, { target: { value: "new Title" } });
    expect(input.value).toBe("new Title");
  });

  it("show validation message", () => {
    const mockNavigate = jest.fn();
    jest.mock("react-router-dom", () => ({
      ...jest.requireActual("react-router-dom"),
      useNavigate: () => mockNavigate,
    }));

    render(
      <BrowserRouter>
        <CreateBook />
      </BrowserRouter>
    );

    const submitButton = screen.getByTestId("add");
    fireEvent.click(submitButton);
    const titleErrorMessage = screen.getByText("Please enter title.");
    const authorErrorMessage = screen.getByText("Please enter author.");
    const genreErrorMessage = screen.getByText("Please select genre.");
    expect(titleErrorMessage).toBeInTheDocument();
    expect(authorErrorMessage).toBeInTheDocument();
    expect(genreErrorMessage).toBeInTheDocument();
  });

  it("submit the change", () => {
    global.fetch = jest.fn(() => ({
      then: () => ({
        then: (callback) => {
          callback();
        },
      }),
    }));

    render(
      <BrowserRouter>
        <CreateBook />
      </BrowserRouter>
    );

    const titleInput = screen.getByTestId("title");
    fireEvent.change(titleInput, { target: { value: "new Title" } });

    const authorInput = screen.getByTestId("author");
    fireEvent.change(authorInput, { target: { value: "new Author" } });

    const genreSelect = screen.getByTestId("genre");
    fireEvent.change(genreSelect, { target: { value: "Fantasy" } });

    const submitButton = screen.getByTestId("add");
    fireEvent.click(submitButton);
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });
});
