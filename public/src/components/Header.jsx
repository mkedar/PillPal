// Header.jsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import HamburgerMenu from './HamburgerMenu';
import './Components.css';



export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };


  // Define styles for the space around the iPhone camera


  useEffect(() => {
    closeMenu(); // Close the menu when the location changes
  }, [location]);

  const handleResize = () => {
    if (isMenuOpen && window.innerWidth > 767) {
      closeMenu();
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  return (
    <div className="header">
      <Link to="/" className="logo">Capsula</Link>
      <HamburgerMenu isOpen={isMenuOpen} onClick={toggleMenu} onLinkClick={closeMenu} />
      <div className={`nav ${isMenuOpen ? 'open' : ''}`}>
        <Link to="/" onClick={closeMenu}>Home</Link>
        <Link to="/about" onClick={closeMenu}>About</Link>
        <Link to="/signin" onClick={closeMenu}>Sign In</Link>
        <Link to="/profile" onClick={closeMenu}>Profile</Link>
      </div>
    </div>
  );
}