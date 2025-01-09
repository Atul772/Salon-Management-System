import React, { useState } from 'react';
import './Login.css';
import Header from '../../components/Header/Header';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [userType, setUserType] = useState('customer'); // Track whether customer or employee
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleUserTypeChange = (e) => {
    setUserType(e.target.value);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const validateForm = () => {
    if (!formData.email || !formData.password) {
      setError('All fields are required.');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          role: userType, // Include user type in the request
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert(`Login successful as ${userType}!`);
        // Redirect based on user type
        if (userType === 'customer') {
          navigate('/dashboard');
        } else {
          navigate('/employeedashboard');
        }
      } else {
        alert(data.message || 'Login failed.');
      }
    } catch (err) {
      alert('An error occurred while logging in. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <Header />
      <div className="login-form">
        <h2>Salon Management System</h2>
        <div className="user-type-selector">
          <label>
            <input
              type="radio"
              name="userType"
              value="customer"
              checked={userType === 'customer'}
              onChange={handleUserTypeChange}
            />
            Customer
          </label>
          <label>
            <input
              type="radio"
              name="userType"
              value="employee"
              checked={userType === 'employee'}
              onChange={handleUserTypeChange}
            />
            Employee
          </label>
        </div>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder={`Enter your ${userType} email`}
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
            />
          </div>
          <button type="submit" className="login-btn">Login as {userType}</button>
        </form>
        {userType === 'customer' && (
          <p className="sign-up-link">
            Not a customer? <a href="/signup">Sign up here</a>
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
