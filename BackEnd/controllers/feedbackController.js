const Feedback = require('../models/Feedback');
const Customer = require('../models/Customer');

const submitFeedback = async (req, res) => {
    const { email, rating, comments, empName } = req.body;

    try {
        // Validate input
        if (!email || !rating || !comments || !empName) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        // Get Cus_ID based on the provided email
        const customer = await Customer.getByEmail(email);

        const cusId = customer.Cus_ID;

        // Map employee name to ID
        const employeeMap = {
            'Paul Mitchell': 1,
            'Guy Tang': 2,
            'Ted Gibson': 3
        };
        const empId = employeeMap[empName];

        if (!empId) {
            return res.status(400).json({ message: 'Invalid employee selected.' });
        }

        // Create the feedback entry
        const date = new Date();
        await Feedback.create(rating, comments, date, cusId, empId);

        res.status(201).json({ message: 'Feedback submitted successfully.' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error.' });
    }
};

module.exports = {
    submitFeedback  // Ensure this export is correct
};
