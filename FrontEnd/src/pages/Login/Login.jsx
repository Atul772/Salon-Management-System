import React, { useState, useEffect } from 'react';
import './Login.css';
import Header from '../../components/Header/Header';
import { useNavigate, useLocation } from 'react-router-dom';

const Login = () => {
  const [userType, setUserType] = useState('customer'); // Track whether customer or employee
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || (userType === 'customer' ? '/dashboard' : '/employeedashboard');

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('userRole');
    
    if (token) {
      navigate(userRole === 'customer' ? '/dashboard' : '/employeedashboard');
    }
  }, [navigate]);

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
        // Store authentication data
        localStorage.setItem('token', 'temp-token-' + Date.now()); // In a real app, you'd use a JWT from the server
        localStorage.setItem('userRole', userType);
        localStorage.setItem('userEmail', formData.email);
        
        // Redirect based on user type
        navigate(from, { replace: true });
      } else {
        setError(data.message || 'Login failed. Please check your credentials.');
      }
    } catch (err) {
      setError('An error occurred while logging in. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <Header />
      <div className="login-form">
        <h2>Welcome Back</h2>
        <p className="login-subtitle">Please login to access your account</p>
        
        <div className="user-type-selector">
          <label className={`user-type-option ${userType === 'customer' ? 'active' : ''}`}>
            <input
              type="radio"
              name="userType"
              value="customer"
              checked={userType === 'customer'}
              onChange={handleUserTypeChange}
            />
            Customer
          </label>
          <label className={`user-type-option ${userType === 'employee' ? 'active' : ''}`}>
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
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder={`Enter your email`}
              className="input-field"
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="input-field"
            />
          </div>
          <button type="submit" className="login-btn">Login</button>
        </form>
        
        {userType === 'customer' && (
          <p className="sign-up-link">
            Don't have an account? <a href="/signup">Sign up here</a>
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
