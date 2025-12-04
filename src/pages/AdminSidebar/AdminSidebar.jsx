import React from "react";
import "./AdminSidebar.css";
import { FaHome, FaTicketAlt, FaHotel, FaUsers, FaChartBar, FaWallet } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";

function AdminSidebar() {
  const navigate = useNavigate();
  const location = useLocation(); // get current URL

  return (
    <aside className="adminSidebar">
      <ul className="adminSidebarMenu">

        <li
          className={location.pathname === "/adminlandingpage" ? "active" : ""}
          onClick={() => navigate("/adminlandingpage")}
        >
          <FaHome /> Dashboard
        </li>

        <li
          className={location.pathname === "/admin/events" ? "active" : ""}
          onClick={() => navigate("/admin/events")}
        >
          <FaTicketAlt /> Events
        </li>

        <li
          className={location.pathname === "/admin/hotels" ? "active" : ""}
          onClick={() => navigate("/admin/hotels")}
        >
          <FaHotel /> Hotels
        </li>

        <li
          className={location.pathname === "/admin/tracksales" ? "active" : ""}
          onClick={() => navigate("/admin/tracksales")}
        >
          <FaChartBar /> Track Sales
        </li>

        <li
          className={location.pathname === "/admin/users" ? "active" : ""}
          onClick={() => navigate("/admin/users")}
        >
          <FaUsers /> Manage Users
        </li>

        <li
          className={location.pathname === "/admin/payments" ? "active" : ""}
          onClick={() => navigate("/admin/payments")}
        >
          <FaWallet /> Payments
        </li>

      </ul>
    </aside>
  );
}

export default AdminSidebar;
