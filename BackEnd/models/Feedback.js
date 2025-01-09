const db = require('../config/db'); // Your database connection

const Feedback = {
    create: async (rating, comments, date, cusId, empId) => {
        const query = `
            INSERT INTO Feedback (Rating, Comments, Date, Cus_ID, Emp_ID)
            VALUES (?, ?, ?, ?, ?)`;

        // Remove destructuring
        const result = await db.execute(query, [rating, comments, date, cusId, empId]);
        return result;
    }
};

module.exports = Feedback;
