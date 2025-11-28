import React from "react";
import "../AllEvents/AllEvents.css";
import { LuMapPin } from "react-icons/lu";
import { CiClock1 } from "react-icons/ci";
import { IoPricetagsOutline } from "react-icons/io5";
import { IoIosHeart} from "react-icons/io";

const eventsData = [
    {
        id: 1,
        title: "Coldplay Live",
        date: "September 14",
        image: "/assets/picture1.jpg",
    },
    {
        id: 2,
        title: "Festive Fusion",
        date: "October 10",
        image: "/assets/picture2.jpg",
    },
    {
        id: 3,
        title: "Formula 1",
        date: "September 26",
        image: "/assets/picture3.jpg",
    },
    {
        id: 4,
        title: "Coldplay Live",
        date: "September 14",
        image: "/assets/picture1.jpg",
    },
    {
        id: 5,
        title: "Festive Fusion",
        date: "October 10",
        image: "/assets/picture2.jpg",
    },
    {
        id: 6,
        title: "Formula 1",
        date: "September 26",
        image: "/assets/picture3.jpg",
    },
    {
        id: 7,
        title: "Coldplay Live",
        date: "September 14",
        image: "/assets/picture1.jpg",
    },
    {
        id: 8,
        title: "Festive Fusion",
        date: "October 10",
        image: "/assets/picture2.jpg",
    },
    {
        id: 9,
        title: "Formula 1",
        date: "September 26",
        image: "/assets/picture3.jpg",
    },
];

const WishList = () => {
    return (
        <div className="all-events-page">
            <h2 className="section-title">Popular Events</h2>

            <div className="events-grid">
                {eventsData.map((event) => (
                    <div className="event-card">
                        <div className="card-image">
                            <img src={event.image} alt={event.title} />
                            <span className="tag">TRENDING</span>
                             <h3 className="eventheading">{event.title}</h3>
                            <p className="eventpara">{event.date}</p>
                            <button className="wishlist-btn"><IoIosHeart color="red" />
</button>
                        </div>

                        <div className="bottom-purple">
                           

                            <div className="bottom-row">
                                <div>
                                    <p><LuMapPin /> Riyadh Arena</p>
                                    <p><CiClock1 />07:00pm - 11:00pm</p>
                                    <p><IoPricetagsOutline /> From $49</p>
                                </div>

                                <button className="book-btn">Book Now</button>
                            </div>
                        </div>
                    </div>

                ))}
            </div>
        </div>
    );
};

export default WishList;
