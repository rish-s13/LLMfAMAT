import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);

  const handleLogout = () => {
    // Remove token from localStorage (assuming token is stored there)
    localStorage.removeItem('token');

    // Display logout popup
    setShowLogoutPopup(true);

    // Timeout to navigate after logout confirmation
    setTimeout(() => {
      navigate('/login');
    }, 2000); // 2 seconds delay
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  // Reset dropdown when screen size changes
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setShowDropdown(false); // Collapse dropdown on larger screens
      }
    };

    window.addEventListener('resize', handleResize);

    // Cleanup on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    
    <nav className="Navbar">
      <div className="Navbar-container">
        <Link to="/" className="Navbar-logo-link">Logo</Link>
        <button className="Navbar-dropdown-button" onClick={toggleDropdown}>
          &#9776; {/* Hamburger icon */}
        </button>
        <div className={`Navbar-links ${showDropdown ? 'show' : ''}`}>
          <Link to="/" className="Navbar-link">Home</Link>
          <Link to="/search" className="Navbar-link">Search</Link>
          <Link to='/about' className="Navbar-link">About</Link>
          <a href="#" onClick={handleLogout} className="Navbar-logout-link">Logout</a>
        </div>
      </div>
      {showLogoutPopup && (
        <div className="logout-popup">
          <p>Logging out...</p>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
