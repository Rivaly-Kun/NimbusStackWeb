import React from "react";

const Sidebar = ({ onMenuClick }) => {
  return (
<nav className="sidebar">
  <div className="logo">
  <img src="/images/logo.png" alt="Weather App Logo" />

  </div>
  <ul>
    <li><a href="#" onClick={() => onMenuClick("home")}><i className="fas fa-home"></i> Home</a></li>
    <li><a href="#" onClick={() => onMenuClick("weather")}><i className="fas fa-cloud-sun"></i> Weather</a></li>
    <li><a href="#" onClick={() => onMenuClick("users")}><i className="fas fa-users"></i> Users</a></li>
    <li><a href="#" onClick={() => onMenuClick("community")}><i className="fas fa-comments"></i> Community Hub</a></li>
    <li><a href="#" onClick={() => onMenuClick("logout")}><i className="fas fa-sign-out-alt"></i> Logout</a></li>
  </ul>
</nav>

  );
};

export default Sidebar;
