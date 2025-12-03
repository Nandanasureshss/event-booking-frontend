import React, { useState, useEffect } from "react";
import Topbar from "../../pages/Topbar/Topbar";
import AdminSidebar from "../../pages/AdminSidebar/AdminSidebar";
import "./AddHotels.css";

import { FiEdit, FiTrash2, FiBarChart2, FiMapPin, FiClock, FiTrendingUp } from "react-icons/fi";
import { SlCalender, SlNotebook, SlUserFollow } from "react-icons/sl";
import { LuClock3 } from "react-icons/lu";
import { FaDollarSign } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AddHotels = () => {
  const [hotels, setHotels] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("hotels")) || [];
    setHotels(saved);
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
            <h2 className="eventsTitle">Hotels</h2>
            <span className="eventsDateRange">Aug 01 - Aug 07</span>
          </div>

          <div className="eventsStats">
            
            <div className="eventsStatCard">
              <div className="statIconBox gradient1">
                <SlNotebook className="statIcon" />
              </div>
              <p className="statLabel">Listed Hotels</p>
              <h3 className="statNumber">{hotels.length} Hotels</h3>
              <p className="statChange positive">
                <FiTrendingUp className="trendIcon" /> Updated Recently
              </p>
            </div>

            <div className="eventsStatCard">
              <div className="statIconBox gradient2">
                <FaDollarSign className="statIcon" />
              </div>
              <p className="statLabel">Revenue</p>
              <h3 className="statNumber">$12,450</h3>
              <p className="statChange positive">
                <LuClock3 className="pendingIcon" /> Monthly Estimate
              </p>
            </div>

            <div className="eventsStatCard">
              <div className="statIconBox gradient3">
                <SlUserFollow className="statIcon" />
              </div>
              <p className="statLabel">Bookings</p>
              <h3 className="statNumber">4,582</h3>
              <p className="statChange positive">
                <FiTrendingUp className="trendIcon" /> Active Users
              </p>
            </div>
          </div>

          <h3 className="recentTitle">Recently Added Hotels</h3>

          <div className="recentEvents">

            <div
              className="addEventCard"
              onClick={() => navigate("/admin/hotels/add")}
              style={{ cursor: "pointer" }}
            >
              <p className="plus">+</p>
              <p className="addEventText">Add new hotel</p>
              <p className="subText">
                Create a new hotel listing and enter all details
              </p>
            </div>

            {/* DISPLAY HOTEL CARDS */}
            {hotels.map((hotel, index) => (
              <div className="eventBigCard" key={index}>
                
                <div className="eventBigLeft">
                  
                  <img
                    src={
                      hotel.images && hotel.images.length > 0
                        ? URL.createObjectURL(hotel.images[0])
                        : "/assets/picture.jpg"
                    }
                    className="eventBigImg"
                    alt="hotel"
                  />

                  <div className="eventBigFooter">
                    <p><FiMapPin /> {hotel.location}</p>
                    <p><FiClock /> {hotel.time}</p>
                  </div>
                </div>

                <div className="eventBigRight">
                  <h3 className="eventBigRightTitle">{hotel.name}</h3>
                  <p className="eventBigRightDate">{hotel.category}</p>

                  <p className="eventBigInfoRow">
                    <FiTrendingUp /> {hotel.features.length} Features
                  </p>

                  <div className="eventBigActions">
                    <button className="bigEdit"><FiEdit /> Edit</button>
                    <button className="bigDelete"><FiTrash2 /> Delete</button>
                    <button className="bigTrack"><FiBarChart2 /> Track</button>
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

export default AddHotels;
