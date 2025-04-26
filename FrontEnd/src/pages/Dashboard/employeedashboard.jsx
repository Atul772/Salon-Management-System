import React, { useState, useEffect } from 'react';
import axi from '../../axionConfig';
import E_Header from './E_Header';
import './EmployeeDashboard.css';
import { FaUser, FaIdCard, FaPhone, FaEnvelope, FaCalendar, FaStar, FaMoneyBillWave, FaCalendarCheck, FaCommentAlt, FaChartLine, FaClipboardList, FaCheck, FaUserClock, FaTimes } from 'react-icons/fa';

const EmployeeDashboard = () => {
    const [email, setEmail] = useState('');
    const [employeeData, setEmployeeData] = useState(null);
    const [message, setMessage] = useState('');
    const [activeTab, setActiveTab] = useState('appointments');
    const [loading, setLoading] = useState(false);
    const [statistics, setStatistics] = useState({
        totalAppointments: 0,
        totalFeedback: 0,
        totalEarnings: 0
    });

    // Get email from localStorage if available
    useEffect(() => {
        const storedEmail = localStorage.getItem('userEmail');
        if (storedEmail) {
            setEmail(storedEmail);
            fetchEmployeeData(storedEmail);
        }
    }, []);

    // Function to fetch employee data
    const fetchEmployeeData = async (emailToFetch) => {
        setLoading(true);
        try {
            const response = await axi.post('/api/getEmployeeDetails', { email: emailToFetch });
            
            if (response.data && response.data.employee) {
                const sortedData = {
                    ...response.data,
                    appointments: sortDataByDate(response.data.appointments),
                    feedback: sortDataByDate(response.data.feedback),
                    payment: sortDataByDate(response.data.payment)
                };
                
                setEmployeeData(sortedData);
                calculateStatistics(sortedData);
                setLoading(false);
            } else {
                setMessage('No employee found with that email. Please check and try again.');
                setLoading(false);
            }
        } catch (error) {
            setMessage('Error fetching employee details.');
            console.error(error);
            setLoading(false);
        }
    };

    // Calculate statistics from employee data
    const calculateStatistics = (data) => {
        const stats = {
            totalAppointments: data.appointments?.length || 0,
            totalFeedback: data.feedback?.length || 0,
            totalEarnings: data.payment?.reduce((sum, payment) => sum + parseInt(payment.Amount || 0), 0) || 0
        };
        setStatistics(stats);
    };

    // Sort data to show latest items first
    const sortDataByDate = (data) => {
        if (!data) return [];
        
        // Create a copy of the array to avoid mutating the original data
        return [...data].sort((a, b) => {
            const dateA = new Date(a.Date);
            const dateB = new Date(b.Date);
            return dateB - dateA; // Sort in descending order (newest first)
        });
    };

    // Function to mark appointment as completed
    const handleMarkCompleted = async (appointmentId) => {
        try {
            const response = await axi.post('/api/updateAppointmentStatus', { 
                appointmentId, 
                status: 'Completed' 
            });
            
            if (response.data.success) {
                // Update the local state to reflect the change
                const updatedEmployeeData = { ...employeeData };
                const appointmentIndex = updatedEmployeeData.appointments.findIndex(app => app.App_ID === appointmentId);
                
                if (appointmentIndex !== -1) {
                    updatedEmployeeData.appointments[appointmentIndex].Status = 'Completed';
                    setEmployeeData(updatedEmployeeData);
                }
            }
        } catch (error) {
            console.error('Error updating appointment status:', error);
        }
    };

    // Get employee's first name initial for avatar
    const getInitial = (name) => {
        return name ? name.charAt(0).toUpperCase() : 'E';
    };

    // Format date from ISO string
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
    };

    // Function to get CSS class based on appointment status
    const getStatusClass = (status) => {
        switch(status?.toLowerCase()) {
            case 'confirmed': return 'status-confirmed';
            case 'pending': return 'status-pending';
            case 'cancelled': return 'status-cancelled';
            case 'completed': return 'status-completed';
            default: return '';
        }
    };

    // Function to render star rating
    const renderStarRating = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <FaStar key={i} style={{ opacity: i <= rating ? 1 : 0.3 }} />
            );
        }
        return <div className="rating">{stars}</div>;
    };

    return (
        <div className="employee-dashboard">
            <E_Header/>
            <div className="profile-container">
                <h1>Employee Dashboard</h1>
                
                {!employeeData && (
                    <div className="email-search">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <button onClick={() => fetchEmployeeData(email)}>
                            {loading ? 'Loading...' : 'Proceed'}
                        </button>
                    </div>
                )}
                
                {loading && (
                    <div className="status-message loading">
                        Loading employee information...
                    </div>
                )}
                
                {message && (
                    <div className="status-message error">{message}</div>
                )}
                
                {employeeData && (
                    <>
                        {/* Statistics Cards */}
                        <div className="stat-cards">
                            <div className="stat-card">
                                <div className="stat-icon appointments-icon">
                                    <FaCalendarCheck />
                                </div>
                                <h3>APPOINTMENTS</h3>
                                <div className="stat-value">{statistics.totalAppointments}</div>
                                <div className="trend trend-up">
                                    {statistics.totalAppointments > 0 ? "Active" : "No appointments"}
                                </div>
                            </div>
                            
                            <div className="stat-card">
                                <div className="stat-icon feedback-icon">
                                    <FaCommentAlt />
                                </div>
                                <h3>FEEDBACK RECEIVED</h3>
                                <div className="stat-value">{statistics.totalFeedback}</div>
                                <div className="trend">
                                    {statistics.totalFeedback > 0 ? `Average: ${(employeeData.feedback?.reduce((sum, item) => sum + item.Rating, 0) / statistics.totalFeedback).toFixed(1)}/5` : "No feedback yet"}
                                </div>
                            </div>
                            
                            <div className="stat-card">
                                <div className="stat-icon earnings-icon">
                                    <FaMoneyBillWave />
                                </div>
                                <h3>TOTAL EARNINGS</h3>
                                <div className="stat-value">₹{statistics.totalEarnings}</div>
                                <div className="trend trend-up">
                                    {statistics.totalEarnings > 0 ? "Received payments" : "No payments yet"}
                                </div>
                            </div>
                        </div>
                        
                        <div className="employee-dashboard-body">
                            {/* Employee Profile Card */}
                            <div className="employee-profile-card">
                                <div className="profile-image">
                                    <div className="initial">{getInitial(employeeData.employee.Name)}</div>
                                </div>
                                
                                <div className="employee-info">
                                    <h2>{employeeData.employee.Name}</h2>
                                    <span className="position">{employeeData.employee.Position}</span>
                                    
                                    <div className="info-item">
                                        <FaIdCard />
                                        <span>ID: {employeeData.employee.Emp_ID}</span>
                                    </div>
                                    
                                    <div className="info-item">
                                        <FaPhone />
                                        <span>{employeeData.employee.Phone}</span>
                                    </div>
                                    
                                    <div className="info-item">
                                        <FaEnvelope />
                                        <span>{email}</span>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Dashboard Tabs */}
                            <div className="dashboard-tabs">
                                <div className="tabs-header">
                                    <button 
                                        className={`tab-button ${activeTab === 'appointments' ? 'active' : ''}`}
                                        onClick={() => setActiveTab('appointments')}
                                    >
                                        Appointments
                                    </button>
                                    
                                    <button 
                                        className={`tab-button ${activeTab === 'feedback' ? 'active' : ''}`}
                                        onClick={() => setActiveTab('feedback')}
                                    >
                                        Feedback
                                    </button>
                                    
                                    <button 
                                        className={`tab-button ${activeTab === 'payments' ? 'active' : ''}`}
                                        onClick={() => setActiveTab('payments')}
                                    >
                                        Payments
                                    </button>
                                </div>
                                
                                <div className="tab-content">
                                    {/* Appointments Tab */}
                                    {activeTab === 'appointments' && (
                                        <div>
                                            {employeeData.appointments && employeeData.appointments.length > 0 ? (
                                                employeeData.appointments.map((appointment) => (
                                                    <div className="appointment-card" key={appointment.App_ID}>
                                                        <div className="card-header">
                                                            <span className="card-date">{formatDate(appointment.Date)}</span>
                                                            <span className={`appointment-status ${getStatusClass(appointment.Status)}`}>
                                                                {appointment.Status}
                                                            </span>
                                                        </div>
                                                        
                                                        <div className="card-body">
                                                            <p>
                                                                <span>Appointment ID:</span>
                                                                <span>#{appointment.App_ID}</span>
                                                            </p>
                                                            <p>
                                                                <span>Time:</span>
                                                                <span>{appointment.Time}</span>
                                                            </p>
                                                            <p>
                                                                <span>Customer ID:</span>
                                                                <span>{appointment.Cus_ID}</span>
                                                            </p>
                                                        </div>
                                                        
                                                        {appointment.Status === 'Confirmed' && (
                                                            <div className="card-actions">
                                                                <button 
                                                                    className="action-button action-primary"
                                                                    onClick={() => handleMarkCompleted(appointment.App_ID)}
                                                                >
                                                                    <FaCheck /> Mark as Completed
                                                                </button>
                                                            </div>
                                                        )}
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="empty-state">
                                                    <FaCalendar />
                                                    <p>No appointments assigned yet.</p>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                    
                                    {/* Feedback Tab */}
                                    {activeTab === 'feedback' && (
                                        <div>
                                            {employeeData.feedback && employeeData.feedback.length > 0 ? (
                                                employeeData.feedback.map((feedback) => (
                                                    <div className="feedback-card" key={feedback.Feed_ID}>
                                                        <div className="card-header">
                                                            <span className="card-date">{formatDate(feedback.Date)}</span>
                                                            <span>Customer #{feedback.Cus_ID}</span>
                                                        </div>
                                                        
                                                        {renderStarRating(feedback.Rating)}
                                                        
                                                        <div className="card-body">
                                                            <p style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                                                                <span style={{ marginBottom: '8px' }}>Comments:</span>
                                                                <span style={{ fontStyle: 'italic', color: '#555' }}>"{feedback.Comments || 'No comments provided'}"</span>
                                                            </p>
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="empty-state">
                                                    <FaStar />
                                                    <p>No feedback received yet.</p>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                    
                                    {/* Payments Tab */}
                                    {activeTab === 'payments' && (
                                        <div>
                                            {employeeData.payment && employeeData.payment.length > 0 ? (
                                                employeeData.payment.map((payment, index) => (
                                                    <div className="payment-card" key={index}>
                                                        <div className="card-header">
                                                            <span className="card-date">{formatDate(payment.Date)}</span>
                                                            <span className="payment-amount">₹{payment.Amount}</span>
                                                        </div>
                                                        
                                                        <div className="card-body">
                                                            <p>
                                                                <span>Payment Method:</span>
                                                                <span>{payment.Method}</span>
                                                            </p>
                                                            <p>
                                                                <span>Customer ID:</span>
                                                                <span>{payment.Cus_ID}</span>
                                                            </p>
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="empty-state">
                                                    <FaMoneyBillWave />
                                                    <p>No payments recorded yet.</p>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default EmployeeDashboard;
