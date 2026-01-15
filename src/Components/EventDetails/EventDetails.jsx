import React, { useEffect, useState } from "react";
import "./EventDetails.css";
import { RiDeleteBin5Line } from "react-icons/ri";
import { IoStar } from "react-icons/io5";
import { FaWifi, FaSwimmer, FaTimes } from "react-icons/fa";
import { MdBreakfastDining } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../api/axios";

const EventDetails = () => {
  const navigate = useNavigate();
  const { id: eventId } = useParams();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  const [hotels, setHotels] = useState([]);

  const [adultCount, setAdultCount] = useState(0);
  const [childCount, setChildCount] = useState(0);
  const [seatType, setSeatType] = useState("");

  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || {
      ticket: null,
      hotels: [],
    }
  );

  const user = JSON.parse(localStorage.getItem("user"));
  const userEmail = user?.email;

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await axios.get(`/api/events/${eventId}`);
        const eventData = res.data.data;
        setEvent(eventData);

        if (eventData.seatingCategories?.length > 0) {
          setSeatType(eventData.seatingCategories[0].name);
        }

        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchEvent();
  }, [eventId]);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const res = await axios.get("/api/hotels/all-hotels");

        const normalizedHotels = res.data.data.map((hotel) => ({
          id: hotel._id,
          name: hotel.hotelName,
          image: hotel.mediaFiles?.[0] || "/assets/picture.jpg",
          location: hotel.location,
          price: hotel.roomCategories?.[0]?.price || 0,
          rating: 4.5,
          reviews: 100,
          distance: hotel.location || "Near event location",
          amenities: [
            "Free WiFi",
            "Breakfast Included",
            "Pool",
            "Free Cancellation",
          ],
        }));


        setHotels(normalizedHotels);
      } catch (error) {
        console.error("Hotel fetch failed", error);
      }
    };

    fetchHotels();
  }, []);

  if (loading) return <p style={{ textAlign: "center" }}>Loading event...</p>;
  if (!event) return <p style={{ textAlign: "center" }}>Event not found</p>;

  const selectedCategory = event.seatingCategories.find(
    (cat) => cat.name === seatType
  );

  const ticketPrice = selectedCategory ? selectedCategory.price : 0;
  const totalTickets = adultCount + childCount;

  const handleIncrement = (setter, value) => setter(value + 1);
  const handleDecrement = (setter, value) =>
    setter(value > 0 ? value - 1 : 0);

  const amenityIcons = {
    "Free WiFi": <FaWifi />,
    "Breakfast Included": <MdBreakfastDining />,
    Pool: <FaSwimmer />,
    "Free Cancellation": <FaTimes />,
  };

  /* ---------------- ADD TICKET ---------------- */
  const addTicketToCart = async () => {
    if (!userEmail) {
      alert("Please login to book tickets");
      navigate("/login");
      return;
    }

    if (adultCount === 0) {
      alert("Please select at least 1 adult.");
      return;
    }

    const totalAmount = totalTickets * ticketPrice;

    try {
      const res = await axios.post("/api/ticketBooking/create", {
        eventId,
        seatType,
        adults: adultCount,
        children: childCount,
        pricePerTicket: ticketPrice,
        totalAmount,
        user: { email: userEmail },
      });

      if (res.data.ticketType === "online") {
        alert("Ticket access details have been sent to your email.");
      }

      if (res.data.ticketType === "pdf") {
        alert("PDF ticket has been sent to your email.");
      }

      const existingCart =
  JSON.parse(localStorage.getItem("cart")) || {
    ticket: null,
    hotels: [],
  };

const updatedCart = {
  ...existingCart,
  ticket: {
    seatType,
    adults: adultCount,
    children: childCount,
    totalTickets,
    pricePerTicket: ticketPrice,
    total: totalAmount,
    eventName: event.eventName,
    image: event.mediaFiles?.[0],
  },
};

      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    } catch (error) {
      console.error(error);
      alert("Ticket booking failed");
    }
  };

  const addHotelToCart = (hotel) => {
    if (!cart.ticket) {
      alert("Please select the ticket first");
      return;
    }

    if (isHotelAdded(hotel.id)) {
      goToCart();
      return;
    }

    if (cart.hotels.length >= cart.ticket.totalTickets) {
      alert(`You can add only ${cart.ticket.totalTickets} hotel room(s)`);
      return;
    }

    const updatedCart = {
      ...cart,
      hotels: [...cart.hotels, hotel],
    };

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const goToCart = () => {
  const storedCart = JSON.parse(localStorage.getItem("cart"));

  if (!storedCart || !storedCart.ticket) {
    alert("Please add a ticket first");
    return;
  }

  if (storedCart.hotels.length !== storedCart.ticket.totalTickets) {
    alert(`Please select ${storedCart.ticket.totalTickets} hotel room(s)`);
    return;
  }

  navigate("/cart");
};

  const isHotelAdded = (hotelId) => {
    return cart.hotels.some((h) => h.id === hotelId);
  };

  return (
    <div className="EventDetails">

      <div className="EventDetailsBanner">
        <img
          src={event.mediaFiles?.[0] || "/assets/picture.jpg"}
          alt={event.eventName}
        />

        <h1 className="EventDetailsTitle">{event.eventName}</h1>
      </div>

      {/* Ticket Section (UNCHANGED) */}
      <div className="EventDetailsSelectorSection">
        <div className="EventDetailsLeftBox">
          <img
            src={event.mediaFiles?.[0] || "/assets/picture.jpg"}
            alt={event.eventName}
            className="EventDetailsMiniImage"
          />



        </div>

        <div className="EventDetailsRightBox">
          <div className="EventDetailsSeatRow">
            <label>Seat Type</label>

            <select
              value={seatType}
              onChange={(e) => setSeatType(e.target.value)}
            >
              {event.seatingCategories.map((cat) => (
                <option
                  key={cat._id}
                  value={cat.name}
                  disabled={cat.ticketsAvailable === 0}
                >
                  {cat.name}
                  {cat.ticketsAvailable === 0 ? " (Sold Out)" : ""}
                </option>
              ))}
            </select>

            <div className="EventDetailsPrice">
              <span className="EventDetailsPricePr">Price:</span>
              <span className="EventDetailsPriceValue">
                ₹{ticketPrice}
              </span>
              <span className="EventDetailsPriceText">
                per person
              </span>
            </div>
          </div>

          <div className="EventDetailsGuestWrapper">
            <div className="GuestLeft">
              {/* Adults */}
              <div className="GuestCard">
                <div className="EventDetailsCounterRow">
                  <span className="EventDetailsLabel">Adults</span>
                  <div className="EventDetailsCounterBox">
                    <button
                      className="EventDetailsMinusBtn"
                      onClick={() =>
                        handleDecrement(setAdultCount, adultCount)
                      }
                    >
                      -
                    </button>
                    <span className="EventDetailsCountNumber">
                      {adultCount}
                    </span>
                    <button
                      className="EventDetailsPlusBtn"
                      onClick={() =>
                        handleIncrement(setAdultCount, adultCount)
                      }
                    >
                      +
                    </button>
                    <button
                      className="EventDetailsTrashBtn"
                      onClick={() => setAdultCount(0)}
                    >
                      <RiDeleteBin5Line />
                    </button>
                  </div>
                </div>
              </div>

              {/* Children */}
              <div className="GuestCard">
                <div className="EventDetailsCounterRow">
                  <span className="EventDetailsLabel">
                    Children (&lt; 5 yrs)
                  </span>
                  <div className="EventDetailsCounterBox">
                    <button
                      className="EventDetailsMinusBtn"
                      onClick={() =>
                        handleDecrement(setChildCount, childCount)
                      }
                    >
                      -
                    </button>
                    <span className="EventDetailsCountNumber">
                      {childCount}
                    </span>
                    <button
                      className="EventDetailsPlusBtn"
                      onClick={() =>
                        handleIncrement(setChildCount, childCount)
                      }
                    >
                      +
                    </button>
                    <button
                      className="EventDetailsTrashBtn"
                      onClick={() => setChildCount(0)}
                    >
                      <RiDeleteBin5Line />
                    </button>
                  </div>
                </div>
              </div>

              {cart.ticket ? (
                <button
                  className="event-cta"
                  style={{ marginTop: "10px" }}
                  onClick={goToCart}
                >
                  Go to Cart
                </button>
              ) : (
                <button
                  className="event-cta"
                  style={{ marginTop: "10px" }}
                  onClick={addTicketToCart}
                  disabled={adultCount === 0 || ticketPrice === 0}
                >
                  Add Ticket to Cart
                </button>
              )}
            </div>

            <div className="GuestTotalBox">
              <p>
                Total:{" "}
                <span>
                  ₹{(adultCount + childCount) * ticketPrice}
                </span>
              </p>
              <small>(Price excludes 5% VAT)</small>
            </div>
          </div>
        </div>
      </div>

      {/* Hotels (DESIGN UNCHANGED) */}
      <div className="EventDetailsHotelList">
        {hotels.map((hotel) => (
          <div className="EventDetailsHotelCard" key={hotel.id}>
            <div className="EventDetailsHotelLeft">
              <span className="EventDetailsTopRated">Top Rated</span>
              <img
                src={hotel.image}
                className="eventImg"
                alt={hotel.name}
              />

            </div>

            <div className="EventDetailsHotelRight">
              <h3>{hotel.name}</h3>
              <p className="EventDetailsRating">
                <IoStar /> {hotel.rating} ({hotel.reviews} Reviews)
              </p>
              <p className="EventDetailsDistance">
                {hotel.distance}
              </p>

              <ul className="EventDetailsAmenities">
                {hotel.amenities.map((item, i) => (
                  <li key={i}>
                    {amenityIcons[item]} {item}
                  </li>
                ))}
              </ul>

              <p className="EventDetailsPricePerNight">
                ₹{hotel.price} / night
              </p>

              <button
                className="event-cta"
                style={{ marginTop: "10px", width: "150px" }}
                onClick={() => addHotelToCart(hotel)}
              >
                {isHotelAdded(hotel.id) ? "Go to Cart" : "Add Hotel"}
              </button>

            </div>
          </div>
        ))}
      </div>
    </div>
  );

};

export default EventDetails;
