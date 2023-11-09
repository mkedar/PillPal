// HamburgerMenu.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import './Components.css';

const HamburgerMenu = ({ isOpen, onClick }) => (
  <div className={`hamburger ${isOpen ? 'open' : ''}`} onClick={onClick}>
    <div></div>
    <div></div>
    <div></div>

    {isOpen && (
      <div className="nav">
        <Link to="/" onClick={onClick}>Home</Link>
        <Link to="/about" onClick={onClick}>About</Link>
        <Link to="/signin" onClick={onClick}>Sign In</Link>
        <Link to="/profile" onClick={onClick}>Profile</Link>
      </div>
    )}
  </div>
);

export default HamburgerMenu;
