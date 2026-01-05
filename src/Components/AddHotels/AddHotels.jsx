import React, { useState, useEffect } from "react";
import Topbar from "../../pages/Topbar/Topbar";
import AdminSidebar from "../../pages/AdminSidebar/AdminSidebar";
import "./AddHotels.css";
import axios from "axios";

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
import { FaDollarSign } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AddHotels = () => {
  const [hotels, setHotels] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchHotels();
  }, []);

  const fetchHotels = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/hotels/all-hotels"
      );

      if (res.data.success) {
        setHotels(res.data.data);
      }
    } catch (error) {
      console.error("Failed to fetch hotels:", error);
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

          {/* TITLE */}
          <div className="eventsTitleRow">
            <div className="eventsTitleIcon">
              <SlCalender className="calendarIcon" />
            </div>
            <h2 className="eventsTitle">Hotels</h2>
            <span className="eventsDateRange">Aug 01 - Aug 07</span>
          </div>

          {/* STATS */}
          <div className="eventsStats">

            <div className="eventsStatCard">
              <div className="statIconBox gradient1">
                <SlNotebook className="statIcon" />
              </div>
              <p className="statLabel">Listed Hotels</p>
              <h3 className="statNumber">{hotels.length} Hotels</h3>
              <p className="statChange positive">
                <FiTrendingUp /> Live from database
              </p>
            </div>

            <div className="eventsStatCard">
              <div className="statIconBox gradient2">
                <FaDollarSign className="statIcon" />
              </div>
              <p className="statLabel">Revenue</p>
              <h3 className="statNumber">$12,450</h3>
              <p className="statChange positive">
                <LuClock3 /> Monthly Estimate
              </p>
            </div>

            <div className="eventsStatCard">
              <div className="statIconBox gradient3">
                <SlUserFollow className="statIcon" />
              </div>
              <p className="statLabel">Bookings</p>
              <h3 className="statNumber">4,582</h3>
              <p className="statChange positive">
                <FiTrendingUp /> Active Users
              </p>
            </div>

          </div>

          <h3 className="recentTitle">Recently Added Hotels</h3>

          <div className="recentEvents">

            {/* ADD HOTEL CARD */}
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

            {/* HOTELS FROM BACKEND */}
            {hotels.map((hotel) => (
              <div className="eventBigCard" key={hotel._id}>

                <div className="eventLeft">
                  <img
                    src={
                      hotel.mediaFiles?.length
                        ? `http://localhost:5000/uploads/${hotel.mediaFiles[0]}`
                        : "/assets/picture.jpg"
                    }
                    className="eventImg"
                    alt={hotel.hotelName}
                  />

                  <div className="eventLeftBottom">
                    <button className="bookBtn">Book Now</button>
                  </div>
                </div>

                <div className="eventRight">
                  <h3 className="eventTitle">{hotel.hotelName}</h3>
                  <p className="eventDateText">{hotel.description}</p>

                  <p className="eventInfo">
                    <FiMapPin /> {hotel.location}
                  </p>

                  <p className="eventInfo">
                    <FaDollarSign /> From ₹
                    {hotel.roomCategories?.[0]?.price || 0}
                  </p>

                  <p className="eventInfo">
                    <SlUserFollow />{" "}
                    {hotel.roomCategories?.reduce(
                      (total, room) => total + room.roomsAvailable,
                      0
                    )} Rooms Available
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
