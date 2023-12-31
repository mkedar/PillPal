import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './signUpIn.css'; // Import the CSS file

export default function DoctorSignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState (false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(
      {
        ...formData,
        [e.target.id]: e.target.value,
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      setLoading(true);
      const res = await fetch('/api/auth/signupDoctor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if(data.success === false){
        setError(data.message);
        setLoading(false);
        return;
      }
      setLoading(false);
      setError(null);
      navigate('/signin');
    }catch (error){
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <div className="signup-container">
      <h1 className='signUpTitle'>Medical Professional Sign Up Page</h1>
      <form onSubmit={handleSubmit} className="signup-form">
        <input type="text" placeholder="Name" id="username"  className="input-field" onChange={handleChange}></input>
        <input type="email" placeholder="Email" id="email" className="input-field" onChange={handleChange} ></input>
        <input type="password" placeholder="Password" id="password" className="input-field" onChange={handleChange} ></input>
        <input type="hospitalID" placeholder="Hospital ID" id="hospitalID" className="input-field" onChange={handleChange} ></input>
        <button disabled={loading} className="signup-button">{ loading ? "Loading ..." : "Sign Up"}</button>
      </form>
      <div className="signin-link-container">
        <p>Already have an account?</p>
        <Link to="/signin" className="signin-link">Sign In</Link>
      </div> 
      {error && <p className='error'>{error}</p>}
    </div>
  );
}
