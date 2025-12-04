import React, { useState } from "react";
import "./Hero.css";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import { IoIosArrowDown } from "react-icons/io";
import "swiper/css/pagination";
import { useNavigate } from "react-router-dom";

function Hero() {
    const [openDropdown, setOpenDropdown] = useState(null);
    const [showCalendar, setShowCalendar] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);

    const navigate = useNavigate(); // ⭐ Navigation

    const slides = [
        {
            id: 1,
            image: "assets/picture1.jpg",
            title: "Lorem ipsum dolor sit amet consectetur.",
            description:
                "Vel perspiciatis illum nemo odit. Quisquam commodi eius natus facilis ducimus deleniti iste aliquid.",
            primaryBtn: "BOOK NOW",
            meta1: "Top rated venues",
            meta2: "Exclusive events",
        },
        {
            id: 2,
            image: "assets/picture2.jpg",
            title: "Experience unforgettable moments.",
            description:
                "Explore the best concerts, activities, and entertainment curated just for you.",
            primaryBtn: "BOOK NOW",
            meta1: "New deals weekly",
            meta2: "Premium experiences",
        },
        {
            id: 3,
            image: "assets/picture3.jpg",
            title: "Discover events crafted for your lifestyle.",
            description:
                "From concerts to workshops—find events that inspire and delight.",
            primaryBtn: "BOOK NOW",
            meta1: "Trending experiences",
            meta2: "Best picks for you",
        },
    ];

    return (
        <section className="hero">

            <Swiper
                modules={[Pagination, Autoplay]}
                autoplay={{ delay: 4000 }}
                loop={true}
                pagination={{ clickable: true }}
                className="hero-swiper"
            >
                {slides.map((slide) => (
                    <SwiperSlide key={slide.id}>
                        <div className="hero-slide">
                            <img src={slide.image} className="hero-bg" alt="slide" />

                            <div className="hero-inner page-container">

                                <div className="hero-top-filter">
                                    <div
                                        className="filter-item"
                                        onClick={() =>
                                            setOpenDropdown(openDropdown === 1 ? null : 1)
                                        }
                                    >
                                        Locatio <span className="arrow"><IoIosArrowDown /></span>

                                        {openDropdown === 1 && (
                                            <div className="dropdown-menu">
                                                <div>Dubai</div>
                                                <div>United Kingdom</div>
                                                <div>Oman</div>
                                                <div>Paris</div>
                                                <div>London</div>
                                                <div>New York</div>
                                            </div>
                                        )}
                                    </div>

                                    <div className="divider"></div>

                                    <div
                                        className="filter-item"
                                        onClick={() => setShowCalendar(!showCalendar)}
                                    >
                                        Select Date
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

                                    <div className="divider"></div>

                                    <div className="filter-item">
                                        Select Event <span className="arrow"><IoIosArrowDown /></span>
                                    </div>

                                    {/* ⭐ BOOK NOW TOP BUTTON */}
                                    <button
                                        className="hero-primary"
                                        onClick={() => navigate("/allevents")}
                                    >
                                        {slide.primaryBtn}
                                    </button>
                                </div>

                                <div className="hero-content">
                                    <h1>{slide.title}</h1>
                                    <p>{slide.description}</p>

                                    <div className="hero-cta-row">
                                        {/* ⭐ BOOK NOW BOTTOM BUTTON */}
                                        <button
                                            className="hero-primary"
                                            onClick={() => navigate("/allevents")}
                                        >
                                            {slide.primaryBtn}
                                        </button>
                                    </div>
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
