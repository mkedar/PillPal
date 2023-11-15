// SignIn.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import './signUpIn.css'; // Reuse the CSS file

export default function SignIn() {
  return (
    <div className="signup-container">
      <h1>Sign In</h1>
      <div className="signin-link-container">
        <p>New to PillPal?</p>
        <Link to="/signup" className="signin-link">Sign Up</Link>
      </div>
    </div>
  );
}
