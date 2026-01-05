import React, { useEffect, useState } from "react";
import "../AllEvents/AllEvents.css";
import axios from "axios";
import { LuMapPin } from "react-icons/lu";
import { CiClock1 } from "react-icons/ci";
import { IoPricetagsOutline } from "react-icons/io5";
import { IoIosHeart } from "react-icons/io";

const WishList = () => {
  const [wishlist, setWishlist] = useState([]);
const user = JSON.parse(localStorage.getItem("user"));
const userEmail = user?.email;

  useEffect(() => {
    if (!userEmail) return;

    const fetchWishlist = async () => {
      const res = await axios.get(
        `http://localhost:5000/api/wishlist/${userEmail}`
      );
      setWishlist(res.data.data);
    };

    fetchWishlist();
  }, [userEmail]);

  return (
    <div className="all-events-page">
      <h2 className="section-title">Wishlist</h2>

      <div className="events-grid">
        {wishlist.map((item) => {
          const event = item.eventId;

          return (
            <div className="event-card" key={item._id}>
              <div className="card-image">
                <img
                  src={
                    event.mediaFiles?.length
                      ? `http://localhost:5000/uploads/${event.mediaFiles[0]}`
                      : "/assets/picture1.jpg"
                  }
                  alt={event.eventName}
                />

                <span className="tag">WISHLIST</span>

                <h3 className="eventheading">{event.eventName}</h3>
                <p className="eventpara">{event.date}</p>

                <button className="wishlist-btn">
                  <IoIosHeart color="red" />
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

                  <button className="book-btn">Book Now</button>
                </div>
              </div>
            </div>
          );
        })}

        {wishlist.length === 0 && (
          <p className="no-events">No wishlisted events yet</p>
        )}
      </div>
    </div>
  );
};

export default WishList;
