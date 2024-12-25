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
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M4 19v-9q0-.475.213-.9t.587-.7l6-4.5q.525-.4 1.2-.4t1.2.4l6 4.5q.375.275.588.7T20 10v9q0 .825-.588 1.413T18 21h-3q-.425 0-.712-.288T14 20v-5q0-.425-.288-.712T13 14h-2q-.425 0-.712.288T10 15v5q0 .425-.288.713T9 21H6q-.825 0-1.412-.587T4 19"/></svg>
      <i className="fas fa-home"></i> <span>Home</span>
    </a>
  </li>
  <li>
    <a href="#" onClick={() => onMenuClick("weather")}>
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12.5 23q-.625 0-1.062-.425T11 21.525q0-.3.113-.575t.337-.475l.7-.65q.15-.125.35-.125t.35.125l.7.65q.225.2.337.475t.113.575q0 .625-.437 1.05T12.5 23m-3.975-2.025Q8.3 20.75 8.3 20.45t.225-.525l1.9-1.9q.225-.225.525-.225t.525.225t.225.525t-.225.525l-1.9 1.9q-.225.225-.525.225t-.525-.225m6.625-1.325l-.8-.8q-.15-.15-.15-.35t.15-.35l.8-.8q.15-.15.35-.15t.35.15l.8.8q.15.15.15.35t-.15.35l-.8.8q-.15.15-.35.15t-.35-.15m-7.5-.8l-.8.8q-.15.15-.35.15t-.35-.15l-.8-.8q-.15-.15-.15-.35t.15-.35l.8-.8q.15-.15.35-.15t.35.15l.8.8q.15.15.15.35t-.15.35M7.5 16q-2.275 0-3.888-1.612T2 10.5q0-2.075 1.375-3.625t3.4-1.825q.8-1.425 2.188-2.238T12 2q2.25 0 3.913 1.438t2.012 3.587q1.725.15 2.9 1.425T22 11.5q0 1.875-1.312 3.188T17.5 16z"/></svg>
      <i className="fas fa-cloud-sun"></i> <span>Weather</span>
    </a>
  </li>
  <li>
    <a href="#" onClick={() => onMenuClick("users")}>
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 17q.425 0 .713-.288T13 16t-.288-.712T12 15t-.712.288T11 16t.288.713T12 17m0-4q.425 0 .713-.288T13 12V8q0-.425-.288-.712T12 7t-.712.288T11 8v4q0 .425.288.713T12 13m-2.925 8q-.4 0-.762-.15t-.638-.425l-4.1-4.1q-.275-.275-.425-.638T3 14.926v-5.85q0-.4.15-.762t.425-.638l4.1-4.1q.275-.275.638-.425T9.075 3h5.85q.4 0 .763.15t.637.425l4.1 4.1q.275.275.425.638t.15.762v5.85q0 .4-.15.763t-.425.637l-4.1 4.1q-.275.275-.638.425t-.762.15z"/></svg>
      <i className="fas fa-users"></i> <span>Reports</span>
    </a>
  </li>
  <li>
    <a href="#" onClick={() => onMenuClick("community")}>
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 12 12"><path fill="currentColor" d="M4.25 3.25a1.75 1.75 0 1 1 3.5 0a1.75 1.75 0 0 1-3.5 0m-2 2.25a1.25 1.25 0 1 0 0-2.5a1.25 1.25 0 0 0 0 2.5M11 4.25a1.25 1.25 0 1 1-2.5 0a1.25 1.25 0 0 1 2.5 0M5.25 6C4.56 6 4 6.56 4 7.25V8.5a2 2 0 1 0 4 0V7.25C8 6.56 7.44 6 6.75 6zM3 7.25c0-.289.054-.565.154-.818l-1.231.33a1.25 1.25 0 0 0-.884 1.53l.194.725a2 2 0 0 0 2.45 1.414l.017-.005A3 3 0 0 1 3 8.5zM9 8.5c0 .733-.263 1.405-.7 1.927l.016.004a2 2 0 0 0 2.449-1.414l.194-.725a1.25 1.25 0 0 0-.884-1.53l-1.228-.33c.099.254.153.53.153.818z"/></svg>
      <i className="fas fa-comments"></i> <span>Community Hub</span>
    </a>
  </li>
  <li>
    <a
      href="#"
      onClick={() => onMenuClick("logout")}
      className="logout"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h6q.425 0 .713.288T12 4t-.288.713T11 5H5v14h6q.425 0 .713.288T12 20t-.288.713T11 21zm12.175-8H10q-.425 0-.712-.288T9 12t.288-.712T10 11h7.175L15.3 9.125q-.275-.275-.275-.675t.275-.7t.7-.313t.725.288L20.3 11.3q.3.3.3.7t-.3.7l-3.575 3.575q-.3.3-.712.288t-.713-.313q-.275-.3-.262-.712t.287-.688z"/></svg>
      <i className="fas fa-sign-out-alt"></i> <span>Logout</span>
    </a>
  </li>
</ul>

    </nav>
  );
};

export default Sidebar;
