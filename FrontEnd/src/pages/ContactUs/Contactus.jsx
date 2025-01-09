import React from 'react';
import './Contactus.css';
import Footer from '../Footer/Footer';
import Header from '../../components/Header/Header';
const Contactus = () => {
  return (
   <div>
    <Header />
    <div className="contactus-container">
      
      <h1>Contact Us</h1>
      <p>If you have any questions, feedback, or would like to reach out to us, feel free to contact us through any of the methods below:</p>
      
      <div className="contact-feed">
        <div className="contact-info">
          <div className="contact-item">
            <h3>Email:</h3>
            <p>support@salonmanagement.com</p>
          </div>

          <div className="contact-item">
            <h3>Phone:</h3>
            <p>+1 123 456 7890</p>
          </div>

          <div className="contact-item">
            <h3>Address:</h3>
            <p>123 Beauty Street, Salon City, TX 75001</p>
          </div>
        </div>

        <div className="contact-form">
          <h2>Get In Touch</h2>
          <form>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" placeholder="Your Name" required />

            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" placeholder="Your Email" required />

            <label htmlFor="message">Message:</label>
            <textarea id="message" name="message" placeholder="Your Message" rows="5" required style={{margin:'0px'}}></textarea>

            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
    <Footer/>
    </div>
  );
};

export default Contactus;
