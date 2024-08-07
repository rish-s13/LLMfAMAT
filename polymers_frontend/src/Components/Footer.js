// Footer.js
import React from 'react';
import { useLocation } from 'react-router-dom';
import './Footer.css'; // Assuming you have a CSS file for styling

const Footer = () => {
  const location = useLocation();
  const hideFooterPaths = ['/login', '/signup']; // Paths to hide the footer

  // Check if the current path should hide the footer
  if (hideFooterPaths.includes(location.pathname)) {
    return null; // Do not render the footer
  }

  return (
    <footer className="Footer">
      <p>&copy; 2024 LLM For Advanced Materials. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
