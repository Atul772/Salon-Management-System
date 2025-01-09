const express = require('express');
const router = express.Router();
const { submitFeedback } = require('../controllers/feedbackController'); // Ensure this path is correct

// Route for submitting feedback
router.post('/submitFeedback', submitFeedback);

module.exports = router;
