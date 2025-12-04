import React, { useState, useEffect } from "react";
import Topbar from "../../pages/Topbar/Topbar";
import AdminSidebar from "../../pages/AdminSidebar/AdminSidebar";
import "./AddHotels.css";

import {
  FiEdit,
  FiTrash2,
  FiBarChart2,
  FiMapPin,
  FiClock,
  FiTrendingUp,
} from "react-icons/fi";
import { SlCalender, SlNotebook, SlUserFollow } from "react-icons/sl";
import { LuClock3 } from "react-icons/lu";
import { FaDollarSign, FaTicketAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AddHotels = () => {
  const [hotels, setHotels] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("hotels")) || [];
    setHotels(saved);
  }, []);

  const getCoverImage = (hotel) => {
    const firstFeature = hotel.features && hotel.features[0];
    const firstImg = firstFeature && firstFeature.images && firstFeature.images[0];
    if (firstImg && firstImg.preview) return firstImg.preview;
    return "/assets/picture.jpg";
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
            >
              <p className="plus">+</p>
              <p className="addEventText">Add new hotel</p>
              <p className="subText">
                Create a new hotel listing and enter all details
              </p>
            </div>

            {hotels.map((hotel, index) => (
              <div className="eventBigCard" key={index}>
                <div className="eventLeft">
                  <img
                    src={getCoverImage(hotel)}
                    className="eventImg"
                    alt="hotel"
                  />

                  <div className="eventLeftBottom">
                  
                    <button className="bookBtn">Book Now</button>
                  </div>
                </div>

                <div className="eventRight">
                  <h3 className="eventTitle">{hotel.name || "Hotel Name"}</h3>
                  <p className="eventDateText">{hotel.category || "3 Star"}</p>

                  <p className="eventInfo">
                    <FiMapPin /> {hotel.location || "Location"}
                  </p>
                  <p className="eventInfo">
                    <FiClock /> {hotel.time || "Timing"}
                  </p>
                  <p className="eventInfo">
                    <FaDollarSign /> From $49
                  </p>
                  <p className="eventInfo">
                    <SlUserFollow /> 0 Bookings
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

export default AddHotels;
