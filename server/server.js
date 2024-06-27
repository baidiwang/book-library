const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

let books = [
  {
    id: 1,
    title: "Harry Potter and the Sorcerer's Stone",
    author: "J.K. Rowling",
    yearPublished: 1997,
    genre: "Fantasy",
  },
  {
    id: 2,
    title: "Charlotte's Web",
    author: "E.B. White",
    yearPublished: 1952,
    genre: "Children's literature",
  },
  {
    id: 3,
    title: "The Cat in the Hat",
    author: "Dr. Seuss",
    yearPublished: 1957,
    genre: "Children's literature",
  },
  {
    id: 4,
    title: "The Very Hungry Caterpillar",
    author: "Eric Carle",
    yearPublished: 1969,
    genre: "Picture book",
  },
  {
    id: 5,
    title: "Green Eggs and Ham",
    author: "Dr. Seuss",
    yearPublished: 1960,
    genre: "Children's literature",
  },
  {
    id: 6,
    title: "The Lion, the Witch and the Wardrobe",
    author: "C.S. Lewis",
    yearPublished: 1950,
    genre: "Fantasy",
  },
  {
    id: 7,
    title: "Alice's Adventures in Wonderland",
    author: "Lewis Carroll",
    yearPublished: 1865,
    genre: "Fantasy",
  },
  {
    id: 8,
    title: "Where the Wild Things Are",
    author: "Maurice Sendak",
    yearPublished: 1963,
    genre: "Picture book",
  },
  {
    id: 9,
    title: "Matilda",
    author: "Roald Dahl",
    yearPublished: 1988,
    genre: "Children's literature",
  },
  {
    id: 10,
    title: "Goodnight Moon",
    author: "Margaret Wise Brown",
    yearPublished: 1947,
    genre: "Picture book",
  },
];

// Rest API
app.get("/books", (req, res) => res.json(books));

// Add a book
app.post("/books", (req, res) => {
  const { title, author, yearPublished, genre } = req.body;
  const newBook = {
    id: books.length + 1,
    title,
    author,
    yearPublished,
    genre,
  };
  books.push(newBook);
  res.status(201).send(newBook);
});

// Edit a book
app.put("/books/:id", (req, res) => {
  const { id } = req.params;
  const { title, author, yearPublished, genre } = req.body;
  const book = books.find((book) => book.id === parseInt(id));

  if (book) {
    book.title = title || book.title;
    book.author = author || book.author;
    book.yearPublished = yearPublished || book.yearPublished;
    book.genre = genre || book.genre;
    res.status(200).send(book);
  } else {
    res.status(404).send("Book not found");
  }
});

// Delete a book
app.delete("/books/:id", (req, res) => {
  const { id } = req.params;
  const initialLength = books.length;
  books = books.filter((book) => book.id !== parseInt(id));

  if (books.length < initialLength) {
    res.status(200).send();
  } else {
    res.status(404).send("Book not found");
  }
});

app.listen(3001, () => console.log("Server running on port 3001"));
