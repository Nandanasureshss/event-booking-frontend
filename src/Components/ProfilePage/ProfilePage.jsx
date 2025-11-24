import React from "react";
import Header from "../Header/Header"; 
import "./ProfilePage.css";

function ProfilePage() {
  return (
    <>
      <Header />

      <div className="profile-page-container">

        <div className="profile-card">

          {/* Header Gradient Section */}
          <div className="profile-header-section">
            <img 
              src="/assets/profile.jpg" 
              alt="profile" 
              className="profile-picture"
            />

            <h2 className="profile-title">Hey! Example</h2>
          </div>

          {/* Account Details */}
          <div className="profile-details">
            <h3>Account Details</h3>

            <div className="profile-row">
              <span className="profile-label">Name</span>
              <span className="profile-value">example</span>
            </div>

            <div className="profile-row">
              <span className="profile-label">Email Address</span>
              <span className="profile-value">example@gmail.com</span>
              <span className="verified-badge">Verified</span>
            </div>

            <div className="profile-row">
              <span className="profile-label">Mobile Number</span>
              <span className="profile-value">+123 676700xxx</span>
            </div>

            <div className="edit-button">Edit</div>
          </div>

        </div>
        
      </div>
    </>
  );
}

export default ProfilePage;
