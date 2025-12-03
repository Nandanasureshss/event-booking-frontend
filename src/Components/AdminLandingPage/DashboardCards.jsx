import React from "react";
import "./DashboardCards.css";
import { RiTicket2Line } from "react-icons/ri";
import { FiTrendingUp } from "react-icons/fi";

function DashboardCards() {
  return (
    <div className="dashboardCards">

      {/* CARD 1 - Tickets Sold */}
      <div className="ticketCard">

        <p className="ticketTitle">Tickets Sold</p>

        <div className="ticketRow">
          <div className="ticketStackIcon">
            <RiTicket2Line className="ticketIconBack" />
            <RiTicket2Line className="ticketIconFront" />
          </div>
          <h3 className="ticketValue">12,354</h3>
        </div>

        {/* Bars */}
        <div className="ticketBars">
          <span style={{ height: "55px" }}></span>
          <span style={{ height: "40px" }}></span>
          <span style={{ height: "25px" }}></span>
          <span style={{ height: "40px" }}></span>
          <span style={{ height: "70px" }}></span>
          <span style={{ height: "65px" }}></span>
        </div>

        <div className="ticketDivider"></div>

        <div className="ticketFooter">
          <span>24,321 Tickets Left</span>
          <span>Aug 01 - Aug 07</span>
        </div>

      </div>

      {/* CARD 2 - Revenue */}
      <div className="dashboardCard gradient2">
        <div className="cardTop">
          <p className="cardTitle">Revenue</p>
          <FiTrendingUp className="cardIcon" />
        </div>

        <h3 className="cardValue">$40,500.00</h3>

        <p className="increaseText">10% increased</p>

        <p className="cardFooter">Aug 01 - Aug 07</p>
      </div>

      {/* CARD 3 - Today's Sale */}
      <div className="dashboardCard gradient3">
        <p className="cardTitle">Today's Sale</p>
        <h3 className="cardValue">12,354</h3>
      </div>

    </div>
  );
}

export default DashboardCards;
