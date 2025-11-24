import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="page-container footer-inner">
        <div className="footer-top">
          <div className="footer-col footer-brand">
            <div className="footer-logo">
              <img src="/assets/logo4.jpg" alt="EventHub logo" />
            </div>
            <p>
              EventHub is your one-stop platform to discover, plan and book
              concerts, festivals, sports and art experiences around you.
            </p>
          </div>

          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul>
              <li>
                <a href="#">Home</a>
              </li>
              <li>
                <a href="#">Events</a>
              </li>
              <li>
                <a href="#">Category</a>
              </li>
              <li>
                <a href="#">Contact</a>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Support</h4>
            <ul>
              <li>
                <a href="#">Help Center</a>
              </li>
              <li>
                <a href="#">Terms &amp; Conditions</a>
              </li>
              <li>
                <a href="#">Privacy Policy</a>
              </li>
              <li>
                <a href="#">FAQ</a>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Contact</h4>
            <p>+971-000-123456</p>
            <p>support@eventhub.com</p>
            <p>Abu Dhabi, UAE</p>

            <div className="footer-social">
              <span>Follow us</span>
              <div className="footer-social-icons">
                <a href="#" aria-label="Instagram">
                  ⓘ
                </a>
                <a href="#" aria-label="Facebook">
                  f
                </a>
                <a href="#" aria-label="Twitter">
                  t
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2025. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
