import React, { useState, useRef, useEffect } from "react";
import "./Hero.css";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { IoIosArrowDown } from "react-icons/io";
import { useNavigate } from "react-router-dom";
const API_BASE_URL = import.meta.env.VITE_API_URL;

function Hero() {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState("");

  const [popularEvents, setPopularEvents] = useState([]);

  const locationRef = useRef(null);
  const calendarRef = useRef(null);

  const navigate = useNavigate();

  /* ---------------- CLOSE DROPDOWNS ---------------- */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (locationRef.current && !locationRef.current.contains(e.target)) {
        setOpenDropdown(null);
      }
      if (calendarRef.current && !calendarRef.current.contains(e.target)) {
        setShowCalendar(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* ---------------- FETCH POPULAR EVENTS (AUTO FILTER) ---------------- */
  useEffect(() => {
    const fetchPopularEvents = async () => {
      try {
        let url = `${API_BASE_URL}/api/events/popular?`;
        if (selectedLocation) url += `location=${selectedLocation}&`;
        if (selectedDate)
          url += `date=${selectedDate.toISOString().split("T")[0]}`;

        const res = await fetch(url);
        const data = await res.json();

        if (data.success) {
          setPopularEvents(data.data);
        }
      } catch (err) {
        console.error("Error fetching popular events", err);
      }
    };

    fetchPopularEvents();
  }, [selectedLocation, selectedDate]);

  return (
    <section className="hero">

     <div className="hero-top-filter">

  <div className="filter-group">
    {/* LOCATION */}
    <div
      className="filter-item"
      ref={locationRef}
      onClick={() => setOpenDropdown(openDropdown === 1 ? null : 1)}
    >
      {selectedLocation || "Location"}
      <span className="arrow"><IoIosArrowDown /></span>

      {openDropdown === 1 && (
        <div className="dropdown-menu">
          {["Dubai", "United Kingdom", "Oman", "Paris", "London", "New York"].map(
            (loc) => (
              <div
                key={loc}
                onClick={() => {
                  setSelectedLocation(loc);
                  setOpenDropdown(null);
                }}
              >
                {loc}
              </div>
            )
          )}
        </div>
      )}
    </div>

    {/* DATE */}
    <div
      className="filter-item"
      ref={calendarRef}
      onClick={() => setShowCalendar(!showCalendar)}
    >
      {selectedDate ? selectedDate.toDateString() : "Select Date"}
      <span className="arrow"><IoIosArrowDown /></span>

      {showCalendar && (
        <div className="calendar-popup">
          <Calendar
            onChange={(date) => {
              setSelectedDate(date);
              setShowCalendar(false);
            }}
            value={selectedDate}
          />
        </div>
      )}
    </div>

    {/* EVENT */}
    <div className="filter-item">
      Select Event <span className="arrow"><IoIosArrowDown /></span>
    </div>
  </div>

  <button
    className="hero-primary search-btn"
    onClick={() => navigate("/allevents")}
  >
    Search
  </button>
</div>


      <Swiper
        modules={[Pagination, Autoplay]}
        autoplay={{ delay: 4000 }}
        loop
        pagination={{ clickable: true }}
        className="hero-swiper"
      >
        {popularEvents.length === 0 && (
          <SwiperSlide>
            <div className="hero-slide">
              <div className="hero-inner page-container">
                <div className="hero-content">
                  <h1>No events found</h1>
                </div>
              </div>
            </div>
          </SwiperSlide>
        )}

        {popularEvents.map((event) => (
          <SwiperSlide key={event._id}>
            <div className="hero-slide">
              <img
                src={event.mediaFiles?.[0]}
                className="hero-bg"
                alt={event.eventName}
              />

              <div className="hero-inner page-container">
                <div className="hero-content">
                  <h1>{event.eventName}</h1>
                  <p>
                    {event.description
                      ? event.description.slice(0, 120) + "..."
                      : "Experience an unforgettable event."}
                  </p>

                  <button
                    className="hero-primary"
                    onClick={() => navigate(`/event/${event._id}`)}
                  >
                    BOOK NOW
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

    </section>
  );
}

export default Hero;
