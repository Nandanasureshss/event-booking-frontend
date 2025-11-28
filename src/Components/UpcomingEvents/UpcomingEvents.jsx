import React from "react";
import "./UpcomingEvents.css";

const eventsData = [
  {
    id: 1,
    title: "Coldplay Live",
    date: "September 14",
    remaining: "3 DAYS REMAINING",
    location: "Riyadh Arena",
    time: "07:00pm - 11:00pm",
    tickets: 5,
    image:
      "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg",
  },
  {
    id: 2,
    title: "Coldplay Live",
    date: "September 14",
    remaining: "3 DAYS REMAINING",
    location: "Riyadh Arena",
    time: "07:00pm - 11:00pm",
    tickets: 5,
    image:
      "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg",
  },
  {
    id: 3,
    title: "Coldplay Live",
    date: "September 14",
    remaining: "3 DAYS REMAINING",
    location: "Riyadh Arena",
    time: "07:00pm - 11:00pm",
    tickets: 5,
    image:
      "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg",
  },
];

function UpcomingEvents() {
  return (
    <div className="upcoming-page">
      <h2 className="section-title">Upcoming Events</h2>

      <div className="events-wrapper">
        {eventsData.map((event) => (
          <div key={event.id} className="event-card">

            <div className="event-image-wrapper">

              <div className="event-badge">{event.remaining}</div>

              <img
                src={event.image}
                alt={event.title}
                className="event-image"
              />

              <div className="event-text-overlay">
                <h3 className="upcomingevent-title">{event.title}</h3>
                <p className="event-date">{event.date}</p>
              </div>
            </div>

            <div className="event-bottom-wrapper">
              <div className="event-bottom-left">
                <div className="event-location-pill">
                  <span className="location-icon"></span>
                  <span>{event.location}</span>
                </div>

                <div className="event-time-pill">
                  <span className="time-icon"></span>
                  <span>{event.time}</span>
                </div>
              </div>

              <button className="event-ticket-btn">
                {event.tickets} Tickets Booked
              </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}

export default UpcomingEvents;
