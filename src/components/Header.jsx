import React from "react";
import { Link } from "react-router-dom";

export default function Header(){
  return (
    <div className="header">
      <Link to="/" className="logo">
        PillPal
      </Link>
      <div className="nav">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/signin">Sign In</Link>
      </div>
    </div>
  );
}