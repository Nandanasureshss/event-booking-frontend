import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "./TotalTicketsChart.css";

const data = [
  { name: "Tickets Sold", value: 400, color: "#3b82f6" },
  { name: "Tickets Left", value: 300, color: "#facc15" },
  { name: "Tickets in Cart", value: 300, color: "#ef4444" },
];

function TotalTicketsChart() {
  return (
    <div className="chartBox">
      <h3>Total Tickets</h3>

      <div className="donutWrapper">
        <ResponsiveContainer width="80%" height={200}>
          <PieChart>
            <Pie
              data={data}
              innerRadius={60}
              outerRadius={90}
              paddingAngle={2}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={index} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="legendWrapper">
        {data.map((item, index) => (
          <div className="legendRow" key={index}>
            <div className="legendLeft">
              <span
                className="legendDot"
                style={{ background: item.color }}
              ></span>
              <span>{item.name}</span>
            </div>

            <span className="legendPercent">
              {((item.value / 1000) * 100).toFixed(2)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TotalTicketsChart;
