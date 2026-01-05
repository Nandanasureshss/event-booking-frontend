import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import "./Login.css";

const VerifyOtp = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  // 🔐 get data from Login page
  const { method, email, phone } = state || {};

  const [otp, setOtp] = useState("");

  // ❌ user refreshed page
  if (!state) {
    return <p>Please go back and login again.</p>;
  }

  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    try {
      const payload =
        method === "email"
          ? { method, email, otp }
          : { method, phone, otp };

      const res = await axios.post(
        "http://localhost:5000/api/auth/verify-otp",
        payload
      );

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/");
    } catch (error) {
      alert(error.response?.data?.msg || "Invalid OTP");
    }
  };

  return (
    <div className="login-container">
      <form className="login-card" onSubmit={handleVerifyOtp}>
        <h2>Verify OTP</h2>

        <p>
          OTP sent to{" "}
          <strong>{method === "email" ? email : phone}</strong>
        </p>

        <input
          type="text"
          placeholder="Enter OTP"
          required
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />

        <button type="submit">Verify</button>
      </form>
    </div>
  );
};

export default VerifyOtp;
