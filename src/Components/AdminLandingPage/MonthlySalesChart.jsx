import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Legend } from "recharts";
import "./MonthlySalesChart.css";

const data = [
  { month: "Jan", sold: 4000, left: 2400 },
  { month: "Feb", sold: 5200, left: 4800 },
  { month: "Mar", sold: 3100, left: 2900 },
  { month: "Apr", sold: 3400, left: 6500 },
  { month: "May", sold: 900, left: 3200 }, 
  { month: "Jun", sold: 4800, left: 2700 },
];

function MonthlySalesChart() {
  return (
    <div className="chartWrapper">

      {/* Title + Legend Row */}
      <div className="chartHeader">
        <h3>Monthly Sales</h3>

        <div className="chartLegend">
          <span className="dot blue"></span> Tickets Sold
          <span className="dot green"></span> Tickets left
        </div>
      </div>

      <div className="chartBox">
        <ResponsiveContainer width="100%" height={380}>
          <BarChart data={data} barGap={20}>
            <CartesianGrid stroke="#e5e7eb" strokeDasharray="3 3" />
            <XAxis dataKey="month" tick={{ fill: "#555" }} />
            <YAxis tick={{ fill: "#555" }} />
            <Tooltip cursor={{ fill: "rgba(0,0,0,0.05)" }} />

            <Bar
              dataKey="sold"
              shape={(props) => (
                <rect
                  {...props}
                  fill={props.payload.month === "May" ? "red" : "#3b82f6"}
                  rx="4"
                  ry="4"
                />
              )}
            />

            <Bar dataKey="left" fill="#6b8e23" rx="4" ry="4" />
          </BarChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}

export default MonthlySalesChart;
