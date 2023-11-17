// Header.jsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import HamburgerMenu from './HamburgerMenu';
import './Components.css';
import { useSelector } from 'react-redux';

// ... (previous imports)

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

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
  }, [isMenuOpen]);

  return (
    <div className="header">
      <Link to="/" className="logo">
        Capsula
      </Link>

      <HamburgerMenu isOpen={isMenuOpen} onClick={toggleMenu} onLinkClick={closeMenu} currentUser={currentUser} />

      <div className={`nav ${isMenuOpen ? 'open' : ''}`}>
        <Link to="/" onClick={closeMenu}>
          Home
        </Link>
        <Link to="/about" onClick={closeMenu}>
          About
        </Link>
        {currentUser ? (
            <Link to="/profile" onClick={closeMenu}>
              My profile
            </Link>
        ) : (
          // If user is not logged in, show "Sign In" link in the hamburger menu
          <Link to="/signin" onClick={closeMenu}>
            Sign In
          </Link>
        )}
      </div>

      {/* Additional content outside the hamburger menu (profile image) */}
      {currentUser && (
        <div className="profile-link outside-hamburger">
          <Link to="/profile">
            <img className="profileImage" src={currentUser.avatar} alt="profile" />
          </Link>
        </div>
      )}
    </div>
  );
}
