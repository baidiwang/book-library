import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  FormControl,
  InputLabel, MenuItem, Select,
  TextField,
  Typography
} from "@mui/material";
import { useNavigate, useParams } from 'react-router-dom';
import { useStore } from '../store';

const years = []
const curYear = new Date().getFullYear()
for (let i = curYear; i > curYear - 100; i--) {
  years.push(i)
}

const genres = ["Fantasy", "Children's literature", "Picture book"]

function CreateBook() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState(curYear);
  const [genre, setGenre] = useState("");

  const navigate = useNavigate();
  const { books } = useStore()
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const matchedBook = books.find(book => book.id === Number(id))
      if (matchedBook) {
        setTitle(matchedBook.title)
        setAuthor(matchedBook.author)
        setYear(matchedBook.yearPublished)
        setGenre(matchedBook.genre)
      }
    }
  }, [id, books])

  const submit = () => {
    if (title && author && year && genre) {
      if (id) {
        fetch("http://localhost:8080/books/" + id, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            title,
            author,
            yearPublished: year,
            genre
          })
        }).then((res) => res.json())
          .then(() => {
            navigate("/")
          })
      } else {
        fetch("http://localhost:8080/books", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            title,
            author,
            yearPublished: year,
            genre
          })
        }).then((res) => res.json())
          .then(() => {
            navigate("/")
          })
      }
    }
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: 3
      }}
    >
      <Typography
        variant="h2"
        component="h2"
        sx={{ color: "#d32f2f", margin: 2, fontSize: 30 }}
      >
        {id ? "EDIT" : "CREATE"} BOOK
      </Typography>

      <Card sx={{ minWidth: 275, padding: "30px 0" }}>
        <CardContent sx={{width: 400, margin: "0 auto"}}>
          <Box mb={2}>
            <FormControl fullWidth>
              <TextField label="Title" variant="outlined" value={title} onChange={e => setTitle(e.target.value)} />
            </FormControl>
          </Box>
          <Box mb={2}>
            <FormControl fullWidth>
              <TextField label="Author" variant="outlined" value={author} onChange={e => setAuthor(e.target.value)} />
            </FormControl>
          </Box>
          <Box mb={2}>
            <FormControl fullWidth>
              <InputLabel id="year-label">Age</InputLabel>
              <Select
                labelId="year-label"
                value={year}
                label="Age"
                onChange={(e) => setYear(e.target.value)}
              >
                {
                  years.map(year => <MenuItem key={year} value={year}>{year}</MenuItem>)
                }
              </Select>
            </FormControl>
          </Box>
          <Box>
            <FormControl fullWidth>
              <InputLabel id="genre-label">Genre</InputLabel>
              <Select
                labelId="genre-label"
                value={genre}
                label="Age"
                onChange={(e) => setGenre(e.target.value)}
              >
                {
                  genres.map(genre => <MenuItem key={genre} value={genre}>{genre}</MenuItem>)
                }
              </Select>
            </FormControl>
          </Box>
        </CardContent>
        <CardActions sx={{width: 400, margin: "0 auto"}}>
          <Button variant="contained" onClick={submit}>Submit</Button>
        </CardActions>
      </Card>
    </Box>
  );
}

export default CreateBook;
