import React, { useEffect, useState } from "react";
import { Typography, Box, IconButton, Button, Modal } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CloseIcon from "@mui/icons-material/Close";
import ArrowCircleRightRoundedIcon from "@mui/icons-material/ArrowCircleRightRounded";
import { useNavigate } from "react-router-dom";
import { useStore } from "../store";
import InfoIcon from "@mui/icons-material/Info";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel } from "swiper/modules";
import "swiper/css";
import BulbImage from "../assets/bulb.svg";
import bookCover from "../assets/bookCover.svg";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: 1,
  p: 4,
};

function BookList() {
  const { books, setBooks, deleteBook, setDeleteBook } = useStore();
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
        method: "DELETE",
      })
        .then((data) => {
          getAllBooks();
          handleClose();
        })
        .catch((error) => console.error("Error delete books:", error));
    }
  };

  const getAllBooks = () => {
    fetch("http://localhost:8080/books")
      .then((response) => response.json())
      .then((data) => {
        setBooks(data);
      })
      .catch((error) => console.error("Error fetching books:", error));
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: 1,
        }}
      >
        <Box position="absolute" left={40}>
          <img src={BulbImage} alt="Bulb Image" style={{ width: 100 }} />
        </Box>

        <IconButton color="error" onClick={() => navigate("create")}>
          <AddCircleIcon sx={{ fontSize: 40 }} />
        </IconButton>
      </Box>
      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          padding: 2,
          gap: 2,
          overflowX: "auto",
          marginBottom: "100px",
        }}
      >
        <Swiper
          slidesPerView={4}
          spaceBetween={40}
          mousewheel={true}
          pagination={{
            clickable: true,
          }}
          modules={[Mousewheel]}
          className="mySwiper"
        >
          <SwiperSlide>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  padding: 16,
                  gap: 2,
                  overflowX: "auto",
                  marginBottom: "100px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    textAlign: "center",
                    color: "#d32f2f",
                  }}
                >
                  <Typography
                    variant="h2"
                    sx={{ color: "#d32f2f", fontSize: 30 }}
                  >
                    BOOK LIBRARY
                  </Typography>
                  <Typography
                    variant="h2"
                    sx={{ color: "#d32f2f", fontSize: 30 }}
                  >
                    Scroll Here
                  </Typography>
                  <ArrowCircleRightRoundedIcon
                    sx={{
                      mt: 20,
                      ml: 8,
                      fontSize: 50,
                    }}
                  />
                </Box>
              </Box>
            </Box>
          </SwiperSlide>

          {books.map((book) => (
            <SwiperSlide key={book.id}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "flex-start",
                  position: "relative",
                  borderRadius: "10px",
                  padding: 5,
                  height: "100%",
                  backgroundImage: `url(${bookCover})`,
                  backgroundRepeat: "no-repeat",
                  flexShrink: 0,
                  boxSizing: "border-box",
                }}
              >
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="flex-start"
                  justifyContent="center"
                  flex={1}
                >
                  <IconButton
                    color="error"
                    sx={{
                      position: "absolute",
                      right: 120,
                      bottom: 410,
                      fontSize: 3,
                    }}
                    onClick={() => {
                      setDeleteBook(book);
                      handleOpen();
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                  <Typography variant="h5" component="h2">
                    {book.title}
                  </Typography>
                  <Typography variant="subtitle1">
                    Author: {book.author}
                  </Typography>
                  <Typography variant="subtitle1">
                    Year Published: {book.yearPublished}
                  </Typography>
                  <Typography variant="subtitle1">
                    Genre: {book.genre}
                  </Typography>
                </Box>
                <Button
                  color="error"
                  variant="contained"
                  onClick={() => navigate("/edit/" + book.id)}
                >
                  Edit
                </Button>
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            sx={{ display: "flex", alignItems: "center" }}
            variant="h6"
            component="h2"
          >
            <InfoIcon sx={{ marginRight: 1, color: "#d32f2f" }} />
            Delete Confirm
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Do you really want to delete the book?
          </Typography>
          <Box display="flex" justifyContent="flex-end" mt={4}>
            <Button
              sx={{ marginRight: 1 }}
              variant="outlined"
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button variant="contained" onClick={handleConfirm}>
              Confirm
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}

export default BookList;
