const db = require('../config/db'); // Assuming you have a db.js for the MySQL connection

const CustomerModel = {
    getCustomerByEmail: (email) => {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT name, phone, address, Cus_ID
                FROM Customer
                WHERE email = ?`;
            db.query(query, [email], (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
    },
    
    deleteCustomerByEmail: (email) => {
        return new Promise((resolve, reject) => {
            const query = `
                DELETE FROM Customer
                WHERE email = ?`;
            db.query(query, [email], (err) => {
                if (err) return reject(err);
                resolve();
            });
        });
    },

    getAppointmentsByEmail: (email) => {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT * FROM Appointment
                WHERE Cus_ID = (SELECT Cus_ID FROM Customer WHERE email = ?)`;
            db.query(query, [email], (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
    },

    // deleteAppointmentsByCustomerId: (cusId) => {
    //     return new Promise((resolve, reject) => {
    //         const query = `
    //             DELETE FROM Appointment
    //             WHERE Cus_ID = ?`;
    //         db.query(query, [cusId], (err) => {
    //             if (err) return reject(err);
    //             resolve();
    //         });
    //     });
    // },

    deleteAppointmentById: (appointmentId) => {
        return new Promise((resolve, reject) => {
            const query = `
                DELETE FROM Appointment
                WHERE App_ID = ?`;
            db.query(query, [appointmentId], (err) => {
                if (err) return reject(err);
                resolve();
            });
        });
    }
};

module.exports = CustomerModel;
