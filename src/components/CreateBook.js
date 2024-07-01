import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useStore } from "../store";
import BulbsImage from "../assets/bulbs.svg";
import FeatherImage from "../assets/feather.svg";
import PenImage from "../assets/pen.svg";
import useMediaQuery from "@mui/material/useMediaQuery";
import bookCover from "../assets/bookCover.svg";
import book from "../assets/book.svg";

const years = [];
const curYear = new Date().getFullYear();
for (let i = curYear; i > curYear - 100; i--) {
  years.push(i);
}

const genres = ["Fantasy", "Children's literature", "Picture book"];

function CreateBook() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState(curYear);
  const [genre, setGenre] = useState("");

  const [titleError, setTitleError] = useState(false);
  const [authorError, setAuthorError] = useState(false);
  const [yearError, setYearError] = useState(false);
  const [genreError, setGenreError] = useState(false);

  const mdScreen = useMediaQuery("(max-width:1400px)");
  const xsScreen = useMediaQuery("(max-width:800px)");

  const navigate = useNavigate();
  const { books } = useStore();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const matchedBook = books.find((book) => book.id === Number(id));
      if (matchedBook) {
        setTitle(matchedBook.title);
        setAuthor(matchedBook.author);
        setYear(matchedBook.yearPublished);
        setGenre(matchedBook.genre);
      }
    }
  }, [id, books]);

  const submit = () => {
    setTitleError(!title);
    setAuthorError(!author);
    setYearError(!year);
    setGenreError(!genre);

    if (title && author && year && genre) {
      if (id) {
        fetch("http://localhost:8080/books/" + id, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            author,
            yearPublished: year,
            genre,
          }),
        })
          .then((res) => res.json())
          .then(() => {
            navigate("/");
          });
      } else {
        fetch("http://localhost:8080/books", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            author,
            yearPublished: year,
            genre,
          }),
        })
          .then((res) => res.json())
          .then(() => {
            navigate("/");
          });
      }
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: 3,
        height: "100vh",
        boxSizing: "border-box",
      }}
    >
      <Box position="absolute" left={70} top={0}>
        <img src={BulbsImage} alt="Bulbs Image" style={{ height: "25vh" }} />
      </Box>
      {!mdScreen && (
        <Box position="absolute" left="15%" top="50%">
          <img
            src={id ? FeatherImage : PenImage}
            alt="Feather Image"
            style={{ height: "25vh" }}
          />
        </Box>
      )}
      <Box
        className="book-container"
        sx={{
          width: xsScreen ? "100%" : 800,
          height: 500,
          padding: "30px 0",
          backgroundImage: `url(${!xsScreen ? book : bookCover})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        {!xsScreen && (
          <Box
            width={400}
            display="flex"
            flexDirection="column"
            px={10}
            mt={-5}
            boxSizing="border-box"
          >
            <Box className="book-label">Title</Box>
            <Box className="book-label">Author</Box>
            <Box className="book-label">Year Published</Box>
            <Box className="book-label" mb={3}>
              Genre
            </Box>
            <Button
              variant="contained"
              color="error"
              sx={{ alignSelf: "flex-start" }}
              onClick={() => navigate(-1)}
            >
              Back
            </Button>
          </Box>
        )}
        <Box
          width={400}
          display="flex"
          flexDirection="column"
          px={10}
          py={5}
          mt={-5}
          boxSizing="border-box"
          borderRadius={5}
        >
          <Box mb={2}>
            <FormControl fullWidth>
              <TextField
                aria-label="title"
                error={titleError}
                size="small"
                label="Title"
                variant="outlined"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                helperText={titleError ? "Please enter title." : ""}
                inputProps={{ "data-testid": "title" }}
              />
            </FormControl>
          </Box>
          <Box mb={2}>
            <FormControl fullWidth>
              <TextField
                aria-label="author"
                error={authorError}
                size="small"
                label="Author"
                variant="outlined"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                helperText={authorError ? "Please enter author." : ""}
                inputProps={{ "data-testid": "author" }}
              />
            </FormControl>
          </Box>
          <Box mb={2}>
            <FormControl fullWidth size="small" error={yearError}>
              <InputLabel
                id="year-label"
                sx={{
                  pr: "10px",
                  backgroundColor: xsScreen ? "error" : "background.paper",
                }}
              >
                Year Published
              </InputLabel>
              <Select
                labelId="year-label"
                value={year}
                label="Year Published"
                onChange={(e) => setYear(e.target.value)}
                inputProps={{ "data-testid": "year" }}
              >
                {years.map((year) => (
                  <MenuItem key={year} value={year}>
                    {year}
                  </MenuItem>
                ))}
              </Select>
              {yearError && (
                <Box
                  sx={{
                    color: "#d32f2f",
                    fontSize: "0.75rem",
                    margin: "4px 14px 0 14px",
                    letterSpacing: "0.03333em",
                  }}
                >
                  Please select year.
                </Box>
              )}
            </FormControl>
          </Box>
          <Box mb={3}>
            <FormControl fullWidth size="small" error={genreError}>
              <InputLabel id="genre-label">Genre</InputLabel>
              <Select
                labelId="genre-label"
                value={genre}
                label="Genre"
                onChange={(e) => setGenre(e.target.value)}
                inputProps={{ "data-testid": "genre" }}
              >
                {genres.map((genre) => (
                  <MenuItem key={genre} value={genre}>
                    {genre}
                  </MenuItem>
                ))}
              </Select>
              {genreError && (
                <Box
                  sx={{
                    color: "#d32f2f",
                    fontSize: "0.75rem",
                    margin: "4px 14px 0 14px",
                    letterSpacing: "0.03333em",
                  }}
                >
                  Please select genre.
                </Box>
              )}
            </FormControl>
          </Box>
          <Box>
            <Button
              variant="contained"
              color="error"
              sx={{ alignSelf: "flex-start", mr: 2 }}
              onClick={submit}
              data-testid="add"
            >
              {id ? "Update" : "Add"}
            </Button>
            {xsScreen && (
              <Button
                variant="contained"
                color="error"
                sx={{ alignSelf: "flex-start" }}
                onClick={() => navigate(-1)}
              >
                Back
              </Button>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default CreateBook;
