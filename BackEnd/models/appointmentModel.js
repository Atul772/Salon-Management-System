// models/appointmentModel.js
const db = require('../config/db');

const createAppointment = (appointmentData, callback) => {
  const { appointmentDate, appointmentTime, customerId, employeeId } = appointmentData;
  const query = `
    INSERT INTO Appointment (Date, Time, Status, Cus_ID, Emp_ID)
    VALUES (?, ?, 'Confirmed', ?, ?)
  `;

  db.query(query, [appointmentDate, appointmentTime, customerId, employeeId], (err, result) => {
    if (err) return callback(err);
    callback(null, result.insertId);
  });
};

module.exports = { createAppointment };
