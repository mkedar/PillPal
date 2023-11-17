// Footer.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import './Components.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-links">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
        </div>
        <div className="social-icons">
          <a href="https://github.com/mkedar/PillPal" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="https://github.com/mkedar/PillPal" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-linkedin"></i>
          </a>
          <a href="https://github.com/mkedar/PillPal" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="https://github.com/mkedar/PillPal" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-facebook"></i>
          </a>
        </div>
      </div>
      <p>&copy; 2023 PillPall. All rights reserved.</p>
    </footer>
  );
}
