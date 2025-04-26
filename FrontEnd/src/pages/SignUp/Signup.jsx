import React, { useState } from 'react';
import './Signup.css';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaLock, FaExclamationCircle } from 'react-icons/fa';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
    
    // Clear error for this field
    if (errors[id]) {
      setErrors({ ...errors, [id]: '' });
    }
    
    // Check password strength when password changes
    if (id === 'password') {
      checkPasswordStrength(value);
    }
  };

  const checkPasswordStrength = (password) => {
    let strength = 0;
    
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    
    setPasswordStrength(strength);
  };

  // Get color for password strength indicator
  const getStrengthColor = () => {
    if (passwordStrength === 0) return '#ccc';
    if (passwordStrength <= 2) return '#ff4d4d';
    if (passwordStrength === 3) return '#ffa500';
    return '#28a745';
  };

  // Get label for password strength
  const getStrengthLabel = () => {
    if (passwordStrength === 0) return '';
    if (passwordStrength <= 2) return 'Weak';
    if (passwordStrength === 3) return 'Medium';
    return 'Strong';
  };

  const validateField = (name, value) => {
    switch (name) {
      case 'name':
        return value ? '' : 'Name is required';
      case 'email':
        return /\S+@\S+\.\S+/.test(value) ? '' : 'Enter a valid email address';
      case 'phone':
        return /^[0-9]{10}$/.test(value) ? '' : 'Enter a valid 10-digit phone number';
      case 'address':
        return value ? '' : 'Address is required';
      case 'password':
        return value.length >= 8 ? '' : 'Password must be at least 8 characters';
      case 'confirmPassword':
        return value === formData.password ? '' : 'Passwords do not match';
      default:
        return '';
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    Object.keys(formData).forEach(field => {
      const error = validateField(field, formData[field]);
      if (error) {
        newErrors[field] = error;
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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
    setErrors({});
    setPasswordStrength(0);
    setFormSubmitted(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    
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
        alert('Sign up successful! Please log in.');
        resetFormData();
        navigate('/login');
      } else {
        setErrors({ general: data.message || 'Sign up failed.' });
      }
    } catch (err) {
      setErrors({ general: 'An error occurred while signing up. Please try again.' });
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-content">
        <div className="signup-welcome">
          <h1>Join Our Salon Community</h1>
          <p>Create an account to book appointments and enjoy exclusive services with our professional stylists.</p>
        </div>
        <div className="signup-form">
          <h2>Create Your Account</h2>
          
          {errors.general && (
            <div className="error-message general-error">
              <FaExclamationCircle /> {errors.general}
            </div>
          )}
          
          <form onSubmit={handleSubmit} noValidate>
            <div className={`input-group ${errors.name ? 'has-error' : ''}`}>
              <label htmlFor="name">
                <FaUser /> Full Name
              </label>
              <input 
                type="text" 
                id="name" 
                value={formData.name} 
                onChange={handleChange} 
                placeholder="Enter your full name" 
                className={formSubmitted && errors.name ? 'invalid' : ''}
              />
              {formSubmitted && errors.name && <div className="error-message">{errors.name}</div>}
            </div>
            
            <div className={`input-group ${errors.email ? 'has-error' : ''}`}>
              <label htmlFor="email">
                <FaEnvelope /> Email
              </label>
              <input 
                type="email" 
                id="email" 
                value={formData.email} 
                onChange={handleChange} 
                placeholder="Enter your email" 
                className={formSubmitted && errors.email ? 'invalid' : ''}
              />
              {formSubmitted && errors.email && <div className="error-message">{errors.email}</div>}
            </div>
            
            <div className={`input-group ${errors.phone ? 'has-error' : ''}`}>
              <label htmlFor="phone">
                <FaPhone /> Phone
              </label>
              <input 
                type="text" 
                id="phone" 
                value={formData.phone} 
                onChange={handleChange} 
                placeholder="Enter your phone number" 
                className={formSubmitted && errors.phone ? 'invalid' : ''}
              />
              {formSubmitted && errors.phone && <div className="error-message">{errors.phone}</div>}
            </div>
            
            <div className={`input-group ${errors.address ? 'has-error' : ''}`}>
              <label htmlFor="address">
                <FaMapMarkerAlt /> Address
              </label>
              <input 
                type="text" 
                id="address" 
                value={formData.address} 
                onChange={handleChange} 
                placeholder="Enter your address" 
                className={formSubmitted && errors.address ? 'invalid' : ''}
              />
              {formSubmitted && errors.address && <div className="error-message">{errors.address}</div>}
            </div>
            
            <div className={`input-group ${errors.password ? 'has-error' : ''}`}>
              <label htmlFor="password">
                <FaLock /> Password
              </label>
              <input 
                type="password" 
                id="password" 
                value={formData.password} 
                onChange={handleChange} 
                placeholder="Enter your password" 
                className={formSubmitted && errors.password ? 'invalid' : ''}
              />
              {formData.password && (
                <div className="password-strength">
                  <div className="strength-meter">
                    <div 
                      className="strength-meter-fill" 
                      style={{ 
                        width: `${passwordStrength * 25}%`,
                        backgroundColor: getStrengthColor()
                      }}
                    ></div>
                  </div>
                  <span style={{ color: getStrengthColor() }}>{getStrengthLabel()}</span>
                </div>
              )}
              {formSubmitted && errors.password && <div className="error-message">{errors.password}</div>}
            </div>
            
            <div className={`input-group ${errors.confirmPassword ? 'has-error' : ''}`}>
              <label htmlFor="confirmPassword">
                <FaLock /> Confirm Password
              </label>
              <input 
                type="password" 
                id="confirmPassword" 
                value={formData.confirmPassword} 
                onChange={handleChange} 
                placeholder="Confirm your password" 
                className={formSubmitted && errors.confirmPassword ? 'invalid' : ''}
              />
              {formSubmitted && errors.confirmPassword && <div className="error-message">{errors.confirmPassword}</div>}
            </div>
            
            <button type="submit" className="signup-btn">Create Account</button>
          </form>
          
          <div className="login-redirect">
            Already have an account? <a href="/login">Login</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
