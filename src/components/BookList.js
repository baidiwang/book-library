import React, { useEffect, useState } from "react";
import { Typography, Box, IconButton, Button } from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CloseIcon from '@mui/icons-material/Close';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';

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
        height: "100vh"
      }}
    >
      <Box sx={{
        display: "flex",
        justifyContent: "flex-end",
        marginTop: 2
      }}>
        <IconButton color="error">
          <AddCircleIcon sx={{fontSize: 40}} />
        </IconButton>
      </Box>
      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          padding: 2,
          gap: 2,
          overflowX: 'auto',
          marginBottom: "100px"
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            textAlign: "center",
            color: "#d32f2f"
          }}
        >
          <Typography
            variant="h2"
            component="h2"
            sx={{ color: "#d32f2f", margin: 2, fontSize: 30 }}
          >
            BOOK LIBRARY
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: 10
            }}
          >
            <Typography
              variant="h2"
              component="h2"
              sx={{ color: "#d32f2f", margin: 2, fontSize: 30 }}
            >
              Scroll Here
            </Typography>
            <ArrowCircleRightIcon sx={{fontSize: 50}} />
          </Box>
        </Box>
        {books.map((book) => (
          <Box
            key={book.id}
            sx={{
              position: "relative",
              border: "1px solid grey",
              borderRadius: "10px",
              padding: 2,
              width: "50vh",
              height: "80%",
              backgroundColor: "white",
              flexShrink: 0
            }}
          >
            <IconButton color="error" sx={{position: "absolute", right: 5, top: 5}}>
              <CloseIcon />
            </IconButton>
            <Typography variant="h5" component="h2">
              {book.title}
            </Typography>
            <Typography variant="subtitle1">Author: {book.author}</Typography>
            <Typography variant="subtitle1">
              Year Published: {book.yearPublished}
            </Typography>
            <Typography variant="subtitle1">Genre: {book.genre}</Typography>
            <Button color="error" variant="contained">Edit</Button>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default BookList;
