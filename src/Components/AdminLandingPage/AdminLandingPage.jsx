import React from "react";
import "./AdminLandingPage.css";

function AdminLandingPage() {
  return (
    <div className="adminLandingPage">
      
      {/* Sidebar */}
      <aside className="adminLandingPageSidebar">
        <h3 className="adminLandingPageLogo">Dashboard</h3>
        <ul className="adminLandingPageMenu">
          <li>Dashboard</li>
          <li>Events</li>
          <li>Hotels</li>
          <li>Track Sales</li>
          <li>Manage Users</li>
          <li>Payments</li>
        </ul>
      </aside>

      {/* Main Content */}
      <div className="adminLandingPageContent">

        {/* Topbar */}
        <div className="adminLandingPageTopbar">
          <input type="text" placeholder="Search..." />
          <div className="adminLandingPageUser">
            <img src="https://via.placeholder.com/35" alt="user" />
            <span>Admin</span>
          </div>
        </div>

        {/* Dashboard Title */}
        <h2 className="adminLandingPageTitle">Dashboard</h2>

        {/* Cards */}
        <div className="adminLandingPageCards">
          <div className="adminLandingPageCard adminLandingPageGradient1">
            <p className="cardTitle">Tickets Sold</p>
            <h3 className="cardValue">12,354</h3>
          </div>

          <div className="adminLandingPageCard adminLandingPageGradient2">
            <p className="cardTitle">Revenue</p>
            <h3 className="cardValue">$40,500.00</h3>
          </div>

          <div className="adminLandingPageCard adminLandingPageGradient3">
            <p className="cardTitle">Today's Sale</p>
            <h3 className="cardValue">12,354</h3>
          </div>
        </div>

        {/* Charts and Table */}
        <div className="adminLandingPageMainGrid">

          <div className="adminLandingPageBox">Monthly Sales Chart</div>
          <div className="adminLandingPageBox">Total Tickets Chart</div>
          <div className="adminLandingPageBox">Recent Tickets</div>

        </div>

      </div>
    </div>
  );
}

export default AdminLandingPage;
