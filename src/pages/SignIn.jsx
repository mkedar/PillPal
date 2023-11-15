import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './signUpIn.css'; // Import the CSS file
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess , signInFailure } from '../redux/user/userSlice.js';


export default function SignIn() {
  const [formData, setFormData] = useState({});
  const {loading, error} = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if(data.success === false){
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data))
      navigate('/');
    }catch (error){
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className="signup-container">
      <h1 className='signUpTitle'>Sign In</h1>
      <form onSubmit={handleSubmit} className="signup-form">
        <input type="email" placeholder="Email" id="email" className="input-field" onChange={handleChange} ></input>
        <input type="password" placeholder="Password" id="password" className="input-field" onChange={handleChange} ></input>
        <button disabled={loading} className="signup-button">{ loading ? "Loading ..." : "Sign In"}</button>
      </form>
      <div className="signin-link-container">
        <p>Dont have an account?</p>
        <Link to="/signup" className="signin-link">Sign Up</Link>
      </div>
      {error && <p>{error}</p>}
    </div>
  );
}
