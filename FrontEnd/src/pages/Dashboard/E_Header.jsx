import React from 'react';
import './DashboardHeader.css';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle, FaSignOutAlt, FaHome, FaCalendarAlt, FaChartBar } from 'react-icons/fa';

const E_Header = () => {
  const navigate = useNavigate();
  const userEmail = localStorage.getItem('userEmail');

  const handleLogout = () => {
    // Clear all localStorage items
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userEmail');
    
    // Redirect to the login page
    navigate('/login');
  };

  const handleNavigateHome = () => {
    navigate('/');
  };

  return (
    <header className="dashboard-header">
      <div className="logo">
        <h1>Salon Management System</h1>
      </div>
      
      <div className="nav-links">
        <button className="nav-button" onClick={handleNavigateHome}>
          <FaHome /> Home
        </button>
        
        <button className="nav-button" onClick={() => navigate('/employeedashboard')}>
          <FaChartBar /> Dashboard
        </button>
      </div>
      
      <div className="profile">
        {userEmail && (
          <div className="user-profile">
            <FaUserCircle className="user-icon" />
            <span className="user-email">
              {userEmail}
            </span>
          </div>
        )}
        <button className="logout-btn" onClick={handleLogout}>
          <FaSignOutAlt /> Logout
        </button>
      </div>
    </header>
  );
};

export default E_Header;
