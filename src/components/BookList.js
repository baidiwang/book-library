import React, { useEffect, useState } from "react";
import { Typography, Box } from "@mui/material";

function BookList() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/books")
      .then((response) => response.json())
      .then((data) => setBooks(data))
      .catch((error) => console.error("Error fetching books:", error));
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 2,
        gap: 2,
      }}
    >
      <Typography
        variant="h2"
        component="h2"
        sx={{ color: "#d32f2f", margin: 2 }}
      >
        BOOK LIBRARY
      </Typography>
      {books.map((book) => (
        <Box
          key={book.id}
          sx={{
            border: "1px solid grey",
            borderRadius: "10px",
            padding: 2,
            width: "75%",
            color: "white",
          }}
        >
          <Typography variant="h5" component="h2">
            {book.title}
          </Typography>
          <Typography variant="subtitle1">Author: {book.author}</Typography>
          <Typography variant="subtitle1">
            Year Published: {book.yearPublished}
          </Typography>
          <Typography variant="subtitle1">Genre: {book.genre}</Typography>
        </Box>
      ))}
    </Box>
  );
}

export default BookList;
