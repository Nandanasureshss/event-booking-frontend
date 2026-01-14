import React, { useState } from "react";
import { BsCart2 } from "react-icons/bs";
import { IoPersonOutline, IoSearchOutline } from "react-icons/io5";
import { useNavigate, useLocation } from "react-router-dom";
import "./Header.css";

function Header({ popularRef, categoryRef, footerRef }) {
  const [openProfile, setOpenProfile] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = (ref) => {
    ref?.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleScrollOrNavigate = (ref) => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => scrollToSection(ref), 300);
    } else {
      scrollToSection(ref);
    }
  };

  return (
    <>
      <header className="header">
        <div className="page-container header-inner">
          {/* LEFT */}
          <div className="header-left">
            <div
              className="header-logo"
              onClick={() => navigate("/")}
              style={{ cursor: "pointer" }}
            >
              <img src="/assets/logo4.jpg" alt="EventHub logo" />
            </div>

            <nav className="header-nav">
              <a onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                Home
              </a>

              <a onClick={() => handleScrollOrNavigate(popularRef)}>
                Event
              </a>

              <a onClick={() => handleScrollOrNavigate(categoryRef)}>
                Category
              </a>

              <a onClick={() => handleScrollOrNavigate(footerRef)}>
                Contact
              </a>
            </nav>
          </div>

          {/* RIGHT */}
          <div className="header-right">
            <button className="header-icon-button" aria-label="search">
              <IoSearchOutline size={22} />
            </button>

            <button
              className="header-icon-button"
              aria-label="Cart"
              onClick={() => navigate("/cart")}
            >
              <BsCart2 size={22} />
            </button>

            <button
              className="header-icon-button"
              aria-label="User"
              onClick={() => setOpenProfile(true)}
            >
              <IoPersonOutline size={22} />
            </button>

            <button
              className="header-login-button"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
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
                alt="profile"
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
