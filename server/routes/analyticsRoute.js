const express = require('express');
const router = express.Router();
const { getSummary, getSessions } = require('../controllers/analyticsController');

// GET /api/analytics/summary
router.get('/summary', getSummary);

// GET /api/analytics/sessions
router.get('/sessions', getSessions);

module.exports = router;
