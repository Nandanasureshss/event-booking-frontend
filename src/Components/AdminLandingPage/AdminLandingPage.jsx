import React from "react";
import "./AdminLandingPage.css";

import Topbar from "../../pages/Topbar/Topbar";
import AdminSidebar from "../../pages/AdminSidebar/AdminSidebar";

import DashboardCards from "../AdminLandingPage/DashboardCards";
import MonthlySalesChart from "../AdminLandingPage/MonthlySalesChart";
import TotalTicketsChart from "../AdminLandingPage/TotalTicketsChart";
import RecentTicketsTable from "../AdminLandingPage/RecentTicketsTable";
function AdminLandingPage() {
  return (
    <div className="adminLandingPage">

      <AdminSidebar />

      <Topbar />   

      <div className="adminLandingPageContent">

        <h2 className="adminLandingPageTitle">Dashboard</h2>

        <div className="whiteBox">
          <DashboardCards />
        </div>

        <div className="whiteBox">
          <div className="chartContainer">
            <MonthlySalesChart />
            <TotalTicketsChart />
          </div>
        </div>

        <div className="whiteBox">
          <RecentTicketsTable />
        </div>

      </div>
    </div>
  );
}

export default AdminLandingPage;
