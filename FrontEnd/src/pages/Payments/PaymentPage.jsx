import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axi from '../../axionConfig';
import './PaymentPage.css';
import { FaCalendarAlt, FaClock, FaUser, FaMoneyBillWave, FaCheckCircle } from 'react-icons/fa';

const PaymentPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { 
        selectedServices = [], 
        services = [],
        appointmentDate = '',
        appointmentTime = '',
        totalPrice = 0,
        totalDuration = 0
    } = location.state || {};

    const [customerId, setCustomerId] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState('');
    const [selectedEmployee, setSelectedEmployee] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [bookingMessage, setBookingMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');

    const employeeMap = {
        'Paul Mitchell': 1,
        'Guy Tang': 2,
        'Ted Gibson': 3
    };

    // Fetch user email and customer ID from localStorage or session when component mounts
    useEffect(() => {
        // Here we would normally get the user email from authentication context
        // For demonstration, we'll use localStorage
        const userEmail = localStorage.getItem('userEmail') || 'user@example.com';
        setEmail(userEmail);
        fetchCustomerId(userEmail);
    }, []);

    const fetchCustomerId = async (userEmail) => {
        if (!userEmail) return;
        
        setLoading(true);
        try {
            const response = await axi.get(`/api/customers/id?email=${userEmail}`);
            setCustomerId(response.data.cus_id);
            setErrorMessage('');
        } catch (error) {
            setErrorMessage('Customer information could not be retrieved. Please try again.');
            console.error(error.response ? error.response.data : error.message);
        } finally {
            setLoading(false);
        }
    };

    const handlePaymentMethodChange = (e) => setPaymentMethod(e.target.value);
    const handleEmployeeChange = (e) => setSelectedEmployee(e.target.value);

    const formatDate = (dateString) => {
        if (!dateString) return 'Not selected';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
    };

    // Convert 12-hour time format (e.g., "02:00 PM") to 24-hour format (e.g., "14:00:00")
    const convertTo24HourFormat = (time12h) => {
        if (!time12h) return '';
        
        // Parse the time
        const [time, modifier] = time12h.split(' ');
        let [hours, minutes] = time.split(':');
        
        // Convert hours to 24-hour format
        if (hours === '12') {
            hours = modifier === 'AM' ? '00' : '12';
        } else if (modifier === 'PM') {
            hours = parseInt(hours, 10) + 12;
        }
        
        // Return formatted time
        return `${hours}:${minutes}:00`;
    };

    const handleConfirmAppointment = async () => {
        const empId = employeeMap[selectedEmployee];
    
        // Validate that the appointment is not in the past
        const isValidAppointmentTime = () => {
            const appointmentDateTime = new Date(`${appointmentDate} ${convertTo24HourFormat(appointmentTime)}`);
            const now = new Date();
            return appointmentDateTime > now;
        };

        if (!customerId) {
            setErrorMessage('Customer information could not be retrieved. Please refresh the page.');
        } else if (!empId) {
            setErrorMessage('Please select an employee for the service.');
        } else if (!paymentMethod) {
            setErrorMessage('Please select a payment method');
        } else if (!appointmentDate || !appointmentTime) {
            setErrorMessage('Date and time information is missing. Please go back to the dashboard.');
        } else if (!isValidAppointmentTime()) {
            setErrorMessage('Cannot book appointments for past dates or times. Please go back and select a future time.');
        } else {
            try {
                // Convert appointment time to 24-hour format
                const formattedTime = convertTo24HourFormat(appointmentTime);
                
                const response = await axi.post('/api/appointments/confirm-appointment', {
                    appointmentDate,
                    appointmentTime: formattedTime,
                    paymentMethod,
                    totalCost: totalPrice,
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
            <h2>Confirm Your Appointment</h2>

            {loading && <div className="loading-spinner">Loading your information...</div>}

            <div className="payment-summary-section">
                <div className="summary-card">
                    <div className="summary-icon">
                        <FaCalendarAlt />
                    </div>
                    <div className="summary-content">
                        <h3>Appointment Date</h3>
                        <p>{formatDate(appointmentDate)}</p>
                    </div>
                </div>

                <div className="summary-card">
                    <div className="summary-icon">
                        <FaClock />
                    </div>
                    <div className="summary-content">
                        <h3>Appointment Time</h3>
                        <p>{appointmentTime || 'Not selected'}</p>
                    </div>
                </div>

                <div className="summary-card">
                    <div className="summary-icon">
                        <FaUser />
                    </div>
                    <div className="summary-content">
                        <h3>Customer</h3>
                        <p>{email}</p>
                    </div>
                </div>

                <div className="summary-card">
                    <div className="summary-icon">
                        <FaMoneyBillWave />
                    </div>
                    <div className="summary-content">
                        <h3>Total Price</h3>
                        <p>₹{totalPrice}</p>
                    </div>
                </div>
            </div>

            {/* Display Selected Services */}
            <div className="services-section">
                <h3>Selected Services</h3>
                <table className="selected-services-table">
                    <thead>
                        <tr>
                            <th>Service</th>
                            <th>Price</th>
                            <th>Duration</th>
                        </tr>
                    </thead>
                    <tbody>
                        {selectedServices.map(service_id => {
                            const service = services.find(service => service.service_id === service_id);
                            return service && (
                                <tr key={service_id}>
                                    <td>{service.name}</td>
                                    <td>₹{service.price}</td>
                                    <td>{service.duration}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td><strong>Total</strong></td>
                            <td><strong>₹{totalPrice}</strong></td>
                            <td>{totalDuration} min</td>
                        </tr>
                    </tfoot>
                </table>
            </div>

            {/* Employee Selection */}
            <div className="form-section">
                <div className="employee-selection">
                    <h3>Select Your Stylist</h3>
                    <select value={selectedEmployee} onChange={handleEmployeeChange}>
                        <option value="">Choose a stylist</option>
                        <option value="Paul Mitchell">Paul Mitchell</option>
                        <option value="Guy Tang">Guy Tang</option>
                        <option value="Ted Gibson">Ted Gibson</option>
                    </select>
                </div>

                {/* Payment Method Selection */}
                <div className="payment-method">
                    <h3>Select Payment Method</h3>
                    <div className="payment-options">
                        <label className={`payment-option ${paymentMethod === 'Online' ? 'selected' : ''}`}>
                            <input
                                type="radio"
                                value="Online"
                                checked={paymentMethod === 'Online'}
                                onChange={handlePaymentMethodChange}
                            />
                            <span className="option-text">Online Payment</span>
                        </label>
                        <label className={`payment-option ${paymentMethod === 'After Service' ? 'selected' : ''}`}>
                            <input
                                type="radio"
                                value="After Service"
                                checked={paymentMethod === 'After Service'}
                                onChange={handlePaymentMethodChange}
                            />
                            <span className="option-text">Pay After Service</span>
                        </label>
                    </div>
                </div>
            </div>

            {/* Error Message */}
            {errorMessage && <div className="error-message">{errorMessage}</div>}

            {/* Booking Message */}
            {bookingMessage && <div className="booking-message">{bookingMessage}</div>}

            {/* Action Buttons */}
            <div className="action-buttons">
                <button className="back-btn" onClick={() => navigate('/dashboard')}>
                    Back to Dashboard
                </button>
                <button 
                    className="confirm-appointment-btn" 
                    onClick={handleConfirmAppointment}
                    disabled={!customerId || !selectedEmployee || !paymentMethod}
                >
                    <FaCheckCircle /> Confirm Appointment
                </button>
            </div>
        </div>
    );
};

export default PaymentPage;
