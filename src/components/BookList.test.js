import BookList from "./BookList";
import { render, screen, fireEvent } from "@testing-library/react";

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
  render(<BookList />);
  expect(screen.getByText("BOOK LIBRARY")).toBeInTheDocument();
});

it("calls fetch when deleting a book", () => {
  render(<BookList />);
  fireEvent.click(screen.getByRole("button", { name: /delete/i }));
  expect(fetch).toHaveBeenCalledTimes("http://localhost:8080/books/1", {
    method: "DELETE",
  });
});
