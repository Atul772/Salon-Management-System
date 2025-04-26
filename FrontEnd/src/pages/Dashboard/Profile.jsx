// Profile.js
import React, { useState, useEffect } from 'react';
import axi from '../../axionConfig';
import './Profile.css';
import DashboardHeader from './DashboardHeader';
import { FaUser, FaPhone, FaMapMarkerAlt, FaCalendarAlt, FaClock, 
         FaInfoCircle, FaTimes, FaRegStar, FaStar, FaPaperPlane } from 'react-icons/fa';

const Profile = () => {
    const [customerData, setCustomerData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [rating, setRating] = useState('');
    const [comments, setComments] = useState('');
    const [selectedEmployee, setSelectedEmployee] = useState('');
    
    const handleEmployeeChange = (e) => setSelectedEmployee(e.target.value);

    // Get stored email on component mount
    useEffect(() => {
        const userEmail = localStorage.getItem('userEmail');
        if (userEmail) {
            fetchCustomerData(userEmail);
        } else {
            setLoading(false);
            setError('User not logged in. Please log in again.');
        }
    }, []);

    const fetchCustomerData = async (email) => {
        setLoading(true);
        try {
            const response = await axi.post('/api/getCustomer', { email });
            setCustomerData(response.data);
            setError('');
        } catch (err) {
            setError('Could not fetch customer data. Please try again later.');
            setCustomerData(null);
        } finally {
            setLoading(false);
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
        if (!customerData || !selectedEmployee) {
            alert('Please ensure all fields are filled correctly.');
            return;
        }

        try {
            await axi.post('/api/submitFeedback', {
                email: localStorage.getItem('userEmail'),
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

    // Get first letter of name for avatar
    const getInitial = (name) => {
        return name ? name.charAt(0).toUpperCase() : '?';
    };

    // Star rating component
    const StarRating = () => {
        const stars = [1, 2, 3, 4, 5];
        
        return (
            <div className="star-rating">
                {stars.map((star) => (
                    <span
                        key={star}
                        className={`star ${parseInt(rating) >= star ? 'active' : ''}`}
                        onClick={() => setRating(star.toString())}
                    >
                        {parseInt(rating) >= star ? <FaStar /> : <FaRegStar />}
                    </span>
                ))}
            </div>
        );
    };

    return (
        <div>
            <DashboardHeader />
            <div className="profile-container">
                <div className="profile-header">
                    <div className="profile-avatar">
                        {customerData ? getInitial(customerData.name) : <FaUser />}
                    </div>
                    <h1>User Profile</h1>
                    <p className="profile-subtitle">Manage your personal information and appointments</p>
                </div>
                
                {loading && (
                    <div className="loading">
                        <div className="loading-spinner"></div>
                        Loading your profile...
                    </div>
                )}
                
                {error && <p className="error"><FaInfoCircle /> {error}</p>}
                
                {customerData && (
                    <div className="customer-details">
                        <div className="profile-section">
                            <h2><FaUser /> Personal Information</h2>
                            <div className="customer-info">
                                <div className="info-card">
                                    <div className="info-label">Full Name</div>
                                    <div className="info-value">{customerData.name}</div>
                                </div>
                                
                                <div className="info-card">
                                    <div className="info-label">Email Address</div>
                                    <div className="info-value">{localStorage.getItem('userEmail')}</div>
                                </div>
                                
                                <div className="info-card">
                                    <div className="info-label"><FaPhone /> Phone Number</div>
                                    <div className="info-value">{customerData.phone}</div>
                                </div>
                                
                                <div className="info-card">
                                    <div className="info-label"><FaMapMarkerAlt /> Address</div>
                                    <div className="info-value">{customerData.address}</div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="profile-section">
                            <h2><FaCalendarAlt /> Your Appointments</h2>
                            <div className="appointments-list">
                                {customerData.appointments && customerData.appointments.length > 0 ? (
                                    <ul>
                                        {customerData.appointments.map((app) => (
                                            <li key={app.App_ID} className="appointment-item">
                                                <div className="appointment-info">
                                                    <span><FaCalendarAlt /> <strong>Date:</strong> {app.Date.split('T')[0]}</span>
                                                    <span><FaClock /> <strong>Time:</strong> {app.Time}</span>
                                                    <span className={`status status-${app.Status.toLowerCase()}`}>
                                                        <FaInfoCircle /> <strong>Status:</strong> {app.Status}
                                                    </span>
                                                </div>
                                                {app.Status !== 'Completed' && (
                                                    <button 
                                                        className="cancel-btn" 
                                                        onClick={() => cancelAppointment(app.App_ID)}
                                                    >
                                                        <FaTimes /> Cancel Appointment
                                                    </button>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="no-appointments">You have no appointments scheduled. Visit the dashboard to book your first appointment!</p>
                                )}
                            </div>
                        </div>
                        
                        <div className="profile-section">
                            <h2><FaStar /> Share Your Feedback</h2>
                            <div className="feedback-form">
                                <div className="form-group">
                                    <label>How would you rate your experience?</label>
                                    <StarRating />
                                </div>
                                
                                <div className="form-group">
                                    <label>Share your thoughts</label>
                                    <textarea
                                        placeholder="Tell us about your experience with our salon services..."
                                        value={comments}
                                        onChange={(e) => setComments(e.target.value)}
                                    />
                                </div>
                                
                                <div className="form-group">
                                    <label>Select Employee</label>
                                    <select
                                        value={selectedEmployee}
                                        onChange={handleEmployeeChange}
                                    >
                                        <option value="">Choose an employee</option>
                                        <option value="Paul Mitchell">Paul Mitchell</option>
                                        <option value="Guy Tang">Guy Tang</option>
                                        <option value="Ted Gibson">Ted Gibson</option>
                                    </select>
                                </div>
                                
                                <button 
                                    className="submit-btn" 
                                    onClick={submitFeedback}
                                    disabled={!rating || !comments || !selectedEmployee}
                                >
                                    <FaPaperPlane /> Submit Feedback
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;
