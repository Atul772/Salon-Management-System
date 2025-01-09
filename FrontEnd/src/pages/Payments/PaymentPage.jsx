import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axi from '../../axionConfig';
import './PaymentPage.css';

const PaymentPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { selectedServices = [], services = [] } = location.state || {};

    const [email, setEmail] = useState('');
    const [customerId, setCustomerId] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState('');
    const [appointmentDateTime, setAppointmentDateTime] = useState('');
    const [selectedEmployee, setSelectedEmployee] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [bookingMessage, setBookingMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const employeeMap = {
        'Paul Mitchell': 1,
        'Guy Tang': 2,
        'Ted Gibson': 3
    };

    const totalCost = selectedServices.reduce((sum, service_id) => {
        const service = services.find(service => service.service_id === service_id);
        return sum + (service ? parseFloat(service.price) : 0);
    }, 0);

    const handleEmailChange = async (e) => {
        const enteredEmail = e.target.value;
        setEmail(enteredEmail);

        const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(enteredEmail);
        const isCompleteEmail = enteredEmail.includes('@') && enteredEmail.includes('.com');

        if (isValidEmail && isCompleteEmail) {
            setLoading(true);
            try {
                const response = await axi.get(`/api/customers/id?email=${enteredEmail}`);
                setCustomerId(response.data.cus_id);
                setErrorMessage('');
            } catch (error) {
                setErrorMessage('Customer not found or failed to fetch customer ID.');
                console.error(error.response ? error.response.data : error.message);
            } finally {
                setLoading(false);
            }
        } else {
            setCustomerId(null);
            setErrorMessage('Please enter a valid email address.');
        }
    };

    const handlePaymentMethodChange = (e) => setPaymentMethod(e.target.value);
    const handleDateTimeChange = (e) => setAppointmentDateTime(e.target.value);
    const handleEmployeeChange = (e) => setSelectedEmployee(e.target.value);

    const isValidAppointmentDateTime = () => {
        const selectedDateTime = new Date(appointmentDateTime);
        const now = new Date();

        if (selectedDateTime <= now) {
            setErrorMessage('Please select a future date and time.');
            return false;
        }

        const selectedHour = selectedDateTime.getHours();
        if (selectedHour < 9 || selectedHour > 19) {
            setErrorMessage('Please select a time between 9:00 AM and 7:00 PM.');
            return false;
        }

        return true;
    };

    const handleConfirmAppointment = async () => {
      const empId = employeeMap[selectedEmployee];
  
      if (!email || !customerId) {
          setErrorMessage('Please enter your registered email address');
      } else if (!empId) {
          setErrorMessage('Please select an employee for the service.');
      } else if (!paymentMethod) {
          setErrorMessage('Please select a payment method');
      } else if (!appointmentDateTime) {
          setErrorMessage('Please select a date and time for your appointment');
      } else if (!isValidAppointmentDateTime()) {
          // Error message set inside isValidAppointmentDateTime
      } else {
          try {
              const [appointmentDate, appointmentTime] = appointmentDateTime.split('T');
  
              const response = await axi.post('/api/appointments/confirm-appointment', {
                  appointmentDate,
                  appointmentTime,
                  paymentMethod,
                  totalCost,
                  customerId,
                  employeeId: empId
              });
  
              setBookingMessage(response.data.message);
  
              // Show a success alert, then navigate to the dashboard
              window.alert('Your appointment is booked! Thank you for booking our salon.');
              navigate('/dashboard');
          } catch (error) {
              setErrorMessage('Failed to confirm appointment. Please try again.');
              console.error(error.response ? error.response.data : error.message);
          }
      }
  };
  

    return (
        <div className="payment-page">
            <h2>Payment Page</h2>

            {/* Email Input Field */}
            <div className="customer-email">
                <strong>Enter Registered Email:</strong>
                <input
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="Enter your registered email"
                />
                {loading && <span>Loading...</span>}
            </div>

            {/* Display Selected Services */}
            <table className="selected-services-table">
                <thead>
                    <tr>
                        <th>Service ID</th>
                        <th>Name</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {selectedServices.map(service_id => {
                        const service = services.find(service => service.service_id === service_id);
                        return (
                            <tr key={service_id}>
                                <td>{service.service_id}</td>
                                <td>{service.name}</td>
                                <td>{service.price}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            {/* Total Cost Display */}
            <div className="total-cost">
                <strong>Total Cost: </strong>₹{totalCost}
            </div>

            {/* Appointment Date and Time Selection */}
            <div className="appointment-datetime">
                <strong>Select Date and Time for Appointment:</strong>
                <input
                    type="datetime-local"
                    value={appointmentDateTime}
                    onChange={handleDateTimeChange}
                />
            </div>

            {/* Employee Selection */}
            <div className="employee-selection">
                <strong>Select Employee Who Served You !:</strong>
                <select value={selectedEmployee} onChange={handleEmployeeChange}>
                    <option value="">Select an Employee</option>
                    <option value="Paul Mitchell">Paul Mitchell</option>
                    <option value="Guy Tang">Guy Tang</option>
                    <option value="Ted Gibson">Ted Gibson</option>
                </select>
            </div>

            {/* Payment Method Selection */}
            <div className="payment-method">
                <strong>Select Payment Method:</strong>
                <div>
                    <label>
                        <input
                            type="radio"
                            value="Online"
                            checked={paymentMethod === 'Online'}
                            onChange={handlePaymentMethodChange}
                        />
                        Online Payment
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="After Service"
                            checked={paymentMethod === 'After Service'}
                            onChange={handlePaymentMethodChange}
                        />
                        Pay After Service
                    </label>
                </div>
            </div>

            {/* Error Message */}
            {errorMessage && <div className="error-message">{errorMessage}</div>}

            {/* Booking Message */}
            {bookingMessage && <div className="booking-message">{bookingMessage}</div>}

            {/* Confirm Appointment Button */}
            <button className="confirm-appointment-btn" onClick={handleConfirmAppointment}>
                Confirm Appointment
            </button>
        </div>
    );
};

export default PaymentPage;
