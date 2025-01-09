// controllers/paymentController.js
const Payment = require('../models/paymentModel');

const createPayment = (req, res) => {
  const { totalCost, paymentMethod, customerId, employeeId } = req.body;

  Payment.createPayment({ totalCost, paymentMethod, customerId, employeeId }, (err, paymentId) => {
    if (err) return res.status(500).json({ error: err.message });

    res.json({ message: 'Payment created successfully!', paymentId });
  });
};

module.exports = { createPayment };
