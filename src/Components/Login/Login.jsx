import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import "./Login.css";

/* -------- Custom Dropdown -------- */
const LoginMethodDropdown = ({ method, setMethod }) => {
  const [open, setOpen] = useState(false);

  const handleSelect = (value) => {
    setMethod(value);
    setOpen(false);
  };

  return (
    <div className="custom-dropdown">
      <div
        className="dropdown-selected"
        onClick={() => setOpen(!open)}
      >
        {method === ""
          ? "Select login option"
          : method === "email"
          ? "Login with Email"
          : "Login with Mobile"}
        <span className="arrow">▾</span>
      </div>

      {open && (
        <div className="dropdown-menu">
          <div onClick={() => handleSelect("email")}>
            Login with Email
          </div>
          <div onClick={() => handleSelect("phone")}>
            Login with Mobile
          </div>
        </div>
      )}
    </div>
  );
};

const Login = () => {
  const navigate = useNavigate();

  const [method, setMethod] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleSendOtp = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/auth/send-otp", {
        method,
        email,
        phone,
      });

      navigate("/verify-otp", { state: { method, email, phone } });
    } catch (error) {
      alert(error.response?.data?.msg || "Failed to send OTP");
    }
  };

  const handleGoogleLogin = async (credentialResponse) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/google-login",
        { token: credentialResponse.credential }
      );

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/");
    } catch {
      alert("Google login failed");
    }
  };

  return (
    <div className="login-container">
      <form className="login-card" onSubmit={handleSendOtp}>
        <h2>Login</h2>

        <LoginMethodDropdown method={method} setMethod={setMethod} />

        {method === "email" && (
          <input
            type="email"
            placeholder="Enter your email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        )}

        {method === "phone" && (
          <input
            type="tel"
            placeholder="Enter your phone number"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        )}

        <button type="submit" disabled={!method}>
          Send OTP
        </button>

        <div style={{ textAlign: "center", margin: "15px 0", color: "#888" }}>
          OR
        </div>

        <GoogleLogin
          onSuccess={handleGoogleLogin}
          onError={() => alert("Google login failed")}
        />
      </form>
    </div>
  );
};

export default Login;
