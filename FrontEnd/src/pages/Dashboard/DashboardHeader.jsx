import React from 'react';
import './DashboardHeader.css';
import { useNavigate } from 'react-router-dom'; // UseNavigate for navigation

const DashboardHeader = () => {
  const navigate = useNavigate(); // useNavigate hook for programmatic navigation

  const handleLogout = () => {
    // Add logic to clear user session or token (e.g., localStorage.clear(), etc.)
    navigate('/login'); // Redirect to the login page after logging out
  };

  const handleProfile = () => {
    navigate('/profile'); // Navigate to the profile page
  };

  return (
    <header className="dashboard-header">
      <div className="logo">
        <h1>Salon Management System</h1> {/* Logo or brand name */}
      </div>
      <div className="profile">
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
        <span className="profile-icon" onClick={handleProfile}>
          My Profile
        </span>
      </div>
    </header>
  );
};

export default DashboardHeader;
