import React from "react";
import "./Topbar.css";
import { IoSearch } from "react-icons/io5";
import { MdEmail, MdNotificationsNone } from "react-icons/md";

const Topbar = () => {
  return (
    <div className="topbar">

     <div className="topbarLeft">
  <div className="topbarlogo">
    <img src="/assets/logo4.jpg" alt="logo" />
  </div>
</div>

      <div className="topbarSearch">
        <IoSearch className="topbarSearchIcon" />
        <input type="text" placeholder="Search" />
      </div>

      <div className="topbarRight">

        <MdEmail className="topbarIcon" />
        <MdNotificationsNone className="topbarIcon notifIcon" />

        <div className="topbarProfile">
          <img
            src="/assets/gowtham.jpg"
            alt="Profile"
            className="topbarProfileImg"
          />

          <div>
            <p className="topbarName">Full Name </p>
            <p className="topbarRole">Admin</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Topbar;
