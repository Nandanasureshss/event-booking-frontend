import React, { useState } from "react";
import "./Cart.css";
import { useLocation, useNavigate } from "react-router-dom";
import { RiDeleteBin5Line } from "react-icons/ri";
import axios from "axios";

const Cart = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const cart = state || { ticket: null, hotels: [] };

  const ticket = cart.ticket;
  const hotels = cart.hotels || [];

  const [ticketQty, setTicketQty] = useState(
    ticket ? ticket.adults + ticket.children : 0
  );

  const [hotelQty, setHotelQty] = useState(hotels.length);

  const ticketTotal = ticket ? ticket.total : 0;
  const hotelTotal = hotels.reduce((sum, h) => sum + h.price, 0);

  const subtotal = ticketTotal + hotelTotal;
  const discount = subtotal > 0 ? 10 : 0;
  const finalTotal = subtotal - discount;

  const removeTicket = () => setTicketQty(0);
  const removeHotel = () => setHotelQty(0);

  const proceedToPay = async () => {
    try {
      await axios.post("http://localhost:5000/api/cart/create", {
        userEmail: "nandananavya156@gmail.com",
        ticket,
        hotels,
        totalAmount: finalTotal,
      });

      alert("Cart saved. Proceeding to payment...");
    } catch (error) {
      console.error(error);
      alert("Failed to save cart");
    }
  };

  return (
    <div className="cart-page">
      <h2 className="cart-title">Your Cart</h2>
      <p className="cart-subtitle">
        Review your selected events and hotels before checkout
      </p>

      <div className="cart-layout">
        {/* LEFT */}
        <div className="cart-left">
          {/* TICKETS */}
          {ticketQty > 0 && ticket && (
            <>
              <h3 className="cart-section-title">Tickets</h3>

              <div className="cart-card">
                <img
                  src={`http://localhost:5000/uploads/${ticket.image}`}
                  alt={ticket.eventName}
                  className="cart-card-img"
                />

                <div className="cart-card-content">
                  <h4>{ticket.eventName}</h4>

                  <p className="cart-card-desc">
                    Adults: {ticket.adults}, Children: {ticket.children}
                  </p>

                  <p className="cart-card-price-line">
                    ₹{ticket.pricePerTicket} per ticket
                  </p>

                  <div className="cart-qty-row">
                    <button
                      className="qty-btn"
                      onClick={() =>
                        setTicketQty(ticketQty > 1 ? ticketQty - 1 : 1)
                      }
                    >
                      -
                    </button>

                    <span className="qty-value">{ticketQty}</span>

                    <button
                      className="qty-btn"
                      onClick={() => setTicketQty(ticketQty + 1)}
                    >
                      +
                    </button>

                    <button className="delete-btn" onClick={removeTicket}>
                      <RiDeleteBin5Line />
                    </button>
                  </div>
                </div>

                <p className="cart-price">₹{ticketTotal}</p>
              </div>
            </>
          )}

          {/* HOTELS */}
          {hotelQty > 0 && hotels.length > 0 && (
            <>
              <h3 className="cart-section-title">Hotels</h3>

              {hotels.map((hotel, index) => (
                <div className="cart-card" key={index}>
                  <img
                    src={hotel.image}
                    alt={hotel.name}
                    className="cart-card-img"
                  />

                  <div className="cart-card-content">
                    <h4>{hotel.name}</h4>
                    <p className="cart-card-desc">Standard Room</p>
                    <p className="cart-card-price-line">
                      ₹{hotel.price} / night
                    </p>
                  </div>

                  <p className="cart-price">₹{hotel.price}</p>
                </div>
              ))}
            </>
          )}
        </div>

        {/* RIGHT */}
        <div className="cart-right">
          <h3 className="summary-title">Review your cart</h3>

          <div className="summary-items">
            {ticketQty > 0 && ticket && (
              <div className="summary-item">
                <img
                  src={`http://localhost:5000/uploads/${ticket.image}`}
                  alt="ticket"
                />
                <div>
                  <p className="sum-name">{ticket.eventName}</p>
                  <p className="sum-qty">{ticketQty}x</p>
                  <p className="sum-price">₹{ticketTotal}</p>
                </div>
              </div>
            )}

            {hotels.map((hotel, i) => (
              <div className="summary-item" key={i}>
                <img src={hotel.image} alt="hotel" />
                <div>
                  <p className="sum-name">{hotel.name}</p>
                  <p className="sum-qty">1x</p>
                  <p className="sum-price">₹{hotel.price}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="discount-row">
            <input placeholder="Discount code" />
            <button>Apply</button>
          </div>

          <div className="summary-totals">
            <div className="sum-row">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>

            <div className="sum-row">
              <span>Discount</span>
              <span>-₹{discount}</span>
            </div>

            <div className="sum-row total">
              <span>Total</span>
              <span>₹{finalTotal}</span>
            </div>
          </div>

          <button className="pay-btn" onClick={proceedToPay}>
            Proceed to Pay
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
