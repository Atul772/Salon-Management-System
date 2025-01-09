// backend/server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes'); // Auth routes
const appointmentRoutes = require('./routes/appointmentRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const customerRoutes=require('./routes/customerRoutes');
const employeeRoutes=require('./routes/employeeRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');
const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());


// Use routes
app.use('/api', authRoutes); // Authentication routes
app.use('/api/appointments', appointmentRoutes); // Appointment routes
app.use('/api/payments', paymentRoutes); // Payment routes
app.use('/api',customerRoutes);
app.use('/api',employeeRoutes);
app.use('/api', feedbackRoutes);
// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
