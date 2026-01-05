import React, { useEffect, useState } from "react";
import "./PopularEvents.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function PopularEvents() {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/events/popular")
      .then((res) => {
        setEvents(res.data.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <section className="section">
      <div className="page-container">
        <div className="section-header">
          <h2 className="section-title">Popular Events</h2>
          <button
            className="section-link"
            type="button"
            onClick={() => navigate("/allevents")}
          >
            Show All
          </button>
        </div>

        <div className="events-grid">
          {events.map((event) => (
            <article key={event._id} className="event-card">
              <div className="event-image-wrapper">
                <img
                  src={`http://localhost:5000/uploads/${event.mediaFiles?.[0]}`}
                  alt={event.eventName}
                />
                <span className="event-tag">
                  {event.eventCategory || "Popular"}
                </span>
              </div>

              <div className="event-body">
                <h3 className="event-title">{event.eventName}</h3>

                <p className="event-meta">{event.location}</p>

                <p className="event-meta event-meta-date">
                  {event.date} • {event.time}
                </p>

                <button
                  className="event-cta"
                  onClick={() => navigate(`/event-details/${event._id}`)}
                >
                  Book Now
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PopularEvents;
