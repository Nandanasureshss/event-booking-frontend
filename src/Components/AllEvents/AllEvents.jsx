import React, { useState, useEffect } from "react";
import "./AllEvents.css";
import { LuMapPin } from "react-icons/lu";
import { CiClock1 } from "react-icons/ci";
import { IoPricetagsOutline } from "react-icons/io5";
import { IoIosHeartEmpty, IoIosHeart } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";
const IMAGE_BASE_URL = import.meta.env.VITE_API_URL;
const AllEvents = () => {
  const navigate = useNavigate();
  const [eventsData, setEventsData] = useState([]);
  const [wishlistIds, setWishlistIds] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));
  const userEmail = user?.email;

  useEffect(() => {
    const fetchEvents = async () => {
      const res = await axios.get("/api/events/all-events");
      if (res.data.success) {
        setEventsData(res.data.data);
      }
    };
    fetchEvents();
  }, []);

  useEffect(() => {
    if (!userEmail) return;

    const fetchWishlist = async () => {
      const res = await axios.get(`/api/wishlist/${userEmail}`);


      const ids = res.data.data.map((item) => item.eventId._id);
      setWishlistIds(ids);
    };

    fetchWishlist();
  }, [userEmail]);

  /* ---------------- TOGGLE WISHLIST ---------------- */
  const toggleWishlist = async (eventId) => {
    if (!userEmail) {
      alert("Please login to add wishlist");
      return;
    }

    const res = await axios.post("/api/wishlist/toggle", {
      userEmail,
      eventId,
    })


    if (res.data.wishlisted) {
      setWishlistIds((prev) => [...prev, eventId]);
    } else {
      setWishlistIds((prev) => prev.filter((id) => id !== eventId));
    }
  };

  return (
    <div className="all-events-page">
      <h2 className="section-title">Popular Events</h2>

      <div className="events-grid">
        {eventsData.map((event) => (
          <div className="event-card" key={event._id}>
            <div className="card-image">
              <img
                src={event.mediaFiles?.[0] || "/assets/picture1.jpg"}
                alt={event.eventName}
              />



              <span className="tag">TRENDING</span>

              <h3 className="eventheading">{event.eventName}</h3>
              <p className="eventpara">{event.date}</p>

              <button
                className="wishlist-btn"
                onClick={() => toggleWishlist(event._id)}
              >
                {wishlistIds.includes(event._id) ? (
                  <IoIosHeart color="red" />
                ) : (
                  <IoIosHeartEmpty />
                )}
              </button>
            </div>

            <div className="bottom-purple">
              <div className="bottom-row">
                <div>
                  <p><LuMapPin /> {event.location}</p>
                  <p><CiClock1 /> {event.time}</p>
                  <p>
                    <IoPricetagsOutline /> From ₹
                    {event.seatingCategories?.[0]?.price || 0}
                  </p>
                </div>

                <button
                  className="book-btn"
                  onClick={() =>
                    navigate(`/event-details/${event._id}`)
                  }
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllEvents;
