import React, { useState, useEffect } from "react";
import Topbar from "../../pages/Topbar/Topbar";
import AdminSidebar from "../../pages/AdminSidebar/AdminSidebar";
import "./AdminEvents.css";

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

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("events")) || [];
    setEvents(saved);
  }, []);

  return (
    <div className="adminEventsPage">
      <div className="adminEventsHeader">
        <Topbar />
      </div>

      <div className="adminEventsSidebar">
        <AdminSidebar />
      </div>

      <div className="adminEventsContainer">
        <div className="adminEventsContent">
          <div className="eventsTitleRow">
            <div className="eventsTitleIcon">
              <SlCalender className="calendarIcon" />
            </div>
            <h2 className="eventsTitle">Events</h2>
            <span className="eventsDateRange">Aug 01 - Aug 07</span>
          </div>

          
          <div className="eventsStats">
            <div className="eventsStatCard">
              <div className="statIconBox gradient1">
                <SlNotebook className="statIcon" />
              </div>
              <p className="statLabel">Listed events</p>
              <h3 className="statNumber">12 Events</h3>
              <p className="statChange positive">
                <FiTrendingUp className="trendIcon" /> 18.5% compared to last month
              </p>
            </div>

            <div className="eventsStatCard">
              <div className="statIconBox gradient2">
                <SlClock className="statIcon" />
              </div>
              <p className="statLabel">Pending events</p>
              <h3 className="statNumber">02 Events</h3>
              <p className="statChange positive">
                <LuClock3 className="pendingIcon" /> Events scheduled in the future
              </p>
            </div>

            <div className="eventsStatCard">
              <div className="statIconBox gradient3">
                <SlUserFollow className="statIcon" />
              </div>
              <p className="statLabel">Registrations</p>
              <h3 className="statNumber">23,4854</h3>
              <p className="statChange positive">
                <FiTrendingUp className="trendIcon" /> 18.5% compared to last month
              </p>
            </div>
          </div>

          <h3 className="recentTitle">Recently Updated events</h3>

          <div className="recentEvents">
            
            <div
              className="addEventCard"
              onClick={() => navigate("/admin/events/add")}
              style={{ cursor: "pointer" }}
            >
              <p className="plus">+</p>
              <p className="addEventText">Add new event</p>
              <p className="subText">
                Create a new event and enter complete details to get started
              </p>
            </div>

            
            <div className="eventBigCard">
              <div className="eventBigLeft">
                <span className="eventBigBadge">TRENDING</span>

                <div className="eventBigTitleBox">
                  <h3 className="eventBigMainTitle">Formula 1</h3>
                  <p className="eventBigDate">September 26</p>
                </div>

                <img src="/assets/picture.jpg" className="eventBigImg" />

                <div className="eventBigFooter">
                  <p>
                    <FiMapPin /> Riyadh Arena
                  </p>
                  <p>
                    <FiClock /> 07:00pm – 11:00pm
                  </p>
                  <p>
                    <FaTicketAlt /> From $49
                  </p>
                </div>
              </div>

              <div className="eventBigRight">
                <h3 className="eventBigRightTitle">Event Name</h3>
                <p className="eventBigRightDate">September 14</p>

                <p className="eventBigInfoRow">
                  <FiTrendingUp /> 2.3k Ticket sold
                </p>

                <div className="eventBigActions">
                  <button className="bigEdit">
                    <FiEdit /> Edit
                  </button>
                  <button className="bigDelete">
                    <FiTrash2 /> Delete
                  </button>
                  <button className="bigTrack">
                    <FiBarChart2 /> Track
                  </button>
                </div>
              </div>
            </div>

           
            <div className="eventBigCard">
              <div className="eventBigLeft">
                <span className="eventBigBadge">TRENDING</span>

                <div className="eventBigTitleBox">
                  <h3 className="eventBigMainTitle">Formula 1</h3>
                  <p className="eventBigDate">September 26</p>
                </div>

                <img src="/assets/picture.jpg" className="eventBigImg" />

                <div className="eventBigFooter">
                  <p>
                    <FiMapPin /> Riyadh Arena
                  </p>
                  <p>
                    <FiClock /> 07:00pm – 11:00pm
                  </p>
                  <p>
                    <FaTicketAlt /> From $49
                  </p>
                </div>
              </div>

              <div className="eventBigRight">
                <h3 className="eventBigRightTitle">Event Name</h3>
                <p className="eventBigRightDate">September 14</p>

                <p className="eventBigInfoRow">
                  <FiTrendingUp /> 2.3k Ticket sold
                </p>

                <div className="eventBigActions">
                  <button className="bigEdit">
                    <FiEdit /> Edit
                  </button>
                  <button className="bigDelete">
                    <FiTrash2 /> Delete
                  </button>
                  <button className="bigTrack">
                    <FiBarChart2 /> Track
                  </button>
                </div>
              </div>
            </div>

           
            {events.map((ev, index) => (
              <div className="eventBigCard" key={index}>
                <div className="eventBigLeft">
                  <img
                    src={ev.image || "/assets/picture.jpg"}
                    className="eventBigImg"
                  />

                  <div className="eventBigFooter">
                    <p>
                      <FiMapPin /> {ev.location}
                    </p>
                    <p>
                      <FiClock /> {ev.time}
                    </p>
                    <p>
                      <FaTicketAlt /> From $49
                    </p>
                  </div>
                </div>

                <div className="eventBigRight">
                  <h3 className="eventBigRightTitle">{ev.title}</h3>
                  <p className="eventBigRightDate">{ev.date}</p>

                  <p className="eventBigInfoRow">
                    <FiTrendingUp /> 0 Tickets
                  </p>
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
