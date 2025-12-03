import React from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    PieChart,
    Pie,
    Cell,
    BarChart,
    Bar,
    ResponsiveContainer,
} from "recharts";
import { FiTrendingUp } from "react-icons/fi";
import "./TrackSales.css";
import { FiSearch } from "react-icons/fi";
import { IoMdMail } from "react-icons/io";
import { IoNotificationsOutline } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import AdminSidebar from "../../pages/AdminSidebar/AdminSidebar";
import Topbar from "../../pages/Topbar/Topbar";

const lineData = [
    { name: "1", value: 5000 },
    { name: "2", value: 7000 },
    { name: "3", value: 15000 },
    { name: "4", value: 12000 },
    { name: "5", value: 18000 },
    { name: "6", value: 64000 },
    { name: "7", value: 11000 },
    { name: "8", value: 21000 },
    { name: "9", value: 7000 },
    { name: "10", value: 35000 },
    { name: "11", value: 25000 },
    { name: "12", value: 15000 },
    { name: "13", value: 22000 },
];


const pieData = [
    { name: "VIP Tickets", value: 40, color: "#ffba08" },
    { name: "Regular Tickets", value: 30, color: "#3c6ff7" },
    { name: "Tickets", value: 30, color: "#ef476f" },
];

const barData = [
    { name: "Event name", value: 100 },
    { name: "Event name", value: 80 },
    { name: "Event name", value: 120 },
    { name: "Event name", value: 70 },
    { name: "Event name", value: 95 },
];

function TrackSales() {
    return (
        <div className="trackSalesPage">
            <AdminSidebar />
<Topbar/>

            {/* ONLY CONTENT SHIFTED RIGHT */}
            <div className="tsContent">

                <div className="tsPageHeader">
                    <div className="tsPageTitle">
                        <img src="/assets/bar-chart.png" alt="chart icon" className="tsPageIconImg" />
                        <h2>Track Sales</h2>
                    </div>

                    <div className="tsDateRange">Aug 01 - Aug 07</div>
                </div>

                <div className="tsMainGrid">


                    {/* STAT CARDS */}
                    <div className="tsStatCards">
                        <div className="tsCard">
                            <p className="tsCardTitle">Total Sales</p>
                            <h2>12 Events</h2>
                            <p className="tsGreen"><FiTrendingUp className="tsGreen" /> 18.5% compared to last month</p>
                        </div>

                        <div className="tsCard">
                            <p className="tsCardTitle">Ticket Sold</p>
                            <h2>$40,500.00</h2>
                            <p className="tsGreen"><FiTrendingUp className="tsGreen" /> 18.5% compared to last month</p>
                        </div>

                        <div className="tsCard">
                            <p className="tsCardTitle">Active Events</p>
                            <h2>2348</h2>
                            <p className="tsGreen"><FiTrendingUp className="tsGreen" /> 18.5% compared to last month</p>
                        </div>
                    </div>

                    {/* LINE CHART */}
                    <div className="tsChartBox">
                        <h3>Sales Over Time</h3>

                        <ResponsiveContainer width="100%" height={260}>
                            <LineChart data={lineData}>
                                <XAxis dataKey="name" stroke="#999" />
                                <YAxis
                                    ticks={[5000, 10000, 25000, 50000, 100000]}
                                    domain={[0, 100000]}
                                    tickFormatter={(v) => `${v / 1000}k`}
                                    stroke="#999"
                                    axisLine={true}
                                    tickLine={true}
                                />
                                <Tooltip />
                                <Line type="monotone" dataKey="value" stroke="#3c6ff7" strokeWidth={2} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                    {/* BOTTOM CHARTS */}
                    <div className="tsBottomGrid">

                        {/* PIE */}
                        <div className="tsPieCard">
                            <h3>Tickets Sold</h3>

                            <ResponsiveContainer width="100%" height={230}>
                                <PieChart>
                                    <Pie
                                        data={pieData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={45}
                                        outerRadius={75}
                                        paddingAngle={4}
                                        dataKey="value"
                                    >
                                        {pieData.map((entry, i) => (
                                            <Cell key={i} fill={entry.color} />
                                        ))}
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>

                            <div className="tsLegend">
                                {pieData.map((p, i) => (
                                    <div className="tsLegendRow" key={i}>

                                        <div className="tsLegendLeft">
                                            <span className="tsLegendDot" style={{ background: p.color }}></span>
                                            <p>{p.name}</p>
                                        </div>

                                        <p className="tsLegendPercent">{p.value.toFixed(2)}%</p>

                                    </div>
                                ))}
                            </div>

                        </div>

                        {/* BAR */}
                        <div className="tsBarCard">
                            <div className="tsBarHeader">
                                <h3>Top 5 Sales</h3>
                            </div>

                            <ResponsiveContainer width="100%" height={240}>
                                <BarChart data={barData} layout="vertical">

                                    <YAxis
                                        type="category"
                                        dataKey="name"
                                        width={90}
                                        tick={{ fill: "#333", fontSize: 14 }}
                                        axisLine={false}
                                        tickLine={false}
                                    />

                                    <Bar
                                        dataKey="value"
                                        fill="#3c6ff7"
                                        radius={10}
                                        barSize={12}
                                        background={{ fill: "#f3f3f3" }}
                                    />

                                </BarChart>
                            </ResponsiveContainer>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default TrackSales;
