import React, { useState,useEffect } from "react";
import "./Cart.css";
import { useNavigate } from "react-router-dom";
import { RiDeleteBin5Line } from "react-icons/ri";
import axios from "../../api/axios";

const Cart = () => {
  const navigate = useNavigate();

  const getCart = () =>
    JSON.parse(localStorage.getItem("cart")) || {
      ticket: null,
      hotels: [],
    };

  const [cart, setCart] = useState(getCart());
useEffect(() => {
  const storedCart = JSON.parse(localStorage.getItem("cart"));
  if (storedCart) {
    setCart(storedCart);
  }
}, []);

  const ticket = cart.ticket;
  const hotels = cart.hotels;

  const ticketQty = ticket ? ticket.adults + ticket.children : 0;
  const ticketTotal = ticket ? ticketQty * ticket.pricePerTicket : 0;
  const hotelTotal = hotels.reduce((sum, h) => sum + h.price, 0);

  const subtotal = ticketTotal + hotelTotal;
  const discount = subtotal > 0 ? 10 : 0;
  const finalTotal = subtotal - discount;

  /* -------- UPDATE TICKET QTY -------- */
  const updateTicketQty = (delta) => {
    if (!ticket) return;

    const newAdults = Math.max(ticket.adults + delta, 1);

    const updatedCart = {
      ...cart,
      ticket: {
        ...ticket,
        adults: newAdults,
      },
    };

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  /* -------- REMOVE TICKET -------- */
  const removeTicket = () => {
    const updatedCart = { ...cart, ticket: null };
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  /* -------- REMOVE HOTEL -------- */
  const removeHotel = (index) => {
    const updatedHotels = cart.hotels.filter((_, i) => i !== index);

    const updatedCart = {
      ...cart,
      hotels: updatedHotels,
    };

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  /* -------- PROCEED TO PAY -------- */
  const proceedToPay = async () => {
    try {
      await axios.post("/api/cart/create", {
        userEmail: "nandananavya156@gmail.com",
        cart,
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
          {ticket && (
            <>
              <h3 className="cart-section-title">Tickets</h3>

              <div className="cart-card">
                <img
                  src={ticket.image}
                  alt={ticket.eventName}
                  className="cart-card-img"
                />

                <div className="cart-card-content">
                  <h4>{ticket.eventName}</h4>
                  <p>
                    Adults: {ticket.adults}, Children: {ticket.children}
                  </p>
                  <p>₹{ticket.pricePerTicket} per ticket</p>

                  <div className="cart-qty-row">
                    <button onClick={() => updateTicketQty(-1)}>-</button>
                    <span>{ticketQty}</span>
                    <button onClick={() => updateTicketQty(1)}>+</button>

                    <button onClick={removeTicket}>
                      <RiDeleteBin5Line />
                    </button>
                  </div>
                </div>

                <p className="cart-price">₹{ticketTotal}</p>
              </div>
            </>
          )}

          {/* HOTELS */}
          {hotels.length > 0 && (
            <>
              <h3 className="cart-section-title">Hotels</h3>

              {hotels.map((hotel, index) => (
                <div className="cart-card" key={index}>
                  <img src={hotel.image} alt={hotel.name} />
                  <div>
                    <h4>{hotel.name}</h4>
                    <p>₹{hotel.price} / night</p>
                  </div>

                  <button onClick={() => removeHotel(index)}>
                    <RiDeleteBin5Line />
                  </button>
                </div>
              ))}
            </>
          )}
        </div>

        {/* RIGHT */}
        <div className="cart-right">
          <div className="summary-totals">
            <div>
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            <div>
              <span>Discount</span>
              <span>-₹{discount}</span>
            </div>
            <div>
              <strong>Total</strong>
              <strong>₹{finalTotal}</strong>
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
