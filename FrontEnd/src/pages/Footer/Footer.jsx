import React from 'react';
import './footer.css';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube, FaTelegram, FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from 'react-icons/fa';

const Footer = () => {
    const currentYear = new Date().getFullYear();
    
    return (
        <footer className="footer-container">
            <div className="footer-content">
                <div className="footer-section about">
                    <h3>Salon Management System</h3>
                    <p>Providing quality beauty and wellness services since 2005. Our mission is to help you look and feel your best.</p>
                    <div className="contact-info">
                        <p><FaMapMarkerAlt /> 123 Beauty Street, Salon City, TX 75001</p>
                        <p><FaPhone /> +1 (123) 456-7890</p>
                        <p><FaEnvelope /> info@salonmanagement.com</p>
                        <p><FaClock /> Mon-Fri: 9:00 AM - 8:00 PM, Sat-Sun: 10:00 AM - 6:00 PM</p>
                    </div>
                </div>
                
                <div className="footer-section links">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/services">Services</Link></li>
                        <li><Link to="/aboutus">About Us</Link></li>
                        <li><Link to="/contactus">Contact</Link></li>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/signup">Sign Up</Link></li>
                    </ul>
                </div>
                
                <div className="footer-section services">
                    <h3>Our Services</h3>
                    <ul>
                        <li>Haircuts & Styling</li>
                        <li>Hair Coloring</li>
                        <li>Facial Treatments</li>
                        <li>Body Massage</li>
                        <li>Waxing Services</li>
                        <li>Beard Grooming</li>
                    </ul>
                </div>
                
                <div className="footer-section newsletter">
                    <h3>Subscribe to Our Newsletter</h3>
                    <p>Stay updated with our latest offers and services.</p>
                    <form className="newsletter-form">
                        <input type="email" placeholder="Your Email" required />
                        <button type="submit">Subscribe</button>
                    </form>
                    <div className="social-links">
                        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                            <FaFacebookF />
                        </a>
                        <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                            <FaTwitter />
                        </a>
                        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                            <FaInstagram />
                        </a>
                        <a href="https://www.linkedin.com/in/atul-kumar-6b45652b5/" target="_blank" rel="noopener noreferrer">
                            <FaLinkedinIn />
                        </a>
                        <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
                            <FaYoutube />
                        </a>
                        <a href="https://www.telegram.com" target="_blank" rel="noopener noreferrer">
                            <FaTelegram />
                        </a>
                    </div>
                </div>
            </div>
            
            <div className="footer-bottom">
                <p>&copy; {currentYear} Salon Management System. All Rights Reserved.</p>
                <div className="footer-legal">
                    <a href="#">Privacy Policy</a>
                    <a href="#">Terms of Service</a>
                    <a href="#">Cookie Policy</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
