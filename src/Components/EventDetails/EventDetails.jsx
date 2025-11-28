import React, { useState } from "react";
import "./EventDetails.css";
import { RiDeleteBin5Line } from "react-icons/ri";
import { IoStar } from "react-icons/io5";
import { FaWifi, FaSwimmer, FaTimes } from "react-icons/fa";
import { MdBreakfastDining } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const EventDetails = () => {

  const navigate = useNavigate();
  const [adultCount, setAdultCount] = useState(0); 
  const [childCount, setChildCount] = useState(0); 

  const [cart, setCart] = useState({
    ticket: null,
    hotel: null,
  });

  const handleIncrement = (setter, value) => setter(value + 1);
  const handleDecrement = (setter, value) =>
    setter(value > 0 ? value - 1 : 0);

  const amenityIcons = {
    "Free WiFi": <FaWifi />,
    "Breakfast Included": <MdBreakfastDining />,
    Pool: <FaSwimmer />,
    "Free Cancellation": <FaTimes />,
  };

  const hotels = [
    {
      id: 1,
      name: "Lorem Ipsum Hotel Abu Dhabi",
      rating: 4.9,
      reviews: 352,
      distance: "1.2 km from center",
      price: 220,
      image: "/assets/picture1.jpg",
      amenities: ["Free WiFi", "Breakfast Included", "Pool", "Free Cancellation"],
    },
    {
      id: 2,
      name: "Lorem Ipsum Hotel Abu Dhabi",
      rating: 4.9,
      reviews: 352,
      distance: "1.2 km from center",
      price: 120,
      image: "/assets/picture2.jpg",
      amenities: ["Free WiFi", "Breakfast Included", "Pool", "Free Cancellation"],
    },
    {
      id: 3,
      name: "Lorem Ipsum Hotel Abu Dhabi",
      rating: 4.9,
      reviews: 352,
      distance: "1.2 km from center",
      price: 120,
      image: "/assets/picture3.jpg",
      amenities: ["Free WiFi", "Breakfast Included", "Pool", "Free Cancellation"],
    },
  ];

  /* -------------------- FILTER LOGIC -------------------- */
  const [filters, setFilters] = useState({ sort: "", hotel: "", location: "" });
  const [filteredHotels, setFilteredHotels] = useState([]);

  const updateFilter = (type, value) => {
    const newFilters = { ...filters, [type]: value };
    setFilters(newFilters);

    if (!newFilters.sort && !newFilters.hotel && !newFilters.location) {
      setFilteredHotels([]);
      return;
    }

    let result = [...hotels];

    if (newFilters.hotel) {
      result = result.filter((h) => h.name === newFilters.hotel);
    }

    if (newFilters.location) {
      result = result.filter((h) => h.distance.includes(newFilters.location));
    }

    if (newFilters.sort === "price_low")
      result.sort((a, b) => a.price - b.price);

    if (newFilters.sort === "price_high")
      result.sort((a, b) => b.price - a.price);

    if (newFilters.sort === "rating")
      result.sort((a, b) => b.rating - a.rating);

    setFilteredHotels(result);
  };

  const clearFilters = () => {
    setFilters({ sort: "", hotel: "", location: "" });
    setFilteredHotels([]);
  };


  const addTicketToCart = () => {
    if (adultCount === 0) {
      alert("Please select at least 1 adult.");
      return;
    }

    setCart({
      ...cart,
      ticket: {
        adults: adultCount,
        children: childCount,
        total: (adultCount + childCount) * 49,
      },
    });
  };

  const addHotelToCart = (hotel) => {
    setCart({
      ...cart,
      hotel: hotel,
    });
  };

  const goToCart = () => {
    navigate("/cart", { state: cart });
  };

  return (
    <div className="EventDetails">

      {/* Banner */}
      <div className="EventDetailsBanner">
        <img src="/assets/picture4.jpg" alt="banner" />
        <h1 className="EventDetailsTitle">FESTIVAL LIGHTS</h1>
      </div>

      {/* -------------------- Ticket Section -------------------- */}
      <div className="EventDetailsSelectorSection">
        <div className="EventDetailsLeftBox">
          <img src="/assets/picture5.jpg" alt="event" className="EventDetailsMiniImage" />
        </div>

        <div className="EventDetailsRightBox">

          <div className="EventDetailsSeatRow">
            <label>Seat Type</label>
            <select>
              <option>VIP</option>
              <option>VVIP</option>
              <option>Normal</option>
            </select>

            <div className="EventDetailsPrice">
              <span className="EventDetailsPricePr">Price:</span>
              <span className="EventDetailsPriceValue">$49</span>
              <span className="EventDetailsPriceText">per person</span>
            </div>
          </div>

          <div className="EventDetailsGuestCount">
            <div className="EventDetailsGuestWrapper">

              <div className="GuestLeft">

                <div className="GuestCard">
                  <div className="EventDetailsCounterRow">
                    <span className="EventDetailsLabel">Adults</span>
                    <div className="EventDetailsCounterBox">
                      <button className="EventDetailsMinusBtn"
                        onClick={() => handleDecrement(setAdultCount, adultCount)}> - </button>

                      <span className="EventDetailsCountNumber">{adultCount}</span>

                      <button className="EventDetailsPlusBtn"
                        onClick={() => handleIncrement(setAdultCount, adultCount)}> + </button>

                      <button className="EventDetailsTrashBtn"
                        onClick={() => setAdultCount(0)}>
                        <RiDeleteBin5Line />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="GuestCard">
                  <div className="EventDetailsCounterRow">
                    <span className="EventDetailsLabel">Children (&lt; 5 yrs)</span>
                    <div className="EventDetailsCounterBox">
                      <button className="EventDetailsMinusBtn"
                        onClick={() => handleDecrement(setChildCount, childCount)}> - </button>

                      <span className="EventDetailsCountNumber">{childCount}</span>

                      <button className="EventDetailsPlusBtn"
                        onClick={() => handleIncrement(setChildCount, childCount)}> + </button>

                      <button className="EventDetailsTrashBtn"
                        onClick={() => setChildCount(0)}>
                        <RiDeleteBin5Line />
                      </button>
                    </div>
                  </div>
                </div>

                <p className="EventDetailsFreeEntryText">
                  Free entry for children below 5 years
                </p>

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
                    disabled={adultCount === 0}
                  >
                    Add Ticket to Cart
                  </button>
                )}

              </div>

              {/* Total */}
              <div className="GuestTotalBox">
                <p>Total: <span>${(adultCount + childCount) * 49}</span></p>
                <small>(Price excludes 5% VAT)</small>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* -------------------- Filters -------------------- */}
      <div className="EventDetailsFilters">
        <select value={filters.sort} onChange={(e) => updateFilter("sort", e.target.value)}>
          <option value="">Sort By</option>
          <option value="price_low">Price Low → High</option>
          <option value="price_high">Price High → Low</option>
          <option value="rating">Top Rated</option>
        </select>

        <select value={filters.hotel} onChange={(e) => updateFilter("hotel", e.target.value)}>
          <option value="">Hotel</option>
          {hotels.map((h) => (
            <option key={h.id} value={h.name}>{h.name}</option>
          ))}
        </select>

        <select value={filters.location} onChange={(e) => updateFilter("location", e.target.value)}>
          <option value="">Location</option>
          <option value="1.2 km">1.2 km from center</option>
        </select>

        <span className="EventDetailsClearBtn" onClick={clearFilters}>
          Clear All
        </span>
      </div>

      {/* -------------------- Hotels -------------------- */}
      <div className="EventDetailsHotelList">
        {filteredHotels.map((hotel) => (
          <div className="EventDetailsHotelCard" key={hotel.id}>

            <div className="EventDetailsHotelLeft">
              <span className="EventDetailsTopRated">Top Rated</span>
              <img src={hotel.image} alt={hotel.name} />
            </div>

            <div className="EventDetailsHotelRight">
              <h3>{hotel.name}</h3>

              <p className="EventDetailsRating">
                <span className="eventDetailStar">
                  <IoStar /> {hotel.rating}
                </span>
                ({hotel.reviews} Reviews)
              </p>

              <p className="EventDetailsDistance">{hotel.distance}</p>

              <ul className="EventDetailsAmenities">
                {hotel.amenities.map((item, index) => (
                  <li key={index}>
                    {amenityIcons[item]} {item}
                  </li>
                ))}
              </ul>

              <a className="EventDetailsMapLink">Show on Map</a>

              <p className="EventDetailsPricePerNight">${hotel.price} / night</p>

              {cart.hotel ? (
                <button
                  className="event-cta"
                  style={{ marginTop: "10px", width: "150px" }}
                  onClick={goToCart}
                >
                  Go to Cart
                </button>
              ) : (
                <button
                  className="event-cta"
                  style={{ marginTop: "10px", width: "150px" }}
                  onClick={() => addHotelToCart(hotel)}
                >
                  Add Hotel
                </button>
              )}

            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default EventDetails;
