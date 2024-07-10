import CreateBook from "./CreateBook";
import { render, screen, fireEvent } from "@testing-library/react"; // Testing utilities
import { BrowserRouter } from "react-router-dom"; // Handle navigation within the tests env

const mockNavigate = jest.fn(); // Jest function to test if navigation is being called correctly
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
})); // Mock without making actual changes to the browser's URL

describe("CreateBook component", () => {
  it("edit a title", () => {
    // Mocks the app's environment and ensures that any routing logic in the component behaves as expected during testing
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
    const titleErrorMessage = screen.getByText("Please enter a title.");
    const authorErrorMessage = screen.getByText("Please enter an author.");
    const genreErrorMessage = screen.getByText("Please select a genre.");
    expect(titleErrorMessage).toBeInTheDocument();
    expect(authorErrorMessage).toBeInTheDocument();
    expect(genreErrorMessage).toBeInTheDocument();
  });

  it("submit the change", () => {
    // Mocks the global fetch function without sending a request
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
    expect(mockNavigate).toHaveBeenCalledWith("/"); // Checks if navigation was the correct path (which is the booklist page here)
  });
});
