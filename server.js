const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB Connected Successfully!'))
  .catch(err => console.error('DB Error:', err));

// Schema
const TournamentSchema = new mongoose.Schema({
  title: String,
  game: String,
  prize: Number,
  fee: Number,
  status: { type: String, default: 'Active' }
});
const Tournament = mongoose.model('Tournament', TournamentSchema);

// Routes
app.get('/api/tournaments', async (req, res) => {
  const list = await Tournament.find();
  res.json(list);
});

app.post('/api/tournaments', async (req, res) => {
  const newT = new Tournament(req.body);
  await newT.save();
  res.json({ message: 'Tournament Added!', data: newT });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
