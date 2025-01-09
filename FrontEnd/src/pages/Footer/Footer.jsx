import React from 'react';
import './footer.css'; // Assuming you have a separate CSS file for styling

const Footer = () => {
    return (
        <footer className="footer">
            <div className="social-links">
                <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                <i className="fa-brands fa-linkedin"></i> LinkedIn
                </a>
                <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
                <i className="fa-brands fa-youtube"></i> YouTube
                </a>
                <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
                <i className="fa-brands fa-telegram"></i> Telegram
                </a>
            </div>
            <h4>© 2024 Salon Management System. All Rights Reserved.</h4>
        </footer>
    );
}

export default Footer;
