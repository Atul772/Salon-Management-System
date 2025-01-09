const CustomerModel = require('../models/customerModel');

const getCustomer = async (req, res) => {
    const { email } = req.body;
    try {
        const customerData = await CustomerModel.getCustomerByEmail(email);
        if (customerData.length === 0) {
            return res.status(404).send('Customer not found.');
        }

        const appointments = await CustomerModel.getAppointmentsByEmail(email);
        const customer = customerData[0];
        res.json({ ...customer, appointments });
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const deleteAccount = async (req, res) => {
    const { email } = req.body;
    try {
        const customerData = await CustomerModel.getCustomerByEmail(email);
        if (customerData.length === 0) {
            return res.status(404).send('Customer not found.');
        }

        const cusId = customerData[0].Cus_ID;

        await CustomerModel.deleteAppointmentsByCustomerId(cusId);
        await CustomerModel.deleteCustomerByEmail(email);

        res.send('Account deleted successfully.');
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const cancelAppointment = async (req, res) => {
    const { appointmentId } = req.body;
    try {
        await CustomerModel.deleteAppointmentById(appointmentId);
        res.send('Appointment canceled successfully.');
    } catch (err) {
        res.status(500).send(err.message);
    }
};

module.exports = {
    getCustomer,
    deleteAccount,
    cancelAppointment
};
