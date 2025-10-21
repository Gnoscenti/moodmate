const mongoose = require('mongoose');

// Possible moods: happy, sad, anxious, stressed, calm, energetic, depressed, angry, 
// excited, tired, content, frustrated, hopeful, overwhelmed, peaceful, etc.

const MoodSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  mood: {
    type: String,
    required: true,
    enum: [
      'happy', 'sad', 'anxious', 'stressed', 'calm', 'energetic', 
      'depressed', 'angry', 'excited', 'tired', 'content', 
      'frustrated', 'hopeful', 'overwhelmed', 'peaceful'
    ]
  },
  notes: {
    type: String,
    default: ''
  },
  date: {
    type: Date,
    default: Date.now
  }
});

// Index for faster queries
MoodSchema.index({ user: 1, date: -1 });

module.exports = mongoose.model('Mood', MoodSchema);

