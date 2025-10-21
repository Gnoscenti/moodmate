const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getInsights } = require('../controllers/insightsController');

// @route   POST /api/insights
// @desc    Get AI insights for a mood
// @access  Private
router.post('/', auth, getInsights);

module.exports = router;

