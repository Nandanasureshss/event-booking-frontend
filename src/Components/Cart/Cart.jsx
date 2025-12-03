import React, { useState } from "react";
import "./Cart.css";
import { useLocation, useNavigate } from "react-router-dom";
import { RiDeleteBin5Line } from "react-icons/ri";

const Cart = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const cart = state || { ticket: null, hotel: null };

  const ticket = cart.ticket;
  const hotel = cart.hotel;

  const [ticketQty, setTicketQty] = useState(
    ticket ? ticket.adults + ticket.children : 0
  );

  const [hotelQty, setHotelQty] = useState(hotel ? 1 : 0); 

  const ticketTotal = ticket ? ticketQty * 49 : 0;
  const hotelTotal = hotel ? hotel.price * hotelQty : 0;
  const subtotal = ticketTotal + hotelTotal;
  const discount = subtotal > 0 ? 10 : 0; 
  const finalTotal = subtotal - discount;

  const removeTicket = () => setTicketQty(0);
  const removeHotel = () => setHotelQty(0);

  return (
    <div className="cart-page">

      <h2 className="cart-title">Your Cart</h2>
      <p className="cart-subtitle">
        Review your selected events and hotels before checkout
      </p>

      <div className="cart-layout">
        
        <div className="cart-left">

          {ticketQty > 0 && (
            <>
              <h3 className="cart-section-title">Tickets</h3>
              <div className="cart-card">
                <img
                  src="/assets/picture5.jpg"
                  alt="Ticket"
                  className="cart-card-img"
                />

                <div className="cart-card-content">
                  <h4>Coldplay Live Concert</h4>
                  <p className="cart-card-desc">
                    Experience an unforgettable night of live music
                  </p>

                  <p className="cart-card-meta">📅 Sep 10, 08:00 PM</p>
                  <p className="cart-card-meta">📍 Riyadh Arena</p>

                  <p className="cart-card-price-line">$49 per ticket</p>

                  <div className="cart-qty-row">
                    <button
                      className="qty-btn"
                      onClick={() => setTicketQty(ticketQty > 1 ? ticketQty - 1 : 1)}
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

                <p className="cart-price">${ticketTotal.toFixed(2)}</p>
              </div>
            </>
          )}

          {hotelQty > 0 && hotel && (
            <>
              <h3 className="cart-section-title">Hotels</h3>
              <div className="cart-card">
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  className="cart-card-img"
                />

                <div className="cart-card-content">
                  <h4>{hotel.name}</h4>
                  <p className="cart-card-desc">Deluxe King Room with Breakfast</p>

                  <p className="cart-card-meta">📅 Sep 10 – Sep 12</p>
                  <p className="cart-card-meta">Luxury Suite</p>

                  <p className="cart-card-price-line">$120 per night</p>

                  <div className="cart-qty-row">
                    <button
                      className="qty-btn"
                      onClick={() => setHotelQty(hotelQty > 1 ? hotelQty - 1 : 1)}
                    >
                      -
                    </button>

                    <span className="qty-value">{hotelQty}</span>

                    <button
                      className="qty-btn"
                      onClick={() => setHotelQty(hotelQty + 1)}
                    >
                      +
                    </button>

                    <button className="delete-btn" onClick={removeHotel}>
                      <RiDeleteBin5Line />
                    </button>
                  </div>
                </div>

                <p className="cart-price">${hotelTotal.toFixed(2)}</p>
              </div>
            </>
          )}

        </div>

        <div className="cart-right">
          <h3 className="summary-title">Review your cart</h3>

          <div className="summary-items">

            {ticketQty > 0 && (
              <div className="summary-item">
                <img src="/assets/picture5.jpg" alt="ticket" />
                <div>
                  <p className="sum-name">Coldplay Live Concert</p>
                  <p className="sum-qty">{ticketQty}x</p>
                  <p className="sum-price">${ticketTotal.toFixed(2)}</p>
                </div>
              </div>
            )}

            {hotelQty > 0 && hotel && (
              <div className="summary-item">
                <img src={hotel.image} alt="hotel" />
                <div>
                  <p className="sum-name">{hotel.name}</p>
                  <p className="sum-qty">{hotelQty}x</p>
                  <p className="sum-price">${hotelTotal.toFixed(2)}</p>
                </div>
              </div>
            )}

          </div>

          <div className="discount-row">
            <input placeholder="Discount code" />
            <button>Apply</button>
          </div>

          <div className="summary-totals">
            <div className="sum-row">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            <div className="sum-row">
              <span>Discount</span>
              <span>-${discount.toFixed(2)}</span>
            </div>

            <div className="sum-row total">
              <span>Total</span>
              <span>${finalTotal.toFixed(2)}</span>
            </div>
          </div>

          <button className="pay-btn">Proceed to Pay</button>
        </div>

      </div>
    </div>
  );
};

export default Cart;
