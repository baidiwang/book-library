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
import useMediaQuery from "@mui/material/useMediaQuery";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: 5,
  p: 4,
  boxShadow: 24,
};

function BookList() {
  const { books, setBooks, deleteBook, setDeleteBook } = useStore();
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const mdScreen = useMediaQuery("(max-width:1400px)");
  const smScreen = useMediaQuery("(max-width:1080px)");
  const xsScreen = useMediaQuery("(max-width:800px)");

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
        <Box position="absolute" left={158}>
          <img src={BulbImage} alt="Bulb Image" style={{ width: 100 }} />
        </Box>

        <IconButton
          color="error"
          onClick={() => navigate("create")}
          sx={{
            marginTop: 2,
            marginRight: 2,
            bgcolor: "background.paper",
            borderRadius: "50%",
            "&:hover": {
              bgcolor: "grey.200",
            },
            width: 34,
            height: 34,
          }}
        >
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
          slidesPerView={xsScreen ? 1 : smScreen ? 2 : mdScreen ? 3 : 4}
          spaceBetween={10}
          mousewheel={true}
          modules={[Mousewheel]}
          className="mySwiper"
        >
          {!xsScreen && (
            <SwiperSlide>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  textAlign: "center",
                  color: "#d32f2f",
                  height: "100%",
                }}
              >
                <Typography
                  variant="h2"
                  sx={{ color: "#d32f2f", fontSize: 40, fontWeight: 800 }}
                >
                  BOOK LIBRARY
                </Typography>
                <Box mt={4}>
                  <Typography
                    variant="h2"
                    sx={{
                      color: "#d32f2f",
                      fontSize: 25,
                      mb: 1,
                      fontWeight: 600,
                    }}
                  >
                    Scroll Here
                  </Typography>
                  <ArrowCircleRightRoundedIcon sx={{ fontSize: 50 }} />
                </Box>
              </Box>
            </SwiperSlide>
          )}

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
                  width: 400,
                  px: 10,
                  py: 5,
                  height: "100%",
                  backgroundImage: `url(${bookCover})`,
                  backgroundRepeat: "no-repeat",
                  flexShrink: 0,
                  boxSizing: "border-box",
                  backgroundSize: "100% 100%",
                  color: "white",
                }}
              >
                <Box
                  position="relative"
                  display="flex"
                  flexDirection="column"
                  alignItems="flex-start"
                  justifyContent="center"
                  flex={1}
                  width="100%"
                  textAlign="left"
                >
                  <IconButton
                    color="error"
                    sx={{
                      position: "absolute",
                      right: -1,
                      top: -1,
                      bgcolor: "background.paper",
                      borderRadius: "50%",
                      width: 32,
                      height: 32,
                      "&:hover": {
                        bgcolor: "grey.200",
                      },
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
                  sx={{
                    "&:hover": {
                      bgcolor: "error.200",
                    },
                    boxShadow: 2,
                  }}
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
          <Typography id="modal-modal-description" sx={{ mt: 2, ml: 0.5 }}>
            Do you really want to delete the book?
          </Typography>
          <Box display="flex" justifyContent="flex-end" mt={4}>
            <Button
              sx={{ marginRight: 1, borderRadius: 3 }}
              variant="outlined"
              color="inherit"
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleConfirm}
              sx={{
                borderRadius: 3,
                bgcolor: "error.main",
                "&:hover": {
                  bgcolor: "error.dark",
                },
              }}
            >
              Confirm
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}

export default BookList;
