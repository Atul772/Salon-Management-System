// models/employeeModel.js
const db = require('../config/db');

const Employee = {
    // Fetch employee details by email
    getEmployeeByEmail: (email) => {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT Emp_ID, Name , Phone , Position
                FROM Employee 
                WHERE Email = ?`;
            db.query(query, [email], (err, results) => {
                if (err) return reject(err);
                resolve(results[0]); 
                console.log(results[0]);// Return single employee
            });
        });
    },

    // Fetch employee appointments
    getAppointmentsByEmpId: (empId) => {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT App_ID, Date, Time, Status , Cus_ID
                FROM Appointment
                WHERE Emp_ID = ?`;
            db.query(query, [empId], (err, results) => {
                if (err) return reject(err);
                resolve(results); // Return appointments list
            });
        });
    },

    // Fetch employee feedback
    getFeedbackByEmpId: (empId) => {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT Feed_ID, Rating , Comments , Date , Cus_ID
                FROM feedback
                WHERE Emp_ID = ?`;
            db.query(query, [empId], (err, results) => {
                if (err) return reject(err);
                resolve(results); // Return feedback list
            });
        });
    },
    // Fetch employee payment
    getPaymentByEmpId: (empId) => {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT Amount, Date , Method , Cus_ID
                FROM payment
                WHERE Emp_ID = ?`;
            db.query(query, [empId], (err, results) => {
                if (err) return reject(err);
                resolve(results); // Return payment list
            });
        });
    }
};

module.exports = Employee;
