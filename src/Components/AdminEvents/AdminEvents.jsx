import React, { useState, useEffect } from "react";
import Topbar from "../../pages/Topbar/Topbar";
import AdminSidebar from "../../pages/AdminSidebar/AdminSidebar";
import "./AdminEvents.css";
import axios from "axios";

import {
  FiEdit,
  FiTrash2,
  FiBarChart2,
  FiMapPin,
  FiClock,
  FiTrendingUp
} from "react-icons/fi";
import { FaTicketAlt } from "react-icons/fa";
import { SlCalender, SlNotebook, SlClock, SlUserFollow } from "react-icons/sl";
import { LuClock3 } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

const AdminEvents = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  // 🔹 FETCH EVENTS FROM BACKEND
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/events/all-events"
      );

      if (res.data.success) {
        setEvents(res.data.data);
      }
    } catch (error) {
      console.error("Failed to fetch events:", error);
    }
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

      <div className="adminEventsContainer">
        <div className="adminEventsContent">

          {/* TITLE ROW */}
          <div className="eventsTitleRow">
            <div className="eventsTitleIcon">
              <SlCalender className="calendarIcon" />
            </div>
            <h2 className="eventsTitle">Events</h2>
            <span className="eventsDateRange">Aug 01 - Aug 07</span>
          </div>

          {/* STATS CARDS (STATIC UI) */}
          <div className="eventsStats">

            <div className="eventsStatCard">
              <div className="statIconBox gradient1">
                <SlNotebook className="statIcon" />
              </div>
              <p className="statLabel">Listed events</p>
              <h3 className="statNumber">{events.length} Events</h3>
              <p className="statChange positive">
                <FiTrendingUp /> Live from database
              </p>
            </div>

            <div className="eventsStatCard">
              <div className="statIconBox gradient2">
                <SlClock className="statIcon" />
              </div>
              <p className="statLabel">Pending events</p>
              <h3 className="statNumber">02 Events</h3>
              <p className="statChange positive">
                <LuClock3 /> Scheduled
              </p>
            </div>

            <div className="eventsStatCard">
              <div className="statIconBox gradient3">
                <SlUserFollow className="statIcon" />
              </div>
              <p className="statLabel">Registrations</p>
              <h3 className="statNumber">23,485</h3>
              <p className="statChange positive">
                <FiTrendingUp /> Updated
              </p>
            </div>

          </div>

          <h3 className="recentTitle">Recently Updated events</h3>

          <div className="recentEvents">

            {/* ADD EVENT CARD */}
            <div
              className="addEventCard"
              onClick={() => navigate("/admin/events/add")}
            >
              <p className="plus">+</p>
              <p className="addEventText">Add new event</p>
              <p className="subText">
                Create a new event and enter complete details to get started
              </p>
            </div>

            {/* DYNAMIC EVENTS FROM BACKEND */}
            {events.map((ev) => (
              <div className="eventBigCard" key={ev._id}>

                <div className="eventLeft">
                  <span className="eventBadge">LIVE</span>

                  <img
                    src={
                      ev.mediaFiles?.length
                        ? `http://localhost:5000/uploads/${ev.mediaFiles[0]}`
                        : "/assets/picture.jpg"
                    }
                    className="eventImg"
                    alt={ev.eventName}
                  />

                  <div className="eventLeftBottom">
                    <button className="bookBtn">Book Now</button>
                  </div>
                </div>

                <div className="eventRight">
                  <h3 className="eventTitle">{ev.eventName}</h3>
                  <p className="eventDateText">{ev.date}</p>

                  <p className="eventInfo">
                    <FiMapPin /> {ev.location}
                  </p>

                  <p className="eventInfo">
                    <FiClock /> {ev.time}
                  </p>

                  <p className="eventInfo">
                    <FaTicketAlt /> From ₹
                    {ev.seatingCategories?.[0]?.price || 0}
                  </p>

                  <p className="eventInfo">
                    <FiTrendingUp />{" "}
                    {ev.seatingCategories?.reduce(
                      (total, seat) => total + seat.ticketsAvailable,
                      0
                    )} Tickets Available
                  </p>

                  <div className="eventActions">
                    <button className="actionEdit">
                      <FiEdit /> Edit
                    </button>

                    <button className="actionDelete">
                      <FiTrash2 /> Delete
                    </button>

                    <button className="actionTrack">
                      <FiBarChart2 /> Track
                    </button>
                  </div>
                </div>

              </div>
            ))}

          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminEvents;
