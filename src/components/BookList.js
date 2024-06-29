import React, { useEffect, useState } from "react";
import { Typography, Box, IconButton, Button, Modal } from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CloseIcon from '@mui/icons-material/Close';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import { useNavigate } from "react-router-dom";
import { useStore } from "../store"
import InfoIcon from '@mui/icons-material/Info';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: 1,
  p: 4,
};


function BookList() {
  const { books, setBooks, deleteBook, setDeleteBook } = useStore()
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    getAllBooks();
  }, []);

  const handleConfirm = () => {
    if (deleteBook) {
      fetch("http://localhost:8080/books/" + deleteBook.id, {
        method: 'DELETE'
      })
        .then((data) => {
          getAllBooks();
          handleClose();
        })
        .catch((error) => console.error("Error delete books:", error));
    }
  }

  const getAllBooks = () => {
    fetch("http://localhost:8080/books")
      .then((response) => response.json())
      .then((data) => {
        setBooks(data)
      })
      .catch((error) => console.error("Error fetching books:", error));
  }

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
        <IconButton color="error" onClick={() => navigate("create")}>
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
            <IconButton color="error" sx={{position: "absolute", right: 5, top: 5}} onClick={() => {
              setDeleteBook(book)
              handleOpen()
            }}>
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
            <Button color="error" variant="contained" onClick={() => navigate("/edit/" + book.id)}>Edit</Button>
          </Box>
        ))}
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography sx={{display: 'flex', alignItems: 'center'}} variant="h6" component="h2">
            <InfoIcon sx={{marginRight: 1, color: "#d32f2f"}} />
            Delete Confirm
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Do you really want to delete the book?
          </Typography>
          <Box display="flex" justifyContent="flex-end" mt={4}>
            <Button sx={{marginRight: 1}} variant="outlined" onClick={handleClose}>Cancel</Button>
            <Button variant="contained" onClick={handleConfirm}>Confirm</Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}

export default BookList;
