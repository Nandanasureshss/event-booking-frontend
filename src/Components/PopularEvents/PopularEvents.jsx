import React from "react";
import "./PopularEvents.css";
import { useNavigate } from "react-router-dom";

const mockEvents = [
  {
    id: 1,
    tag: "Live Concert",
    title: "Celebrity Live Night Show",
    location: "Abu Dhabi, UAE",
    date: "Fri • 18 Oct • 8:00 PM",
    image: "/assets/picture5.jpg",
  },
  {
    id: 2,
    tag: "Festival",
    title: "Festive Festival Lights",
    location: "Dubai, UAE",
    date: "Sat • 26 Oct • 6:30 PM",
    image: "/assets/picture6.jpg",
  },
  {
    id: 3,
    tag: "Formula 1",
    title: "Formula 1 Grand Prix",
    location: "Yas Marina Circuit",
    date: "Sun • 01 Dec • 3:00 PM",
    image: "/assets/picture7.jpg",
  },
];

function PopularEvents() {
  const navigate = useNavigate();

  return (
    <section className="section">
      <div className="page-container">
        <div className="section-header">
          <h2 className="section-title">Popular Events</h2>

          <button
            className="section-link"
            type="button"
            onClick={() => navigate("/allevents")}   // ⭐ Correct
          >
            Show All
          </button>
        </div>

        <div className="events-grid">
          {mockEvents.map((event) => (
            <article key={event.id} className="event-card">
              <div className="event-image-wrapper">
                <img src={event.image} alt={event.title} />
                <span className="event-tag">{event.tag}</span>
              </div>

              <div className="event-body">
                <h3 className="event-title">{event.title}</h3>
                <p className="event-meta">{event.location}</p>
                <p className="event-meta event-meta-date">{event.date}</p>

                <button
                  className="event-cta"
                  onClick={() => navigate("/event-details")}   // ⭐ Correct
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
