import React, { useEffect, useState } from "react";

function BookList() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/books")
      .then((response) => response.json())
      .then((data) => setBooks(data))
      .catch((error) => console.error("Error fetching books:", error));
  }, []);

  return (
    <div>
      <h1>Books</h1>
      {books.map((book) => (
        <div key={book.id}>
          <h2>{book.title}</h2>
          <p>Author: {book.author}</p>
          <p>Year Published: {book.yearPublished}</p>
          <p>Genre: {book.genre}</p>
        </div>
      ))}
    </div>
  );
}

export default BookList;
