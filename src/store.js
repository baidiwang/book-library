import { create } from "zustand"; // create is a function from the library to create a store

export const useStore = create((set) => ({
  // Set function is used to update the store's state
  books: [],
  deleteBook: null,
  setBooks: (books) => set((state) => ({ books: books })), // A function that updates the books array in the store
  setDeleteBook: (book) => set((state) => ({ deleteBook: book })), //  A function that updates the deleteBook state
}));
