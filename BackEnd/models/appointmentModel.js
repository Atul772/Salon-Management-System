// models/appointmentModel.js
const db = require('../config/db');

const createAppointment = (appointmentData, callback) => {
  const { appointmentDate, appointmentTime, customerId, employeeId } = appointmentData;
  
  // Ensure time is in proper format for MySQL TIME column
  const formattedTime = appointmentTime.substring(0, 8); // Ensure format is HH:MM:SS
  
  const query = `
    INSERT INTO Appointment (Date, Time, Status, Cus_ID, Emp_ID)
    VALUES (?, ?, 'Confirmed', ?, ?)
  `;

  db.query(query, [appointmentDate, formattedTime, customerId, employeeId], (err, result) => {
    if (err) return callback(err);
    callback(null, result.insertId);
  });
};

module.exports = { createAppointment };
