// routes/appointmentRoutes.js
const express = require('express');
const { confirmAppointment, updateAppointmentStatus } = require('../controllers/appointmentController');

const router = express.Router();

router.post('/confirm-appointment', confirmAppointment);
router.post('/update-status', updateAppointmentStatus);

module.exports = router;
