import React from 'react';
import { Link } from 'react-router-dom'; // Make sure to import Link
import './Header.css';

const Header = () => {
    return (
        <header className="header1">
            {/* <div className="logo">
                <h1>Salon Management System</h1>
            </div> */}
            <nav className="nav">
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/services">Services</Link></li>
                    <li><Link to="/aboutus">About Us</Link></li>
                    <li><Link to="/contactus">Contact</Link></li>
                </ul>
            </nav>
            <div className="auth-buttons">
            <Link to="/login">
                        <button className="login-button">Login</button>
                    </Link>
                    <Link to="/signup">
                        <button className="signup-button">Sign Up</button>
                    </Link>
            </div>
        </header>
    );
};

export default Header;
