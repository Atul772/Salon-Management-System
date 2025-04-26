import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import { FaUser, FaSignOutAlt, FaTachometerAlt, FaUserCircle } from 'react-icons/fa';

const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userRole, setUserRole] = useState(null);
    const [userEmail, setUserEmail] = useState('');
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const profileMenuRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Check authentication status
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('userRole');
        const email = localStorage.getItem('userEmail');
        
        if (token) {
            setIsLoggedIn(true);
            setUserRole(role);
            setUserEmail(email || '');
        } else {
            setIsLoggedIn(false);
            setUserRole(null);
            setUserEmail('');
        }
    }, []);

    useEffect(() => {
        // Close the profile menu when clicking outside
        const handleClickOutside = (event) => {
            if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
                setShowProfileMenu(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleLogout = () => {
        // Clear authentication data
        localStorage.removeItem('token');
        localStorage.removeItem('userRole');
        localStorage.removeItem('userEmail');
        
        // Update state
        setIsLoggedIn(false);
        setUserRole(null);
        setUserEmail('');
        
        // Redirect to home
        navigate('/');
    };

    const handleDashboard = () => {
        if (userRole === 'employee') {
            navigate('/employeedashboard');
        } else {
            navigate('/dashboard');
        }
    };

    const handleServicesClick = (e) => {
        if (isLoggedIn) {
            e.preventDefault();
            navigate('/dashboard');
        }
    };

    const toggleProfileMenu = () => {
        setShowProfileMenu(!showProfileMenu);
    };

    return (
        <header className="header1">
            <div className="logo">
                <Link to="/">
                    <h1>Salon Management</h1>
                </Link>
            </div>
            <nav className="nav">
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li>
                        <Link to={isLoggedIn ? "/dashboard" : "/services"} onClick={handleServicesClick}>
                            Services
                        </Link>
                    </li>
                    <li><Link to="/aboutus">About Us</Link></li>
                    <li><Link to="/contactus">Contact</Link></li>
                </ul>
            </nav>
            <div className="auth-buttons">
                {isLoggedIn ? (
                    <div className="user-profile" ref={profileMenuRef}>
                        <div className="profile-trigger" onClick={toggleProfileMenu}>
                            <FaUserCircle className="user-icon" />
                            <span className="user-name">
                                {userEmail ? userEmail.split('@')[0] : 'User'}
                            </span>
                        </div>
                        {showProfileMenu && (
                            <div className="profile-dropdown">
                                <div className="dropdown-header">
                                    <FaUserCircle className="dropdown-icon large" />
                                    <div className="user-info">
                                        <p className="user-email">{userEmail}</p>
                                        <p className="user-role">{userRole === 'customer' ? 'Customer' : 'Employee'}</p>
                                    </div>
                                </div>
                                <div className="dropdown-divider"></div>
                                <ul className="dropdown-menu">
                                    <li onClick={handleDashboard}>
                                        <FaTachometerAlt className="dropdown-icon" />
                                        Dashboard
                                    </li>
                                    {userRole === 'customer' && (
                                        <li onClick={() => navigate('/profile')}>
                                            <FaUser className="dropdown-icon" />
                                            My Profile
                                        </li>
                                    )}
                                    <li onClick={handleLogout}>
                                        <FaSignOutAlt className="dropdown-icon" />
                                        Logout
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                ) : (
                    <>
                        <Link to="/login">
                            <button className="login-button">Login</button>
                        </Link>
                        <Link to="/signup">
                            <button className="signup-button">Sign Up</button>
                        </Link>
                    </>
                )}
            </div>
        </header>
    );
};

export default Header;
