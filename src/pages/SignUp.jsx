import React from 'react';
import { Link } from 'react-router-dom';
import './signUpIn.css'; // Import the CSS file

export default function SignUp() {
  return (
    <div className="signup-container">
      <h1 className='signUpTitle'>Sign Up</h1>
      <form className="signup-form">
        <input type="text" placeholder="Username" id="username" className="input-field"></input>
        <input type="email" placeholder="Email" id="email" className="input-field"></input>
        <input type="password" placeholder="Password" id="password" className="input-field"></input>
        <button className="signup-button">Sign Up</button>
      </form>
      <div className="signin-link-container">
        <p>Already have an account?</p>
        <Link to="/signin" className="signin-link">Sign In</Link>
      </div>
    </div>
  );
}
