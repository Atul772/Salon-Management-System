// backend/routes/authRoutes.js
const express = require('express');
const { signup, login, getCustomerIdByEmail } = require('../controllers/authController'); 

const router = express.Router();

// Signup route
router.post('/signup', signup);

// Login route
router.post('/login', login);

router.get('/customers/id', getCustomerIdByEmail);
module.exports = router;
