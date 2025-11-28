import React, { useState } from "react";
import "./MyOrders.css";
import { useNavigate } from "react-router-dom";

const orders = [
  {
    id: 1,
    date: "30/08/2025 11:45 am",
    orderNo: "267836487228",
    title: "Coldplay Live Concert",
    price: 49,
    qty: 2,
    total: 98,
    image: "/assets/picture5.jpg",
    status: "upcoming",
  },
  {
    id: 2,
    date: "20/08/2025 11:45 am",
    orderNo: "267854627829",
    title: "Light Festival Fusion",
    price: 99,
    qty: 2,
    total: 198,
    image: "/assets/picture6.jpg",
    status: "past",
  },
  {
    id: 3,
    date: "22/07/2025 01:05 pm",
    orderNo: "267856487228",
    title: "Coldplay Live Concert",
    price: 49,
    qty: 2,
    total: 98,
    image: "/assets/picture5.jpg",
    status: "cancelled",
  },
  {
    id: 4,
    date: "30/06/2025 11:45 am",
    orderNo: "267854627829",
    title: "Light Festival Fusion",
    price: 99,
    qty: 2,
    total: 198,
    image: "/assets/picture6.jpg",
    status: "upcoming",
  },
];

const MyOrders = () => {
  const [activeTab, setActiveTab] = useState("all");
  const navigate = useNavigate();

  const filteredOrders =
    activeTab === "all"
      ? orders
      : orders.filter((order) => order.status === activeTab);

  return (
    <div className="myOrdersPage">
      <h2 className="pageTitle">My Orders</h2>

      <div className="ordersContainer">

        {/* Tabs */}
        <div className="ordersTabs">
          <span className={activeTab === "all" ? "tabActive" : ""} onClick={() => setActiveTab("all")}>All</span>
          <span className={activeTab === "upcoming" ? "tabActive" : ""} onClick={() => setActiveTab("upcoming")}>Upcoming</span>
          <span className={activeTab === "past" ? "tabActive" : ""} onClick={() => setActiveTab("past")}>Past</span>
          <span className={activeTab === "cancelled" ? "tabActive" : ""} onClick={() => setActiveTab("cancelled")}>Cancelled</span>
        </div>

        {/* Order Cards */}
        <div className="ordersList">
          {filteredOrders.length === 0 ? (
            <p className="noOrders">No orders available.</p>
          ) : (
            filteredOrders.map((order) => (
              <div key={order.id} className="orderCard">
                
                <div className="orderHeader">
                  <span>{order.date}</span>
                  <span>Order No: {order.orderNo}</span>
                  <span className="orderTotal">Total: ${order.total}</span>
                </div>

                <div className="orderBody">
                  <img src={order.image} alt={order.title} className="orderImage" />

                  <div className="orderInfo">
                    <h4 className="orderTitle">{order.title}</h4>
                    <p className="orderPrice">${order.price} × {order.qty}</p>
                  </div>

                  <button
                    className="detailsBtn"
                    onClick={() =>
                      navigate("/orderdetails", { state: { order } })
                    }
                  >
                    More details
                  </button>

                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};

export default MyOrders;
