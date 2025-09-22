const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

let cards = [];
let idCounter = 1;

// Root route
app.get("/", (req, res) => {
  res.send("🎴 Welcome to the Playing Card Collection API!");
});

// POST: Add card
app.post("/cards", (req, res) => {
  const { suit, value } = req.body;
  if (!suit || !value) return res.status(400).json({ error: "Suit and Value required" });
  const card = { id: idCounter++, suit, value };
  cards.push(card);
  res.json(card);
});

// GET all cards
app.get("/cards", (req, res) => res.json(cards));

// GET card by ID
app.get("/cards/:id", (req, res) => {
  const card = cards.find(c => c.id === parseInt(req.params.id));
  if (!card) return res.status(404).json({ error: "Card not found" });
  res.json(card);
});

// DELETE card by ID
app.delete("/cards/:id", (req, res) => {
  const index = cards.findIndex(c => c.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: "Card not found" });
  const removedCard = cards.splice(index, 1);
  res.json({ message: "Card deleted", removedCard });
});

// Start server
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
