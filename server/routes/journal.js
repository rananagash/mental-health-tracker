const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const JournalEntry = require('../models/JournalEntry');

// Get all journal entries for the authenticated user
router.get('/', auth, async (req, res) => {
  try {
    const entries = await JournalEntry.find({ userId: req.user.id }).sort({ date: -1 });
    res.json(entries);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Create a new journal entry
router.post('/', auth, async (req, res) => {
  try {
    const { date, mood, text } = req.body;
    if (!date || !mood) {
      return res.status(400).json({ message: 'Date and mood are required.' });
    }
    const entry = new JournalEntry({
      userId: req.user.id,
      date,
      mood,
      text,
    });
    await entry.save();
    res.status(201).json(entry);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router; 