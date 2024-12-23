import React from "react";

const Sidebar = ({ onMenuClick, isCollapsed, toggleSidebar }) => {
  return (
    <nav className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
      {/* Toggle Button */}
      <button className="toggle-sidebar" onClick={toggleSidebar}>
        {isCollapsed ? "➤" : "◄"} {/* Adjust arrow direction */}
      </button>

      {/* Logo */}
      <div className="logo">
        <img src="/images/logo.png" alt="Weather App Logo" />
      </div>

      {/* Navigation Links */}
      <ul>
        <li>
          <a href="#" onClick={() => onMenuClick("home")}>
            <i className="fas fa-home"></i> <span>Home</span>
          </a>
        </li>
        <li>
          <a href="#" onClick={() => onMenuClick("weather")}>
            <i className="fas fa-cloud-sun"></i> <span>Weather</span>
          </a>
        </li>
        <li>
          <a href="#" onClick={() => onMenuClick("users")}>
            <i className="fas fa-users"></i> <span>Users</span>
          </a>
        </li>
        <li>
          <a href="#" onClick={() => onMenuClick("community")}>
            <i className="fas fa-comments"></i> <span>Community Hub</span>
          </a>
        </li>
        <li>
          <a href="#" onClick={() => onMenuClick("logout")}>
            <i className="fas fa-sign-out-alt"></i> <span>Logout</span>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
