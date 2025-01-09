import React, { useState } from 'react';
import './Signup.css';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    password: '',
    confirmPassword: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.phone || !formData.address || !formData.password || !formData.confirmPassword) {
      alert('All fields are required.');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match.');
      return false;
    }
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(formData.phone)) {
      alert('Phone number is invalid.');
      return false;
    }
    return true;
  };

  const resetFormData = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      address: '',
      password: '',
      confirmPassword: '',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Sign up successful! Please log in.'); // Show success alert
        resetFormData(); // Clear form data
        navigate('/login'); // Navigate to login page
      } else {
        alert(data.message || 'Sign up failed.'); // Show error alert
      }
    } catch (err) {
      alert('An error occurred while signing up. Please try again.'); // Show error alert
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-form">
        <h2>Sign Up for Salon Management</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="name">Full Name:</label>
            <input type="text" id="name" value={formData.name} onChange={handleChange} placeholder="Enter your full name" />
          </div>
          <div className="input-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" />
          </div>
          <div className="input-group">
            <label htmlFor="phone">Phone:</label>
            <input type="text" id="phone" value={formData.phone} onChange={handleChange} placeholder="Enter your Phone Number" />
          </div>
          <div className="input-group">
            <label htmlFor="address">Address:</label>
            <input type="text" id="address" value={formData.address} onChange={handleChange} placeholder="Enter your address" />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" value={formData.password} onChange={handleChange} placeholder="Enter your password" />
          </div>
          <div className="input-group">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input type="password" id="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm your password" />
          </div>
          <button type="submit" className="signup-btn">Sign Up</button>
        </form>
        <p className="login-redirect">Already have an account? <a href="/login">Login</a></p>
      </div>
    </div>
  );
};

export default Signup;
