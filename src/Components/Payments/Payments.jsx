import React, { useState, useMemo } from "react";
import Topbar from "../../pages/Topbar/Topbar";
import AdminSidebar from "../../pages/AdminSidebar/AdminSidebar";
import "./Payments.css";
import { FiFilter, FiRotateCw } from "react-icons/fi";

const Payments = () => {
  const originalPayments = [
    { id: "00001", name: "Christine Brooks", email: "example@mail.com", date: "14 Feb 2019", amount: 200, status: "Completed", method: "Card" },
    { id: "00002", name: "Rosie Pearson", email: "example@mail.com", date: "14 Feb 2019", amount: 140, status: "Failed", method: "UPI" },
    { id: "00003", name: "Darrell Caldwell", email: "example@mail.com", date: "14 Feb 2019", amount: 500, status: "Processing", method: "Wallet" },
    { id: "00004", name: "Gilbert Johnston", email: "example@mail.com", date: "14 Feb 2019", amount: 230, status: "Completed", method: "Card" },
    { id: "00005", name: "Alan Cain", email: "example@mail.com", date: "14 Feb 2019", amount: 240, status: "Completed", method: "UPI" },
    { id: "00006", name: "Alfred Murray", email: "example@mail.com", date: "14 Feb 2019", amount: 1000, status: "Completed", method: "Card" }
  ];

  // FILTER STATE
  const [filters, setFilters] = useState({
    date: "",
    method: "",
    amount: "",
    status: ""
  });

  // APPLY FILTERS
  const filteredPayments = useMemo(() => {
    return originalPayments.filter((p) => {
      const byDate = filters.date ? p.date === filters.date : true;
      const byMethod = filters.method ? p.method === filters.method : true;
      const byAmount = filters.amount ? p.amount.toString() === filters.amount : true;
      const byStatus = filters.status ? p.status === filters.status : true;

      return byDate && byMethod && byAmount && byStatus;
    });
  }, [filters]);

  // RESET FILTERS
  const resetFilters = () => {
    setFilters({
      date: "",
      method: "",
      amount: "",
      status: ""
    });
  };

  return (
    <div className="adminEventsPage">

      {/* TOPBAR */}
      <div className="adminEventsHeader">
        <Topbar />
      </div>

      {/* SIDEBAR */}
      <div className="adminEventsSidebar">
        <AdminSidebar />
      </div>

      {/* MAIN CONTENT */}
      <div className="adminEventsContainer">
        <div className="paymentsContent">

          {/* Title Row */}
          <div className="paymentsTitleRow">
            <h2>Payments</h2>
            <span className="paymentsDateRange">Aug 01 - Aug 07</span>
          </div>

          {/* FILTER BAR */}
          <div className="paymentsFilters">

            <div className="filterSection">
              <FiFilter className="filterIcon" />
              <span>Filter By</span>
            </div>

            <select
              value={filters.date}
              onChange={(e) => setFilters({ ...filters, date: e.target.value })}
            >
              <option value="">Date</option>
              <option>14 Feb 2019</option>
            </select>

            <select
              value={filters.method}
              onChange={(e) => setFilters({ ...filters, method: e.target.value })}
            >
              <option value="">Payment method</option>
              <option>UPI</option>
              <option>Card</option>
              <option>Wallet</option>
            </select>

            <select
              value={filters.amount}
              onChange={(e) => setFilters({ ...filters, amount: e.target.value })}
            >
              <option value="">Amount</option>
              <option value="140">140</option>
              <option value="200">200</option>
              <option value="230">230</option>
              <option value="240">240</option>
              <option value="500">500</option>
              <option value="1000">1000</option>
            </select>

            <select
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            >
              <option value="">Status</option>
              <option>Completed</option>
              <option>Failed</option>
              <option>Processing</option>
            </select>

            <button className="resetBtn" onClick={resetFilters}>
              <FiRotateCw /> Reset Filter
            </button>

          </div>

          {/* TABLE */}
          <div className="paymentsTableWrapper">
            <table className="paymentsTable">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Date</th>
                  <th>Payment</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {filteredPayments.map((p, i) => (
                  <tr key={i}>
                    <td>{p.id}</td>
                    <td>{p.name}</td>
                    <td>{p.email}</td>
                    <td>{p.date}</td>
                    <td>{p.amount}</td>
                    <td>
                      <span className={`statusBadge ${p.status}`}>
                        {p.status}
                      </span>
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

export default Payments;
