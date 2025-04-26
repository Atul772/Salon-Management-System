// BackEnd/services/smsService.js
// This file provides SMS notification functionality using Twilio

/**
 * Note: Before using this service:
 * 1. Install Twilio: npm install twilio
 * 2. Create a .env file with your Twilio credentials:
 *    TWILIO_ACCOUNT_SID=your_account_sid
 *    TWILIO_AUTH_TOKEN=your_auth_token
 *    TWILIO_PHONE_NUMBER=your_twilio_phone_number
 */

require('dotenv').config();

// This will be initialized once you've installed Twilio
// const twilio = require('twilio');
// const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

/**
 * Send appointment confirmation SMS to customer
 * @param {Object} appointmentData - Appointment details
 * @param {string} phoneNumber - Customer's phone number
 */
const sendAppointmentConfirmation = async (appointmentData, phoneNumber) => {
  try {
    // Skip actual sending if Twilio is not configured
    if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN) {
      console.log('SMS notification would be sent (Twilio not configured)');
      console.log(`To: ${phoneNumber}`);
      console.log(`Message: Appointment confirmed for ${appointmentData.appointmentDate} at ${appointmentData.appointmentTime}`);
      return { success: true, message: 'SMS notification would be sent (Twilio not configured)' };
    }

    // Format the message
    const message = `
      Your appointment at Salon Management System has been confirmed!
      Date: ${formatDate(appointmentData.appointmentDate)}
      Time: ${appointmentData.appointmentTime}
      Payment Method: ${appointmentData.paymentMethod}
      Total Amount: ₹${appointmentData.totalCost}
      
      Thank you for choosing our services!
    `;

    // Uncomment this once you have Twilio installed
    /*
    const result = await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phoneNumber
    });
    console.log(`SMS sent with SID: ${result.sid}`);
    return { success: true, sid: result.sid };
    */
    
    return { success: true, message: 'SMS notification would be sent (Twilio not configured)' };
  } catch (error) {
    console.error('Error sending SMS:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Send appointment reminder SMS to customer (to be called by a scheduled job)
 * @param {Object} appointmentData - Appointment details
 * @param {string} phoneNumber - Customer's phone number 
 */
const sendAppointmentReminder = async (appointmentData, phoneNumber) => {
  try {
    // Skip actual sending if Twilio is not configured
    if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN) {
      console.log('Reminder SMS would be sent (Twilio not configured)');
      console.log(`To: ${phoneNumber}`);
      console.log(`Message: Reminder for appointment on ${appointmentData.appointmentDate} at ${appointmentData.appointmentTime}`);
      return { success: true, message: 'Reminder SMS would be sent (Twilio not configured)' };
    }

    // Format the message
    const message = `
      Reminder: You have an appointment at Salon Management System tomorrow!
      Date: ${formatDate(appointmentData.appointmentDate)}
      Time: ${appointmentData.appointmentTime}
      
      We look forward to seeing you!
    `;

    // Uncomment this once you have Twilio installed
    /*
    const result = await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phoneNumber
    });
    console.log(`Reminder SMS sent with SID: ${result.sid}`);
    return { success: true, sid: result.sid };
    */
    
    return { success: true, message: 'Reminder SMS would be sent (Twilio not configured)' };
  } catch (error) {
    console.error('Error sending reminder SMS:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Format date for SMS messages
 * @param {string} dateString - Date in YYYY-MM-DD format
 * @returns {string} Formatted date string
 */
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
};

module.exports = {
  sendAppointmentConfirmation,
  sendAppointmentReminder
}; 