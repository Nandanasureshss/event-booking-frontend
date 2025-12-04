import React, { useState } from "react";
import "./AllEvents.css";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import { LuMapPin } from "react-icons/lu";
import { CiClock1 } from "react-icons/ci";
import { IoPricetagsOutline } from "react-icons/io5";
import { IoIosHeartEmpty, IoIosArrowDown } from "react-icons/io";
import { useNavigate } from "react-router-dom"; 

const slides = [
  { id: 1, image: "/assets/picture1.jpg" },
  { id: 2, image: "/assets/picture2.jpg" },
  { id: 3, image: "/assets/picture3.jpg" },
];

const eventsData = [
  { id: 1, title: "Coldplay Live", date: "September 14", image: "/assets/picture1.jpg", location: "Dubai", type: "Concert" },
  { id: 2, title: "Festive Fusion", date: "October 10", image: "/assets/picture2.jpg", location: "Oman", type: "Festival" },
  { id: 3, title: "Formula 1", date: "September 26", image: "/assets/picture3.jpg", location: "London", type: "Sports" },
  { id: 4, title: "Coldplay Live", date: "September 14", image: "/assets/picture1.jpg", location: "Paris", type: "Concert" },
  { id: 5, title: "Festive Fusion", date: "October 10", image: "/assets/picture2.jpg", location: "Dubai", type: "Festival" },
];

const AllEvents = () => {
  const navigate = useNavigate();  

  const [openDropdown, setOpenDropdown] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [locationFilter, setLocationFilter] = useState("");
  const [eventFilter, setEventFilter] = useState("");

  const formatEventDate = (dateStr) => {
    const [month, day] = dateStr.split(" ");
    return `${month.substring(0, 3)} ${day}`;
  };

  const filteredEvents = eventsData.filter((event) => {
    const matchLocation = !locationFilter || event.location === locationFilter;
    const matchEvent = !eventFilter || event.type === eventFilter;

    const matchDate =
      !selectedDate ||
      formatEventDate(event.date).includes(
        selectedDate.toLocaleDateString("en-US", { month: "short", day: "2-digit" })
      );

    return matchLocation && matchEvent && matchDate;
  });

  return (
    <div className="all-events-page">

      <h2 className="section-title">Popular Events</h2>

      <div className="events-grid">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <div className="event-card" key={event.id}>
              <div className="card-image">
                <img src={event.image} alt={event.title} />
                <span className="tag">TRENDING</span>
                <h3 className="eventheading">{event.title}</h3>
                <p className="eventpara">{event.date}</p>
                <button className="wishlist-btn">
                  <IoIosHeartEmpty />
                </button>
              </div>

              <div className="bottom-purple">
                <div className="bottom-row">
                  <div>
                    <p><LuMapPin /> {event.location}</p>
                    <p><CiClock1 /> 07:00pm - 11:00pm</p>
                    <p><IoPricetagsOutline /> From $49</p>
                  </div>

                  <button
                    className="book-btn"
                    onClick={() => navigate("/event-details")}
                  >
                    Book Now
                  </button>

                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="no-events">No events found for selected filters.</p>
        )}
      </div>

    </div>
  );
};

export default AllEvents;
