// routes/appointmentRoutes.js
const express = require('express');
const { confirmAppointment } = require('../controllers/appointmentController');

const router = express.Router();

router.post('/confirm-appointment', confirmAppointment);

module.exports = router;
