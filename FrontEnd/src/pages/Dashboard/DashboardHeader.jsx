import React, { useState } from 'react';
import './DashboardHeader.css';
import { useNavigate } from 'react-router-dom'; // UseNavigate for navigation
import { FaHome, FaUser, FaSignOutAlt, FaCaretDown } from 'react-icons/fa'; // Import Home, User, SignOut, and CaretDown icons

const DashboardHeader = () => {
  const navigate = useNavigate(); // useNavigate hook for programmatic navigation
  const userRole = localStorage.getItem('userRole');
  const userEmail = localStorage.getItem('userEmail');
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    // Clear all localStorage items
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userEmail');
    
    // Redirect to the login page
    navigate('/login');
  };

  const handleProfile = () => {
    navigate('/profile'); // Navigate to the profile page
    setShowDropdown(false);
  };

  const handleHome = () => {
    navigate('/'); // Navigate to the home page
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <header className="dashboard-header">
      <div className="logo">
        <h1>Salon Management System</h1> {/* Logo or brand name */}
      </div>
      <div className="navigation-buttons">
        <button className="home-btn" onClick={handleHome}>
          <FaHome /> Home
        </button>
      </div>
      <div className="profile">
        {userEmail && (
          <div className="user-profile-menu">
            <div className="user-menu-trigger" onClick={toggleDropdown}>
              <span className="user-email">
                <FaUser /> {userRole === 'customer' ? 'Customer' : 'Employee'}
                <FaCaretDown />
              </span>
            </div>
            
            {showDropdown && (
              <div className="profile-dropdown">
                <div className="user-info">
                  <p>{userEmail}</p>
                  <p className="user-role">{userRole === 'customer' ? 'Customer Account' : 'Employee Account'}</p>
                </div>
                
                {userRole === 'customer' && (
                  <div className="menu-item" onClick={handleProfile}>
                    <FaUser /> My Profile
                  </div>
                )}
                
                <div className="menu-item" onClick={handleLogout}>
                  <FaSignOutAlt /> Logout
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default DashboardHeader;
