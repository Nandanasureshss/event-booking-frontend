import React, { useState } from "react";
import Topbar from "../../pages/Topbar/Topbar";
import AdminSidebar from "../../pages/AdminSidebar/AdminSidebar";
import "./ManageUsers.css";

import { FiFilter, FiRotateCw, FiTrendingUp } from "react-icons/fi";
import {
    FaUsers,
    FaUserCheck,
    FaUserTimes,
    FaBan,
    FaEnvelope,
} from "react-icons/fa";

const ManageUsers = () => {
    const [filters, setFilters] = useState({
        date: "",
        type: "",
        status: "",
    });

    const users = [
        {
            img: "/assets/gowtham.jpg",
            name: "Example",
            email: "example@mail.com",
            date: "Aug 05, 09:28",
            status: "Active",
        },
        {
            img: "/assets/gowtham.jpg",
            name: "Example",
            email: "example@mail.com",
            date: "Aug 05, 09:20",
            status: "Active",
        },
    ];

    const resetFilters = () => {
        setFilters({ date: "", type: "", status: "" });
    };

    return (
        <div className="adminEventsPage">
            <div className="adminEventsHeader">
                <Topbar />
            </div>

            <div className="adminEventsSidebar">
                <AdminSidebar />
            </div>

            <div className="adminEventsContainer">
                <div className="manageUsersContent">
                    {/* TITLE */}
                    <div className="manageUsersTitleRow">
                        <div className="userStatIconBox gradientUsers">
                            <FaUsers />
                        </div>
                        <h2>Manage Users</h2>
                        <span className="dateRange">Aug 01 - Aug 07</span>
                    </div>

                    {/* STAT CARDS */}
                    <div className="userStatsRow">
                        {/* TOTAL USERS */}
                        <div className="userStatCard">
                            <div className="userStatHeader">
                                <span className="userStatLabel">Total Users</span>
                                <div className="userStatIconBox gradientUsers">
                                    <FaUsers />
                                </div>
                            </div>

                            <div className="userStatMain">
                                <span className="userStatNumber">170,000</span>
                                <span className="userStatUnit">Users</span>
                            </div>

                            <p className="growth">
                                <FiTrendingUp className="growthIcon" />
                                18.5% compared to last month
                            </p>
                        </div>

                        {/* ACTIVE USERS */}
                        <div className="userStatCard">
                            <div className="userStatHeader">
                                <span className="userStatLabel">Active Users</span>
                                <div className="userStatIconBox gradientActive">
                                    <FaUserCheck />
                                </div>
                            </div>

                            <div className="userStatMain">
                                <span className="userStatNumber">140,000</span>
                                <span className="userStatUnit">Users</span>
                            </div>

                            <p className="growth">
                                <FiTrendingUp className="growthIcon" />
                                18.5% compared to last month
                            </p>
                        </div>

                        {/* INACTIVE USERS */}
                        <div className="userStatCard">
                            <div className="userStatHeader">
                                <span className="userStatLabel">Inactive Users</span>
                                <div className="userStatIconBox gradientInactive">
                                    <FaUserTimes />
                                </div>
                            </div>

                            <div className="userStatMain">
                                <span className="userStatNumber">20,000</span>
                                <span className="userStatUnit">Users</span>
                            </div>

                            <p className="growth">
                                <FiTrendingUp className="growthIcon" />
                                18.5% compared to last month
                            </p>
                        </div>
                    </div>

                    <div className="userFilterRow">

                        {/* FILTER BY - SEPARATE */}
                        <button className="filterByBtn">
                            <FiFilter /> Filter By
                        </button>

                        {/* JOINED PILL */}
                        <div className="joinedFilterGroup">
                            <select value={filters.date} onChange={(e) => setFilters({ ...filters, date: e.target.value })}>
                                <option value="">14 Feb 2019</option>
                            </select>

                            <select value={filters.type} onChange={(e) => setFilters({ ...filters, type: e.target.value })}>
                                <option value="">Types of User</option>
                                <option value="active">Active Users</option>
                                <option value="blocked">Blocked Users</option>
                            </select>

                            <select value={filters.status} onChange={(e) => setFilters({ ...filters, status: e.target.value })}>
                                <option value="">Status</option>
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>
                        </div>

                        {/* RESET FILTER - SEPARATE */}
                        <button className="resetFilterBtn" onClick={resetFilters}>
                            <FiRotateCw /> Reset Filter
                        </button>

                    </div>

                    {/* USERS TABLE */}
                    <div className="manageUsersTableWrapper">
                        <table className="manageUsersTable">
                            <thead>
                                <tr>
                                    <th>User</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Date and Time</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {users.map((u, i) => (
                                    <tr key={i}>
                                        <td>
                                            <img src={u.img} className="userImg" alt="user" />
                                        </td>
                                        <td>{u.name}</td>
                                        <td>{u.email}</td>
                                        <td>{u.date}</td>
                                        <td className="statusCol">{u.status}</td>
                                        <td className="actionsCol">
                                            <button className="blockBtn">
                                                <FaBan /> Block User
                                            </button>
                                            <button className="mailBtn">
                                                <FaEnvelope /> Send Mail
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ManageUsers;
