import BookList from "./BookList";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

jest.mock("../store", () => ({
  useStore: () => ({
    books: [
      {
        id: 1,
        title: "test book",
        author: "test author",
        yearPublished: 1997,
        genre: "Fantasy",
      },
    ],
    deleteBook: null,
    setBooks: jest.fn(),
    setDeleteBook: jest.fn(),
  }),
}));

global.fetch = jest.fn(() =>
  Promise.resolve({ json: () => Promise.resolve([]) })
);

describe("BookList component", () => {
  beforeEach(() => {
    fetch.mockClear();
  });
});

it("renders the BookList component", () => {
  render(
    <BrowserRouter>
      <BookList />
    </BrowserRouter>
  );
  expect(screen.getByText("BOOK LIBRARY")).toBeInTheDocument();
});

it("calls fetch when deleting a book", () => {
  render(
    <BrowserRouter>
      <BookList />
    </BrowserRouter>
  );
  // Assuming there's a delete button visible in the document
  const deleteButton = screen.getByRole("button", { name: /delete/i });
  fireEvent.click(deleteButton);
  expect(fetch).toHaveBeenCalledWith("http://localhost:8080/books/1", {
    method: "DELETE",
  });
  expect(fetch).toHaveBeenCalledTimes(1);
});
