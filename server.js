const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Enable CORS for all origins (frontend access fix)
app.use(cors());
app.use(express.json());

// MongoDB Connection
const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB Connected Successfully'))
  .catch(err => console.error('MongoDB Connection Error:', err));

// Schema & Model
const tournamentSchema = new mongoose.Schema({
  title: String,
  game: String,
  prize: Number,
  fee: Number
});

const Tournament = mongoose.model('Tournament', tournamentSchema);

// Routes
app.get('/api/tournaments', async (req, res) => {
  try {
    const tournaments = await Tournament.find();
    res.json(tournaments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/tournaments', async (req, res) => {
  try {
    const newTournament = new Tournament(req.body);
    await newTournament.save();
    res.status(201).json(newTournament);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
