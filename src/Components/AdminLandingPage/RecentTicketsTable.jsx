import React from "react";
import "./RecentTicketsTable.css";

function RecentTicketsTable() {
  return (
    <div className="tableBox">
      <h3>Recent Tickets</h3>

      <table>
        <thead>
          <tr>
            <th>Assignee</th>
            <th>Subject</th>
            <th>Status</th>
            <th>Last Update</th>
            <th>Ticket ID</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td data-label="Assignee">John</td>
            <td data-label="Subject">UFC 321 Use</td>
            <td data-label="Status">
              <span className="status processing">Processing</span>
            </td>
            <td data-label="Last Update">Aug 05, 09:28</td>
            <td data-label="Ticket ID">PKT-08378</td>
          </tr>

          <tr>
            <td data-label="Assignee">Alex</td>
            <td data-label="Subject">Formula One</td>
            <td data-label="Status">
              <span className="status completed">Completed</span>
            </td>
            <td data-label="Last Update">Aug 05, 09:30</td>
            <td data-label="Ticket ID">PKT-09321</td>
          </tr>
        </tbody>

      </table>
    </div>
  );
}

export default RecentTicketsTable;
