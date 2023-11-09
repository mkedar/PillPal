// HamburgerMenu.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import './Components.css';

const HamburgerMenu = ({ isOpen, onClick, onLinkClick }) => (
  <div className={`hamburger ${isOpen ? 'open' : ''}`} onClick={onClick}>
    <div></div>
    <div></div>
    <div></div>

    {isOpen && (
      <div className="nav">
        <Link to="/" onClick={() => { onLinkClick(); onClick(); }}>Home</Link>
        <Link to="/about" onClick={() => { onLinkClick(); onClick(); }}>About</Link>
        <Link to="/signin" onClick={() => { onLinkClick(); onClick(); }}>Sign In</Link>
        <Link to="/profile" onClick={() => { onLinkClick(); onClick(); }}>Profile</Link>
      </div>
    )}
  </div>
);

export default HamburgerMenu;
