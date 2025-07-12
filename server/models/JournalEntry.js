const mongoose = require('mongoose');

const journalEntrySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  mood: { type: Number, required: true, min: 1, max: 5 },
  text: { type: String },
}, { timestamps: { createdAt: true, updatedAt: false } });

module.exports = mongoose.model('JournalEntry', journalEntrySchema); 