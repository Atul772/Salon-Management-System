// controllers/employeeController.js
const Employee = require('../models/employeeModel');

const getEmployeeDetails = async (req, res) => {
    const { email } = req.body;
    try {
        const employee = await Employee.getEmployeeByEmail(email);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        const appointments = await Employee.getAppointmentsByEmpId(employee.Emp_ID);
        const feedback = await Employee.getFeedbackByEmpId(employee.Emp_ID);
        const payment = await  Employee.getPaymentByEmpId(employee.Emp_ID);


        res.json({
            employee,
            appointments,
            feedback,
            payment
        });
    } catch (error) {
        console.error('Error fetching employee data:', error);
        res.status(500).json({ error: 'Failed to fetch employee data' });
    }
};

module.exports = { getEmployeeDetails };
