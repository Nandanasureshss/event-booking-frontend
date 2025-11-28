import React, { useState } from "react";
import "./OrderDetails.css";
import { TbFileInvoice } from "react-icons/tb";
import { IoStarOutline, IoStar } from "react-icons/io5";
import { PiBankLight } from "react-icons/pi";
import { MdLocationOn, MdAccessTime, MdCalendarToday } from "react-icons/md";

const orderItems = [
  {
    id: 1,
    image: "/assets/picture5.jpg",
    title: "Coldplay Live Concert",
    price: "$49 × 2",
    seat: "Normal",
    date: "September 14",
    location: "Riyadh Arena",
    time: "07:00pm - 11:00pm",
  },
  {
    id: 2,
    image: "/assets/picture1.jpg",
    title: "Grand Riyadh Hotel",
    price: "$120",
    seat: "Deluxe King Room with Breakfast",
    date: "Sep 10 – Sep 12",
    location: "Luxury Suite",
    time: "",
  },
];

const priceDetails = [
  { label: "Tickets", value: "$45.00" },
  { label: "Hotel", value: "$45.00" },
  { label: "Subtotal", value: "$45.00" },
  { label: "Offer", value: "$45.00", color: "green" },
  { label: "Tax", value: "$45.00" },
  { label: "Discount", value: "-$10.00", color: "green" },
];

const OrderDetails = () => {
  const [ratings, setRatings] = useState({});
  const [showReviewBox, setShowReviewBox] = useState({});
  const [reviews, setReviews] = useState({});
  const [tempReview, setTempReview] = useState({});

  const handleRate = (itemId, star) => {
    setRatings((prev) => ({
      ...prev,
      [itemId]: star,
    }));
  };

  const submitReview = (itemId) => {
    if (!tempReview[itemId] || tempReview[itemId].trim() === "") return;

    setReviews((prev) => ({
      ...prev,
      [itemId]: tempReview[itemId],
    }));

    setShowReviewBox((prev) => ({
      ...prev,
      [itemId]: false,
    }));
  };

  return (
    <div className="orderDetailsPage">
      <div className="orderDetailsContainer">

        <div className="orderDetailsLeft">

          <div className="bigOrderCard">

            <p className="orderNumber">Order No: 267634627828</p>
            <div className="orderTopDivider"></div>

            <div className="orderItem">
              <img src={orderItems[0].image} className="orderDetailsImage" />

              <div className="orderDetailsInfo">
                <h3 className="orderTitle">{orderItems[0].title}</h3>

                <p className="orderDetailsPrice">{orderItems[0].price}</p>
                <p className="orderDetailsText">Seat type: {orderItems[0].seat}</p>

                <p className="orderDetailsMeta">
                  <MdCalendarToday className="orderIcon" /> {orderItems[0].date}
                </p>

                <div className="locationTimeRow">

                  <span className="orderDetailsMeta">
                    <MdLocationOn className="orderIcon" /> {orderItems[0].location}
                  </span>

                  <span className="orderDetailsMeta">
                    <MdAccessTime className="orderIcon" /> {orderItems[0].time}
                  </span>

                </div>


                <div className="orderDetailsReviewRow">
                  <div className="orderDetailsStars">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        onClick={() => handleRate(orderItems[0].id, star)}
                      >
                        {ratings[orderItems[0].id] >= star ? (
                          <IoStar color="#f4b400" />
                        ) : (
                          <IoStarOutline />
                        )}
                      </span>
                    ))}
                  </div>

                  {!reviews[orderItems[0].id] && (
                    <button
                      className="orderDetailsReviewBtn"
                      onClick={() =>
                        setShowReviewBox((prev) => ({
                          ...prev,
                          [orderItems[0].id]: true,
                        }))
                      }
                    >
                      Write a review
                    </button>
                  )}
                </div>

                {showReviewBox[orderItems[0].id] && !reviews[orderItems[0].id] && (
                  <div className="reviewInputBox">
                    <textarea
                      className="reviewTextarea"
                      placeholder="Write your review..."
                      onChange={(e) =>
                        setTempReview((prev) => ({
                          ...prev,
                          [orderItems[0].id]: e.target.value,
                        }))
                      }
                    ></textarea>

                    <button
                      className="submitReviewBtn"
                      onClick={() => submitReview(orderItems[0].id)}
                    >
                      Submit Review
                    </button>
                  </div>
                )}

                {reviews[orderItems[0].id] && (
                  <p className="submittedReviewText">
                    ⭐ Your Review: {reviews[orderItems[0].id]}
                  </p>
                )}
              </div>
            </div>

            <div className="itemDivider"></div>

            <div className="orderItem">
              <img src={orderItems[1].image} className="orderDetailsImage" />

              <div className="orderDetailsInfo">
                <h3 className="orderTitle">{orderItems[1].title}</h3>

                <p className="orderDetailsPrice">{orderItems[1].price}</p>
                <p className="orderDetailsText">{orderItems[1].seat}</p>

                <p className="orderDetailsMeta">
                  <MdCalendarToday className="orderIcon" /> {orderItems[1].date}
                </p>

                <div className="orderDetailsReviewRow">
                  <div className="orderDetailsStars">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        onClick={() => handleRate(orderItems[1].id, star)}
                      >
                        {ratings[orderItems[1].id] >= star ? (
                          <IoStar color="#f4b400" />
                        ) : (
                          <IoStarOutline />
                        )}
                      </span>
                    ))}
                  </div>

                  {!reviews[orderItems[1].id] && (
                    <button
                      className="orderDetailsReviewBtn"
                      onClick={() =>
                        setShowReviewBox((prev) => ({
                          ...prev,
                          [orderItems[1].id]: true,
                        }))
                      }
                    >
                      Write a review
                    </button>
                  )}
                </div>

                {showReviewBox[orderItems[1].id] && !reviews[orderItems[1].id] && (
                  <div className="reviewInputBox">
                    <textarea
                      className="reviewTextarea"
                      placeholder="Write your review..."
                      onChange={(e) =>
                        setTempReview((prev) => ({
                          ...prev,
                          [orderItems[1].id]: e.target.value,
                        }))
                      }
                    ></textarea>

                    <button
                      className="submitReviewBtn"
                      onClick={() => submitReview(orderItems[1].id)}
                    >
                      Submit Review
                    </button>
                  </div>
                )}

                {reviews[orderItems[1].id] && (
                  <p className="submittedReviewText">
                    ⭐ Your Review: {reviews[orderItems[1].id]}
                  </p>
                )}
              </div>
            </div>

          </div>
        </div>

        <div className="orderDetailsRight">
          <h3 className="priceTitle">Price Details</h3>

          {priceDetails.map((p, i) => (
            <div
              key={i}
              className="priceRow"
              style={{ color: p.color ? p.color : "black" }}
            >
              <span>{p.label}</span>
              <span className="priceValue">{p.value}</span>
            </div>
          ))}

          <div className="priceTotalRow">
            <span>Total Amount</span>
            <span className="totalAmount">$40.00</span>
          </div>

          <button className="paidByBtn">
            <span className="paidLeft">Paid by</span>
            <span className="paidRight">
              <PiBankLight className="bankIcon" /> Net Banking
            </span>
          </button>

          <button className="invoiceBtn"><TbFileInvoice  size={"20px"}/> Download invoice</button>
        </div>

      </div>
    </div>
  );
};

export default OrderDetails;
