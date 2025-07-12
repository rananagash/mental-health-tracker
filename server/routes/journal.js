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

// Get a single journal entry by ID (must belong to user)
router.get('/:id', auth, async (req, res) => {
  try {
    const entry = await JournalEntry.findOne({ _id: req.params.id, userId: req.user.id });
    if (!entry) return res.status(404).json({ message: 'Entry not found' });
    res.json(entry);
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

// Update a journal entry by ID (must belong to user)
router.put('/:id', auth, async (req, res) => {
  try {
    const { date, mood, text } = req.body;
    const entry = await JournalEntry.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { date, mood, text },
      { new: true }
    );
    if (!entry) return res.status(404).json({ message: 'Entry not found' });
    res.json(entry);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Delete a journal entry by ID (must belong to user)
router.delete('/:id', auth, async (req, res) => {
  try {
    const entry = await JournalEntry.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!entry) return res.status(404).json({ message: 'Entry not found' });
    res.json({ message: 'Entry deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router; 