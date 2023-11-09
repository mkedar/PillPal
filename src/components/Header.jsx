import React from "react";

export default function Header(){
  return(
    <div className="header">
      <a href="#" className="logo">PillPal</a>
      <div className="nav">
        <a href="#">About</a>
        <a href="#">Sign In</a>
      </div>
    </div>
  );
}