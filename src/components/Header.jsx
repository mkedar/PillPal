// Header.jsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import HamburgerMenu from './HamburgerMenu';
import './Components.css';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="header">
      <Link to="/" className="logo">PillPal</Link>

      <HamburgerMenu isOpen={isMenuOpen} onClick={toggleMenu} />

      <div className={`nav ${isMenuOpen ? 'open' : ''}`}>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/signin">Sign In</Link>
        <Link to="/profile">Profile</Link>
      </div>
    </div>
  );
}
