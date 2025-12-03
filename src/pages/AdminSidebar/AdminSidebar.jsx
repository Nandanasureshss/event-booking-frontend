import React from "react";
import "./AdminSidebar.css";
import { FaHome, FaTicketAlt, FaHotel, FaUsers, FaChartBar, FaWallet } from "react-icons/fa";

function AdminSidebar() {
  return (
    <aside className="adminSidebar">
    

      <ul className="adminSidebarMenu">
        <li className="active"><FaHome /> Dashboard</li>
        <li><FaTicketAlt /> Events</li>
        <li><FaHotel /> Hotels</li>
        <li><FaChartBar /> Track Sales</li>
        <li><FaUsers /> Manage Users</li>
        <li><FaWallet /> Payments</li>
      </ul>
    </aside>
  );
}

export default AdminSidebar;
