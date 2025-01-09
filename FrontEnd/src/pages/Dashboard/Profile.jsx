// Profile.js
import React, { useState } from 'react';
import axi from '../../axionConfig';
import './Profile.css';
import DashboardHeader from './DashboardHeader';

const Profile = () => {
    const [email, setEmail] = useState('');
    const [customerData, setCustomerData] = useState(null);
    const [error, setError] = useState('');
    const [rating, setRating] = useState('');
    const [comments, setComments] = useState('');
    const [selectedEmployee, setSelectedEmployee] = useState('');

    const handleEmployeeChange = (e) => setSelectedEmployee(e.target.value);

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const fetchCustomerData = async () => {
        if (!validateEmail(email)) {
            setError('Invalid email format.');
            return;
        }

        try {
            const response = await axi.post('/api/getCustomer', { email });
            setCustomerData(response.data);
            setError('');
        } catch (err) {
            setError('Customer not found.');
            setCustomerData(null);
        }
    };

    const cancelAppointment = async (appointmentId) => {
        if (window.confirm("Are you sure you want to cancel this appointment?")) {
            try {
                await axi.post('/api/cancelAppointment', { appointmentId });

                setCustomerData((prevData) => ({
                    ...prevData,
                    appointments: prevData.appointments.filter(app => app.App_ID !== appointmentId)
                }));

                alert('Appointment canceled successfully.');
            } catch (err) {
                alert('Error canceling appointment.');
            }
        }
    };

    const submitFeedback = async () => {
        if (!validateEmail(email) || !selectedEmployee) {
            alert('Please ensure all fields are filled correctly.');
            return;
        }

        const rating = document.querySelector('input[type="number"]').value;
        const comments = document.getElementById('comment').value;

        try {
            await axi.post('/api/submitFeedback', {
                email,
                rating: parseInt(rating, 10),
                comments,
                empName: selectedEmployee
            });

            alert('Feedback submitted successfully.');
            setRating('');
            setComments('');
            setSelectedEmployee('');
        } catch (err) {
            alert('Error submitting feedback.');
        }
    };

    return (
        <div>
            <DashboardHeader />
            <div className="profile-container">
                <h1>User Profile</h1>
                <div className="user">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <button onClick={fetchCustomerData}>Proceed</button>
                </div>
                {error && <p className="error">{error}</p>}
                {customerData && (
                    <div className="customer-details">
                        <h2>Customer Details</h2>
                        <p>Name: {customerData.name}</p>
                        <p>Phone: {customerData.phone}</p>
                        <p>Address: {customerData.address}</p>
                        <h3>Appointments</h3>
                        <ul>
                            {customerData.appointments.length > 0 ? (
                                customerData.appointments.map((app) => (
                                    <li key={app.App_ID}>
                                        <div style={{ margin: '0 45px', width: '35%' }}>Date: {app.Date.split('T')[0]}</div>
                                        <div>Time: {app.Time}</div>
                                        <div>Status: {app.Status}</div>
                                        <button onClick={() => cancelAppointment(app.App_ID)}>Cancel</button>
                                    </li>
                                ))
                            ) : (
                                <p>You have no appointments.</p>
                            )}
                        </ul>
                        <h3>Give Feedback!</h3>
                        <div className="feedback">
                            <div>
                                Rating:
                                <input
                                    type="number"
                                    min="1"
                                    max="5"
                                    step="1"
                                    value={rating}
                                    onChange={(e) => setRating(e.target.value)}
                                />
                            </div>
                            <div>
                                Comments:
                                <textarea
                                    name="comment"
                                    id="comment"
                                    maxLength="300"
                                    placeholder="Comment your Experience!"
                                    value={comments}
                                    onChange={(e) => setComments(e.target.value)}
                                />
                            </div>
                            <div className="employee-selection">
                                <strong>Select Employee:</strong>
                                <select
                                    value={selectedEmployee}
                                    onChange={handleEmployeeChange}
                                    style={{ color: 'black', backgroundColor: 'white' }}
                                >
                                    <option value="">Select an Employee</option>
                                    <option value="Paul Mitchell">Paul Mitchell</option>
                                    <option value="Guy Tang">Guy Tang</option>
                                    <option value="Ted Gibson">Ted Gibson</option>
                                </select>
                            </div>
                            <div>
                                <button onClick={submitFeedback}>Submit</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;
