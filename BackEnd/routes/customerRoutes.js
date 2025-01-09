const express = require('express');
const { getCustomer, deleteAccount, cancelAppointment } = require('../controllers/customerController');

const router = express.Router();

router.post('/getCustomer', getCustomer);
// 
router.post('/cancelAppointment', cancelAppointment);
router.post('/deleteAccount', deleteAccount);
module.exports = router;
