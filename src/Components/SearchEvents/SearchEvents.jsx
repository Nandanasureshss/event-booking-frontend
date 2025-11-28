import React, { useContext } from "react";
import "../AllEvents/AllEvents.css";
import { FilterContext } from "../../pages/FilterContext";

const mockEvents = [
  { id: 1, tag: "Concert", title: "Celebrity Live Night Show", location: "Dubai", date: "18 Oct", image: "/assets/picture5.jpg" },
  { id: 2, tag: "Festival", title: "Festive Festival Lights", location: "London", date: "26 Oct", image: "/assets/picture6.jpg" },
  { id: 3, tag: "Sports", title: "Formula 1 Grand Prix", location: "Abu Dhabi", date: "01 Dec", image: "/assets/picture7.jpg" },
];

function SearchEvents() {
  const { filters } = useContext(FilterContext);

  const filteredEvents = mockEvents.filter((event) => {
    const matchLocation =
      !filters.location || event.location.toLowerCase().includes(filters.location.toLowerCase());

    const matchDate = !filters.date || event.date.includes(filters.date);

    const matchType =
      !filters.eventType || event.tag.toLowerCase().includes(filters.eventType.toLowerCase());

    return matchLocation && matchDate && matchType;
  });

  return (
    <section className="section">
      <div className="page-container">
        <h2 className="section-title">Popular Events</h2>

        <div className="events-grid">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <article key={event.id} className="event-card">
                <div className="event-image-wrapper">
                  <img src={event.image} alt={event.title} />
                  <span className="event-tag">{event.tag}</span>
                </div>
                <div className="event-body">
                  <h3 className="Searchevent-title">{event.title}</h3>
                  <p className="event-meta">{event.location}</p>
                  <p className="event-meta">{event.date}</p>
                  <button className="event-cta">Book Now</button>
                </div>
              </article>
            ))
          ) : (
            <p>No matching events found</p>
          )}
        </div>
      </div>
    </section>
  );
}

export default SearchEvents;
