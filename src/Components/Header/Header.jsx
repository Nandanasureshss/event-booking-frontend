import React, { useState } from "react";
import { BsCart2 } from "react-icons/bs";
import { IoPersonOutline, IoSearchOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import "./Header.css";

function Header() {
  const [openProfile, setOpenProfile] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <header className="header">
        <div className="page-container header-inner">
          <div className="header-left">
            <div className="header-logo">
              <img src="/assets/logo4.jpg" alt="EventHub logo" />
            </div>

            <nav className="header-nav">
              <a onClick={() => navigate("/")}>Home</a>
              <a onClick={() => navigate("/events")}>Event</a>
              <a onClick={() => navigate("/categories")}>Category</a>
              <a onClick={() => navigate("/contact")}>Contact</a>
            </nav>
          </div>

          <div className="header-right">
            <button className="header-icon-button" aria-label="search">
              <span><IoSearchOutline size={22} /></span>
            </button>

            <button
              className="header-icon-button"
              aria-label="Cart"
              onClick={() => navigate("/cart")}  
            >
              <span><BsCart2 size={22} /></span>
            </button>


            <button
              className="header-icon-button"
              aria-label="User"
              onClick={() => setOpenProfile(true)}
            >
              <span><IoPersonOutline size={22} /></span>
            </button>

            <button className="header-login-button">Login</button>
          </div>
        </div>
      </header>

      {/* PROFILE SIDEBAR */}
      {openProfile && (
        <div
          className="profile-sidebar-overlay"
          onClick={() => setOpenProfile(false)}
        >
          <div
            className="profile-sidebar"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="profile-header">
              <h2>Hey! Adiiii</h2>
              <img
                src="/assets/profile.jpg"
                className="profile-pic"
                onClick={() => {
                  setOpenProfile(false);
                  navigate("/profile");
                }}
              />
            </div>

            <div className="menu-item">Notifications</div>
            <div
              className="menu-item"
              onClick={() => {
                setOpenProfile(false);
                navigate("/wishlist");
              }}
            >
              Wishlist
            </div>

            <div
              className="menu-item"
              onClick={() => {
                setOpenProfile(false);
                navigate("/upcoming-events");
              }}
            >
              Upcoming Events
            </div>

            <div
              className="menu-item"
              onClick={() => {
                setOpenProfile(false);
                navigate("/myorder");
              }}
            >
              Your Orders
            </div>

            <div
              className="menu-item"
              onClick={() => {
                setOpenProfile(false);
                navigate("/payment-options");
              }}
            >
              Payment Methods
            </div>

            <div className="menu-item">Account & Settings</div>
            <div className="menu-item">Help & Support</div>

            <button className="signout-btn">Sign Out</button>
          </div>
        </div>
      )}
    </>
  );
}

export default Header;
