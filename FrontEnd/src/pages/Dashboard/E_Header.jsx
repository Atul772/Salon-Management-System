import React from 'react';
import './DashboardHeader.css'
import { useNavigate } from 'react-router-dom';

const E_Header = () => {

    const navigate = useNavigate(); // useNavigate hook for programmatic navigation

  const handleLogout = () => {
    // Add logic to clear user session or token (e.g., localStorage.clear(), etc.)
    navigate('/login'); // Redirect to the login page after logging out
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
      </div>
    </header>
  )
}

export default E_Header
