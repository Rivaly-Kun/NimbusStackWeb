import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/sidebar.js";
import Home from "../sub_pages/home.js";
import Weather from "../sub_pages/weather.js";
import Users from "../sub_pages/reports.js";
import Community from "../sub_pages/community.js";

const Dashboard = () => {
  const [activeContent, setActiveContent] = useState("home");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const navigate = useNavigate();

  // Handle navigation for "logout"
  useEffect(() => {
    if (activeContent === "logout") {
      navigate("/");
    }
  }, [activeContent, navigate]);

  const renderContent = () => {
    switch (activeContent) {
      case "home":
        return <Home />;
      case "weather":
        return <Weather />;
      case "users":
        return <Users />;
      case "community":
        return <Community />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <Sidebar
        onMenuClick={setActiveContent}
        isCollapsed={isSidebarCollapsed}
        toggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />

      {/* Main Content */}
      <div className={`main-content ${isSidebarCollapsed ? "collapsed" : ""}`}>
        <header className="dashboard-header">
          <h1>Dashboard</h1>
          <p>
            Dashboard &gt;{" "}
            {activeContent.charAt(0).toUpperCase() + activeContent.slice(1)}
          </p>
        </header>

        {/* Render Active Content */}
        <div className="content-area">{renderContent()}</div>
      </div>
    </div>
  );
};

export default Dashboard;
