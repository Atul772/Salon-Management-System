import React, { useState } from 'react';
import './Contactus.css';
import Footer from '../Footer/Footer';
import Header from '../../components/Header/Header';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaClock } from 'react-icons/fa';

const Contactus = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would send the form data to a server
    console.log('Form submitted:', formData);
    setSubmitStatus('success');
    
    // Reset form after submission
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    
    // Clear success message after 3 seconds
    setTimeout(() => {
      setSubmitStatus(null);
    }, 3000);
  };

  return (
    <div className="contactus-page">
      <Header />
      
      <div className="contact-banner">
        <div className="banner-content">
          <h1>Contact Us</h1>
          <p>We'd love to hear from you</p>
        </div>
      </div>
      
      <div className="contactus-container">
        <div className="contact-grid">
          <div className="contact-info-section">
            <h2>Get in Touch</h2>
            <p>Have questions about our services? Need to schedule an appointment? Our team is here to help. Reach out to us using any of the methods below.</p>
            
            <div className="contact-info-cards">
              <div className="contact-card">
                <div className="contact-icon">
                  <FaEnvelope />
                </div>
                <div className="contact-details">
                  <h3>Email Us</h3>
                  <p>support@salonmanagement.com</p>
                  <p>info@salonmanagement.com</p>
                </div>
              </div>
              
              <div className="contact-card">
                <div className="contact-icon">
                  <FaPhone />
                </div>
                <div className="contact-details">
                  <h3>Call Us</h3>
                  <p>+1 (123) 456-7890</p>
                  <p>+1 (123) 456-7891</p>
                </div>
              </div>
              
              <div className="contact-card">
                <div className="contact-icon">
                  <FaMapMarkerAlt />
                </div>
                <div className="contact-details">
                  <h3>Visit Us</h3>
                  <p>123 Beauty Street</p>
                  <p>Salon City, TX 75001</p>
                </div>
              </div>
              
              <div className="contact-card">
                <div className="contact-icon">
                  <FaClock />
                </div>
                <div className="contact-details">
                  <h3>Opening Hours</h3>
                  <p>Mon-Fri: 9:00 AM - 8:00 PM</p>
                  <p>Sat-Sun: 10:00 AM - 6:00 PM</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="contact-form-section">
            <div className="form-container">
              <h2>Send a Message</h2>
              {submitStatus === 'success' && (
                <div className="success-message">
                  Thank you for your message! We'll get back to you soon.
                </div>
              )}
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your full name" 
                    required 
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your email address" 
                    required 
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <input 
                    type="text" 
                    id="subject" 
                    name="subject" 
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="What is this regarding?" 
                    required 
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea 
                    id="message" 
                    name="message" 
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your message" 
                    rows="5" 
                    required 
                  />
                </div>
                
                <button type="submit" className="submit-btn">Send Message</button>
              </form>
            </div>
          </div>
        </div>
      </div>
      
      <div className="map-section">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d214588.19542893328!2d-96.87559475000001!3d32.82035235!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x864c19f77b45974b%3A0xb9ec9ba4f647678f!2sDallas%2C%20TX!5e0!3m2!1sen!2sus!4v1679502733640!5m2!1sen!2sus" 
          width="100%" 
          height="450" 
          style={{ border: 0 }} 
          allowFullScreen="" 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          title="Salon Location"
        />
      </div>
      
      <Footer />
    </div>
  );
};

export default Contactus;
