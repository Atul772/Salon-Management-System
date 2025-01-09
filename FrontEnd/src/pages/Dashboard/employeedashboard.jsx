import React, { useState } from 'react';
import axi from '../../axionConfig';
import E_Header from './E_Header';

const EmployeeDashboard = () => {
    const [email, setEmail] = useState('');
    const [employeeData, setEmployeeData] = useState(null);
    const [message, setMessage] = useState('');

    // Function to fetch employee data
    const fetchEmployeeData = async () => {
        try {
            const response = await axi.post('/api/getEmployeeDetails', { email });
            console.log(response.data);
            if (response.data) {
                setEmployeeData(response.data); // Store the employee data in the state
                setMessage('');
            } else {
                setMessage('No employee found with this email.');
                setEmployeeData(null);
            }
        } catch (error) {
            setMessage('Error fetching employee details.');
            console.error(error);
        }
    };

    return (
        <div>
            <E_Header/>
            <div className="profile-container">
                <h1>Employee Profile</h1>
                <div className="user">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <button onClick={fetchEmployeeData}>Proceed</button>
                </div>
                {message && <p>{message}</p>}
                {employeeData && (
                    <div className="employee-details">
                        <h2>Employee Details</h2>
                        <p>Emp_ID: {employeeData.employee.Emp_ID}</p>
                        <p>Name: {employeeData.employee.Name}</p>
                        <p>Role: {employeeData.employee.Position}</p>
                        <p>Phone: {employeeData.employee.Phone}</p>
                        <h3>Assigned Appointments</h3>
                        {employeeData.appointments && employeeData.appointments.length > 0 ? (
                            <ul>
                            {employeeData.appointments.map((app) => (
                              <li>
                                <div>Date: {app.Date.split('T')[0]}</div>
                                <div>Time: {app.Time}</div>
                                <div>Status: {app.Status}</div>
                              </li>
                            ))}
                          </ul>
                        ) : (
                            <p>No assigned appointments.</p>
                        )}
                        <h3>Given Feedback</h3>
                        {employeeData.feedback && employeeData.feedback.length > 0 ? (
                            <ul>
                                {employeeData.feedback.map((app) => (
                                    <li key={app.Feed_ID} style={{listStyle:'decimal-leading-zero',margin:'20px 0'}}>
                                        <div>Date: {app.Date.split('T')[0]}</div>
                                        <div>Rating: {app.Rating}</div>
                                        <div>Cus_ID: {app.Cus_ID}</div>
                                        <div>Comments: {app.Comments}</div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No feedback given.</p>
                        )}
                        <h3>Payments Received</h3>
                        {employeeData.payment && employeeData.payment.length > 0 ? (
                            <ul>
                                {employeeData.payment.map((app) => (
                                    <li key={app.Feed_ID} style={{margin:'20px 0', display:'flex',justifyContent:'space-between'}}>
                                        <div>Amount: {app.Amount}</div>
                                        <div>Date: {app.Date.split('T')[0]}</div>
                                        <div>Method: {app.Method}</div>
                                        <div>Cus_ID: {app.Cus_ID}</div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No payment received.</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default EmployeeDashboard;
