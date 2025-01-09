// routes/employeeRoutes.js
const express = require('express');
const { getEmployeeDetails } = require('../controllers/employeeController');
const router = express.Router();

router.post('/getEmployeeDetails', getEmployeeDetails);


module.exports = router;
