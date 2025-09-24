// server.js
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

let books = [
  { id: 1, title: "The Alchemist", author: "Paulo Coelho" },
  { id: 2, title: "Wings of Fire", author: "A. P. J. Abdul Kalam" },
  { id: 3, title: "Rich Dad Poor Dad", author: "Robert Kiyosaki" }
];

// Root route
app.get('/', (req, res) => {
  res.send('📚 Welcome to the Book API!');
});

// GET all books
app.get('/books', (req, res) => {
  res.json(books);
});

// GET book by ID
app.get('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const book = books.find(b => b.id === bookId);
  if (book) res.json(book);
  else res.status(404).send("Book not found");
});

// POST new book
app.post('/books', (req, res) => {
  const { id, title, author } = req.body;
  if (!id || !title || !author) {
    return res.status(400).send("Provide id, title, and author");
  }
  if (books.find(b => b.id === id)) {
    return res.status(400).send("Book with this ID already exists");
  }
  books.push({ id, title, author });
  res.status(201).send(`Book "${title}" added successfully`);
});

// PUT update a book
app.put('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const { title, author } = req.body;
  const bookIndex = books.findIndex(b => b.id === bookId);
  if (bookIndex === -1) return res.status(404).send("Book not found");

  books[bookIndex] = { id: bookId, title, author };
  res.send(`Book with ID ${bookId} updated successfully`);
});

// DELETE a book
app.delete('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const initialLength = books.length;
  books = books.filter(b => b.id !== bookId);
  if (books.length === initialLength) return res.status(404).send("Book not found");

  res.send(`Book with ID ${bookId} deleted successfully`);
});

app.listen(3000, () => {
  console.log("🚀 Server running at http://localhost:3000");
});
