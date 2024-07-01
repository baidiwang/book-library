import { create } from "zustand";

export const useStore = create((set) => ({
  books: [],
  deleteBook: null,
  setBooks: (books) => set((state) => ({ books: books })),
  setDeleteBook: (book) => set((state) => ({ deleteBook: book })),
}));
