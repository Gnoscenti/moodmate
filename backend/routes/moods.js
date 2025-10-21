const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const Mood = require('../models/Mood');

// @route   GET /api/moods
// @desc    Get all moods for logged in user
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const moods = await Mood.find({ user: req.user.id }).sort({ date: -1 });
    res.json(moods);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST /api/moods
// @desc    Add new mood entry
// @access  Private
router.post(
  '/',
  [
    auth,
    body('mood', 'Mood is required').notEmpty(),
    body('mood', 'Invalid mood value').isIn([
      'happy', 'sad', 'anxious', 'stressed', 'calm', 'energetic', 
      'depressed', 'angry', 'excited', 'tired', 'content', 
      'frustrated', 'hopeful', 'overwhelmed', 'peaceful'
    ])
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { mood, notes } = req.body;

    try {
      const newMood = new Mood({
        user: req.user.id,
        mood,
        notes: notes || ''
      });

      const savedMood = await newMood.save();
      res.json(savedMood);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route   GET /api/moods/:id
// @desc    Get mood by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const mood = await Mood.findById(req.params.id);

    if (!mood) {
      return res.status(404).json({ msg: 'Mood entry not found' });
    }

    // Make sure user owns mood
    if (mood.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    res.json(mood);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Mood entry not found' });
    }
    res.status(500).send('Server error');
  }
});

// @route   PUT /api/moods/:id
// @desc    Update mood entry
// @access  Private
router.put('/:id', auth, async (req, res) => {
  const { mood, notes } = req.body;

  try {
    let moodEntry = await Mood.findById(req.params.id);

    if (!moodEntry) {
      return res.status(404).json({ msg: 'Mood entry not found' });
    }

    // Make sure user owns mood
    if (moodEntry.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    // Update fields
    if (mood) moodEntry.mood = mood;
    if (notes !== undefined) moodEntry.notes = notes;

    await moodEntry.save();
    res.json(moodEntry);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   DELETE /api/moods/:id
// @desc    Delete mood entry
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const mood = await Mood.findById(req.params.id);

    if (!mood) {
      return res.status(404).json({ msg: 'Mood entry not found' });
    }

    // Make sure user owns mood
    if (mood.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await mood.deleteOne();
    res.json({ msg: 'Mood entry removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;

