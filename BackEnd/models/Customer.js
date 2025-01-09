// backend/models/Customer.js
// This can be omitted if using plain SQL queries as in the example.
// If you switch to an ORM, you would define your model here.

// const db = require('../config/db');

// const Customer = {
//   // Example of how to fetch a customer
//   getByEmail: (email, callback) => {
//     const query = 'SELECT * FROM Customer WHERE Email = ?';
//     db.query(query, [email], callback);
//   },
//   // Add more model methods as needed
// };

// module.exports = Customer;

// backend/models/Customer.js
const db = require('../config/db');

const Customer = {
    // Fetch a customer by email
    getByEmail: (email) => {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM Customer WHERE Email = ?';
            db.query(query, [email], (error, results) => {
                if (error) {
                    return reject(error);  // Reject the promise with the error
                }
                resolve(results[0] || null);  // Resolve with the first customer found or null
            });
        });
    },
    
    // Add more model methods as needed
};

module.exports = Customer;

