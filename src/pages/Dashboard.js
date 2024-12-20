const Dashboard = () => {
  return (
    <div className="dashboard">
      {/* Sidebar */}
      <nav className="sidebar">
        <div className="logo">
          <img src="path/to/logo.png" alt="Weather App" />
         
        </div>
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">Weather</a></li>
          <li><a href="#">Users</a></li>
          <li><a href="#">Community Hub</a></li>
          <li><a href="#">Logout</a></li>
        </ul>
      </nav>

      {/* Main Content */}
      <div className="main-content">
        <header className="dashboard-header">
          <h1>Dashboard</h1>
          <p>Dashboard &gt; Home</p>
        </header>

        {/* Dashboard Stats */}
        <div className="stats-cards">

        </div>

        {/* Table */}
        <div className="orders-section">

          
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
