// models/paymentModel.js
const db = require('../config/db');

const createPayment = (paymentData, callback) => {
  const { totalCost, paymentMethod, customerId, employeeId } = paymentData;
  const query = `
    INSERT INTO Payment (Amount, Date, Method, Cus_ID, Emp_ID)
    VALUES (?, NOW(), ?, ?, ?)
  `;

  db.query(query, [totalCost, paymentMethod, customerId, employeeId], (err, result) => {
    if (err) return callback(err);
    callback(null, result.insertId);
  });
};

module.exports = { createPayment };
