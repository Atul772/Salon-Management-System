// controllers/appointmentController.js
const Appointment = require('../models/appointmentModel');
const Payment = require('../models/paymentModel');
const db = require('../config/db');
// Import SMS service (will be used once Twilio is installed)
// const smsService = require('../services/smsService');

const confirmAppointment = (req, res) => {
  const { appointmentDate, appointmentTime, paymentMethod, totalCost, customerId, employeeId } = req.body;

  // Validate that appointment is not in the past
  const isValidAppointmentTime = () => {
    const now = new Date();
    const appointmentDateTime = new Date(`${appointmentDate}T${appointmentTime}`);
    return appointmentDateTime > now;
  };

  // Server-side validation for past dates/times
  if (!isValidAppointmentTime()) {
    return res.status(400).json({ 
      error: "Cannot book appointments for past dates or times. Please select a future time." 
    });
  }

  // First, create the appointment
  Appointment.createAppointment({ appointmentDate, appointmentTime, customerId, employeeId }, (err, appointmentId) => {
    if (err) return res.status(500).json({ error: err.message });

    // Then, create the payment
    Payment.createPayment({ totalCost, paymentMethod, customerId, employeeId }, (err) => {
      if (err) return res.status(500).json({ error: err.message });

      // Get customer's phone number for sending SMS
      db.query('SELECT Phone FROM Customer WHERE Cus_ID = ?', [customerId], async (err, results) => {
        if (err) {
          console.error('Error fetching customer phone:', err);
          // Still return success since appointment was created
          return res.json({ message: 'Appointment and payment confirmed!', appointmentId });
        }

        if (results.length > 0) {
          const phoneNumber = results[0].Phone;
          
          // Uncomment this once SMS service is set up
          /* 
          try {
            // Send SMS notification
            await smsService.sendAppointmentConfirmation(
              { appointmentDate, appointmentTime, paymentMethod, totalCost },
              phoneNumber
            );
            console.log(`SMS notification sent to ${phoneNumber}`);
          } catch (smsError) {
            console.error('Error sending SMS notification:', smsError);
          }
          */
          
          // Log what would happen (for now)
          console.log(`Would send SMS notification to ${phoneNumber}`);
          console.log(`Appointment details: ${appointmentDate} at ${appointmentTime}`);
        }

        res.json({ message: 'Appointment and payment confirmed!', appointmentId });
      });
    });
  });
};

// Update appointment status (for employee dashboard)
const updateAppointmentStatus = (req, res) => {
  const { appointmentId, status } = req.body;
  
  if (!appointmentId || !status) {
    return res.status(400).json({ 
      success: false, 
      message: 'Appointment ID and status are required' 
    });
  }
  
  // Valid status values
  const validStatuses = ['Confirmed', 'Completed', 'Cancelled', 'Pending'];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ 
      success: false, 
      message: 'Invalid status value. Status must be one of: Confirmed, Completed, Cancelled, Pending' 
    });
  }
  
  // Update appointment status in database
  const query = `
    UPDATE Appointment 
    SET Status = ? 
    WHERE App_ID = ?
  `;
  
  db.query(query, [status, appointmentId], (err, result) => {
    if (err) {
      console.error('Error updating appointment status:', err);
      return res.status(500).json({ 
        success: false, 
        message: 'Failed to update appointment status', 
        error: err.message 
      });
    }
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ 
        success: false, 
        message: 'Appointment not found' 
      });
    }
    
    // Get appointment details for potential SMS notification
    if (status === 'Completed') {
      db.query(
        `SELECT a.*, c.Phone 
         FROM Appointment a 
         JOIN Customer c ON a.Cus_ID = c.Cus_ID 
         WHERE a.App_ID = ?`, 
        [appointmentId], 
        async (err, results) => {
          if (!err && results.length > 0) {
            const appointment = results[0];
            const customerPhone = appointment.Phone;
            
            // Would send SMS notification about completed appointment
            // Uncomment when SMS service is ready
            /*
            try {
              await smsService.sendAppointmentCompletionNotification(
                { 
                  appointmentDate: appointment.Date,
                  appointmentTime: appointment.Time
                },
                customerPhone
              );
            } catch (error) {
              console.error('Error sending completion SMS:', error);
            }
            */
            
            console.log(`Would send completion notification to ${customerPhone}`);
          }
      });
    }
    
    res.json({ 
      success: true, 
      message: `Appointment status updated to ${status}` 
    });
  });
};

module.exports = { confirmAppointment, updateAppointmentStatus };
