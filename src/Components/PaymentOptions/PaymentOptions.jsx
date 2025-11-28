import React from "react";
import "./PaymentOptions.css";

function PaymentOptions() {
  return (
    <div className="payment-page">
      <h2 className="payment-title">Payment Options</h2>

      <div className="payment-options-wrapper">
        <div className="payment-card">
          <p className="payment-name">Credit/Debit Card</p>
          <button className="payment-add-btn">+Add</button>
        </div>

        <div className="payment-card">
          <p className="payment-name">Net Banking</p>
          <button className="payment-add-btn">+Add</button>
        </div>

        <div className="payment-card">
          <p className="payment-name">UPI</p>
          <button className="payment-add-btn">+Add</button>
        </div>
      </div>
    </div>
  );
}

export default PaymentOptions;
