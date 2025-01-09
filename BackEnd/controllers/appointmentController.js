// controllers/appointmentController.js
const Appointment = require('../models/appointmentModel');
const Payment = require('../models/paymentModel');

const confirmAppointment = (req, res) => {
  const { appointmentDate, appointmentTime, paymentMethod, totalCost, customerId, employeeId } = req.body;

  // First, create the appointment
  Appointment.createAppointment({ appointmentDate, appointmentTime, customerId, employeeId }, (err, appointmentId) => {
    if (err) return res.status(500).json({ error: err.message });

    // Then, create the payment
    Payment.createPayment({ totalCost, paymentMethod, customerId, employeeId }, (err) => {
      if (err) return res.status(500).json({ error: err.message });

      res.json({ message: 'Appointment and payment confirmed!', appointmentId });
    });
  });
};

module.exports = { confirmAppointment };
